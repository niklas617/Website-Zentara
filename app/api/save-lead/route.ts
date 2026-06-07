import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';
import { Resend } from 'resend';

// Initialisiere Resend mit deinem API-Key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, score } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name und E-Mail sind erforderlich.' },
        { status: 400 }
      );
    }

    // --- 1. DATENBANK LOGIK ---
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const query = `
      INSERT INTO website_leads (name, email, score) 
      VALUES ($1, $2, $3) 
      RETURNING id, created_at
    `;
    const values = [name, email, score];
    const result = await pool.query(query, values);
    await pool.end();

    // --- 2. E-MAIL VERSAND LOGIK ---

    // Baue den individuellen Link zusammen
    // WICHTIG: Ersetze "http://localhost:3000" später durch deine echte Live-Domain!
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://zentara-solutions.de'
      : 'http://localhost:3000';

    const auswertungsLink = `${baseUrl}/evaluation?score=${score}`;

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
                            <img src="/public/assests/images/favicon.png" width="45" height="45" alt="Niklas Smit" style="border-radius: 50%; display: block;">
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