import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { promises as dns } from 'dns';

// Diese Route braucht die Node-Runtime (DNS-Lookup für den MX-Check).
export const runtime = 'nodejs';

// Initialisiere Resend mit deinem API-Key
const resend = new Resend(process.env.RESEND_API_KEY);

// Grundlegende Format-Prüfung der E-Mail (serverseitige Absicherung).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Bricht eine Promise nach ms ab und liefert dann den Fallback (verhindert hängende Requests). */
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

/**
 * Prüft, ob die Domain überhaupt Mails empfangen kann (MX- oder A/AAAA-Record).
 * - Existiert die Domain nicht (ENOTFOUND/ENODATA) → false (klar ablehnen).
 * - Transiente DNS-Fehler (Timeout, SERVFAIL) → true (echte Leads nicht blockieren).
 * Garantiert NICHT die Existenz des konkreten Postfachs – das ist ohne Versand nicht möglich.
 */
async function isDeliverableDomain(domain: string): Promise<boolean> {
  try {
    const mx = await dns.resolveMx(domain);
    if (mx.length > 0 && mx.some((r) => r.exchange)) return true;
  } catch (e: any) {
    if (e?.code !== 'ENOTFOUND' && e?.code !== 'ENODATA') {
      return true; // transienter Fehler → nicht blockieren
    }
  }
  // Kein MX vorhanden → A/AAAA-Record als Fallback (RFC 5321).
  try {
    const a = await dns.resolve4(domain);
    if (a.length > 0) return true;
  } catch { /* ignorieren */ }
  try {
    const aaaa = await dns.resolve6(domain);
    if (aaaa.length > 0) return true;
  } catch { /* ignorieren */ }
  return false;
}

// Empfänger der internen Lead-Benachrichtigung.
// Aus process.env, mit fest hinterlegtem Fallback (analog zum bestehenden Muster mit info@zentara-solutions.de).
const LEAD_NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || 'info@zentara-solutions.de';

// --- Hilfs-Mappings, damit die Codes aus dem Quiz in der Mail lesbar sind ---
const MITARBEITER_LABELS: Record<string, string> = {
  'unter-5': 'Bis 5 Mitarbeiter',
  '5-15': '5 – 15 Mitarbeiter',
  'ueber-15': 'Mehr als 15 Mitarbeiter',
};

const SOFTWARE_LABELS: Record<string, string> = {
  streit: 'STREIT',
  plancraft: 'plancraft',
  tooltime: 'ToolTime',
  'das-programm': 'Das Programm',
  sonstige: 'Sonstige',
  keine: 'Keine / Zettel & Excel',
};

function labelFor(map: Record<string, string>, value: unknown): string {
  if (typeof value !== 'string' || value.trim() === '') return '—';
  return map[value] ?? value;
}

// Einordnung analog zur Logik in app/evaluation/page.tsx (max. 9 Fehlerpunkte)
function scoreEinordnung(score: number): { label: string; color: string } {
  if (score <= 1) return { label: 'Exzellent – Starkes Fundament', color: '#10B981' };
  if (score <= 4) return { label: 'Warnsignal – Versteckte Umsatzkiller', color: '#F59E0B' };
  return { label: 'Kritisch – Akuter Handlungsbedarf', color: '#EF4444' };
}

// Escaping für nutzergelieferte Werte in der HTML-Mail (verhindert kaputtes Markup / Injection).
function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, score, firma, mitarbeiter, software, max } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name und E-Mail sind erforderlich.' },
        { status: 400 }
      );
    }

    // --- 0. E-MAIL-VALIDIERUNG (Format + Domain existiert?) ---
    const emailClean = String(email).trim();
    if (!EMAIL_RE.test(emailClean)) {
      return NextResponse.json(
        { success: false, message: 'Bitte gib eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    const domain = emailClean.split('@')[1]?.toLowerCase();
    // Lenient: bei DNS-Timeout (Fallback true) wird NICHT blockiert.
    const domainOk = await withTimeout(isDeliverableDomain(domain), 4000, true);
    if (!domainOk) {
      return NextResponse.json(
        {
          success: false,
          message: `Die E-Mail-Domain „${domain}“ scheint nicht zu existieren. Bitte prüfe deine Adresse.`,
        },
        { status: 400 }
      );
    }

    // --- 1. DATENBANK LOGIK ---
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    let result;
    try {
      // Bevorzugt: alle Felder inkl. Segmentierung speichern.
      const query = `
        INSERT INTO website_leads (name, email, firma, mitarbeiter, software, score)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, created_at
      `;
      const values = [name, email, firma ?? null, mitarbeiter ?? null, software ?? null, score];
      result = await pool.query(query, values);
    } catch (dbError: any) {
      // 42703 = undefined_column → Migration (firma/mitarbeiter/software) noch nicht ausgeführt.
      // Fallback auf das Alt-Schema, damit der Lead-Funnel niemals bricht.
      if (dbError?.code === '42703') {
        console.warn(
          'save-lead: Neue Spalten (firma/mitarbeiter/software) fehlen noch – Fallback auf name/email/score. ' +
          'Bitte Migration ausführen, damit die Segmentierungsdaten gespeichert werden.'
        );
        const legacyQuery = `
          INSERT INTO website_leads (name, email, score)
          VALUES ($1, $2, $3)
          RETURNING id, created_at
        `;
        result = await pool.query(legacyQuery, [name, email, score]);
      } else {
        throw dbError;
      }
    } finally {
      await pool.end();
    }

    // --- 2. E-MAIL VERSAND LOGIK ---

    // Baue den individuellen Link zusammen
    // WICHTIG: Ersetze "http://localhost:3000" später durch deine echte Live-Domain!
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://zentara-solutions.de'
      : 'http://localhost:3000';

    const maxScoreParam = max ?? 9;
    const auswertungsLink = `${baseUrl}/evaluation?score=${score}&max=${maxScoreParam}`;

    // Sende die E-Mail
    // Sende die E-Mail
    await resend.emails.send({
      from: 'Zentara <info@zentara-solutions.de>', to: email,
      subject: 'Dein Website-Audit Ergebnis ist da!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Dein Website-Audit</title>
        </head>
        <body style="background-color: #f8fafc; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 10px;">
            <tr>
              <td align="center">
                <!-- Haupt-Container (Die "Karte") -->
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); max-width: 600px; width: 100%;">

                  <!-- Header Bereich (Dunkel mit Mint-Logo) -->
                  <tr>
                    <td style="background-color: #0f172a; padding: 45px 40px; text-align: center; border-bottom: 4px solid #10B981;">
                      <span style="color: #10B981; font-size: 14px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase;">Zentara Insights</span>
                      <h1 style="color: #ffffff; font-size: 26px; margin-top: 20px; margin-bottom: 0; line-height: 1.3;">Dein Audit-Ergebnis ist bereit.</h1>
                    </td>
                  </tr>

                  <!-- Text Bereich -->
                  <tr>
                    <td style="padding: 40px 40px;">
                      <p style="font-size: 16px; color: #334155; line-height: 1.7; margin-top: 0; margin-bottom: 20px;">
                        Hallo ${name},
                      </p>
                      <p style="font-size: 16px; color: #334155; line-height: 1.7; margin-bottom: 20px;">
                        vielen Dank für deine Zeit. Wir haben deine Angaben durch unseren Algorithmus laufen lassen und die Schwachstellen analysiert.
                      </p>
                      <p style="font-size: 16px; color: #334155; line-height: 1.7; margin-bottom: 35px;">
                        Dein persönlicher Performance-Score zeigt dir exakt, an welchen Stellen deine aktuelle Website wertvolle Zeit und potenzielle Kunden verbrennt. Du kannst deine detaillierte Auswertung jetzt einsehen:
                      </p>

                      <!-- Button Bereich -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 40px;">
                        <tr>
                          <td align="center">
                            <a href="${auswertungsLink}" style="background-color: #10B981; color: #0f172a; padding: 16px 36px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; display: inline-block; letter-spacing: 0.5px;">
                              Ergebnis jetzt freischalten
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="font-size: 16px; color: #334155; line-height: 1.7; margin-bottom: 30px;">
                        Lass uns im Anschluss gerne kurz sprechen, falls du Fragen zu den nächsten Schritten hast.
                      </p>

                      <!-- Signatur -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="50" style="vertical-align: middle;">
                            <img src="https://zentara-solutions.de/assets/images/favicon.png" width="45" height="45" alt="Niklas Smit" style="border-radius: 50%; display: block;">
                          </td>
                          <td style="vertical-align: middle; padding-left: 15px;">
                            <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: bold;">Niklas Smit</p>
                            <p style="margin: 0; font-size: 14px; color: #64748b;">Zentara Solutions</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer Bereich -->
                  <tr>
                    <td style="background-color: #f1f5f9; padding: 25px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.5;">
                        &copy; 2026 Zentara Solutions | Web- & Softwareentwicklung<br>
                        Du erhältst diese E-Mail, weil du das Website-Audit durchgeführt hast.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // --- 2b. INTERNE BENACHRICHTIGUNG AN DICH (neuer Lead) ---
    // In eigenem try/catch: ein Fehler hier darf den bestehenden Funnel NIE beeinträchtigen.
    try {
      const scoreValue = typeof score === 'number' ? score : parseInt(String(score ?? 0), 10) || 0;
      const einordnung = scoreEinordnung(scoreValue);
      const createdAt = result.rows[0]?.created_at;
      const zeitstempel = new Date(createdAt ?? Date.now()).toLocaleString('de-DE', {
        timeZone: 'Europe/Berlin',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      const firmaText = firma ? escapeHtml(firma) : '—';
      const mitarbeiterText = escapeHtml(labelFor(MITARBEITER_LABELS, mitarbeiter));
      const softwareText = escapeHtml(labelFor(SOFTWARE_LABELS, software));

      await resend.emails.send({
        from: 'Zentara Leads <info@zentara-solutions.de>',
        to: LEAD_NOTIFICATION_EMAIL,
        replyTo: String(email),
        subject: `🚀 Neuer Lead: ${name}${firma ? ` (${firma})` : ''} – Score ${scoreValue}/9`,
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif; max-width: 560px; margin: 0 auto; color: #0f172a;">
            <h2 style="margin: 0 0 4px;">🚀 Neuer Audit-Lead</h2>
            <p style="margin: 0 0 18px; color: #64748b; font-size: 13px;">Eingegangen am ${escapeHtml(zeitstempel)}</p>
            <table cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="background: #f1f5f9;"><td style="font-weight: bold; width: 150px;">Name</td><td>${escapeHtml(name)}</td></tr>
              <tr><td style="font-weight: bold;">E-Mail</td><td><a href="mailto:${escapeHtml(email)}" style="color: #0f766e;">${escapeHtml(email)}</a></td></tr>
              <tr style="background: #f1f5f9;"><td style="font-weight: bold;">Firma / URL</td><td>${firmaText}</td></tr>
              <tr><td style="font-weight: bold;">Mitarbeiter</td><td>${mitarbeiterText}</td></tr>
              <tr style="background: #f1f5f9;"><td style="font-weight: bold;">Software</td><td>${softwareText}</td></tr>
              <tr><td style="font-weight: bold;">Score</td><td><strong style="color: ${einordnung.color};">${scoreValue} / 9</strong> Fehlerpunkte</td></tr>
              <tr style="background: #f1f5f9;"><td style="font-weight: bold;">Einordnung</td><td style="color: ${einordnung.color}; font-weight: bold;">${einordnung.label}</td></tr>
            </table>
            <p style="margin-top: 18px; font-size: 13px; color: #64748b;">
              Auf diese Mail antworten schreibt direkt an den Lead (Reply-To ist gesetzt).
            </p>
          </div>
        `,
        text:
          `Neuer Audit-Lead – eingegangen am ${zeitstempel}\n\n` +
          `Name:        ${name}\n` +
          `E-Mail:      ${email}\n` +
          `Firma / URL: ${firma || '—'}\n` +
          `Mitarbeiter: ${labelFor(MITARBEITER_LABELS, mitarbeiter)}\n` +
          `Software:    ${labelFor(SOFTWARE_LABELS, software)}\n` +
          `Score:       ${scoreValue} / 9 Fehlerpunkte\n` +
          `Einordnung:  ${einordnung.label}\n`,
      });
    } catch (notifyError) {
      // Nur loggen – der Lead ist gespeichert und die Nutzer-Mail ist raus.
      console.error('save-lead: Interne Benachrichtigung konnte nicht gesendet werden:', notifyError);
    }

    // --- 3. ERFOLGSMELDUNG ANS FRONTEND ---
    return NextResponse.json({
      success: true,
      message: 'Lead gespeichert und E-Mail versendet.',
      leadId: result.rows[0].id
    }, { status: 200 });

  } catch (error: any) {
    console.error('Fehler:', error);

    if (error.code === '23505') {
      return NextResponse.json({
        success: false,
        message: 'Diese E-Mail-Adresse wurde bereits eingetragen.'
      }, { status: 409 });
    }

    return NextResponse.json({
      success: false,
      message: 'Ein interner Serverfehler ist aufgetreten.'
    }, { status: 500 });
  }
}
