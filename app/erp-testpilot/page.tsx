"use client";

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import emailjs from "@emailjs/browser";

import Reveal from "../../components/Reveal";
import TiltCard from "../../components/TiltCard";
import MagneticButton from "../../components/MagneticButton";
import HeroReveal from "../../components/HeroReveal";
import CountUp from "../../components/CountUp";
import EmberCanvas from "../../components/EmberCanvas";
import "./erp.css";

type Feature = { icon: string; title: string; desc: string; big?: boolean };

const FEATURES: Feature[] = [
  {
    icon: "📅",
    title: "Planer mit Kalender-Board",
    desc: "Aufträge per Drag & Drop auf Mitarbeiter und Tage verteilen – nie wieder doppelt vergeben oder verzetteln.",
    big: true,
  },
  {
    icon: "🚗",
    title: "Kunden & Fahrzeuge – KI-Scan",
    desc: "Fahrzeugschein abfotografieren, die KI liest alles aus. Kunde und Fahrzeug in Sekunden angelegt.",
    big: true,
  },
  {
    icon: "📦",
    title: "Lagerverwaltung mit Foto-Scan",
    desc: "Teile per Foto erfassen, Bestände bleiben automatisch aktuell.",
  },
  {
    icon: "🧾",
    title: "GoBD-konformes Rechnungswesen",
    desc: "Angebote & Rechnungen rechtssicher, prüffest und in Sekunden erstellt.",
  },
  {
    icon: "⏱️",
    title: "Zeiterfassung & Kiosk",
    desc: "Stempeluhr direkt am Terminal – Arbeitszeiten sauber dokumentiert.",
  },
  {
    icon: "🌴",
    title: "Urlaubsplaner",
    desc: "Urlaube und Abwesenheiten im ganzen Team auf einen Blick.",
  },
  {
    icon: "🗓️",
    title: "Online-Terminbuchung",
    desc: "Kunden buchen selbst – direkt in deinen Werkstatt-Kalender.",
  },
  {
    icon: "🔒",
    title: "Verschlüsseltes Auto-Backup",
    desc: "Automatisch und verschlüsselt gesichert – deine Daten sind jederzeit sicher.",
  },
];

export default function ErpTestpilotPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "error">(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) emailjs.init(publicKey);
  }, []);

  // Magnetischer Effekt für den Haupt-CTA (nur Maus, respektiert reduced-motion)
  const onCtaMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ctaRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };
  const onCtaLeave = () => {
    const el = ctaRef.current;
    if (el) el.style.transform = "";
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || sending) return;

    const fd = new FormData(form);
    const name = String(fd.get("from_name") || "");
    const email = String(fd.get("reply_to") || "");
    const workshop = String(fd.get("workshop") || "");

    // Nachricht für das EmailJS-Template zusammenbauen (verstecktes Feld)
    const msgEl = form.elements.namedItem("message") as HTMLInputElement | null;
    if (msgEl) msgEl.value = `ERP-Testpilot-Anfrage\nWerkstatt: ${workshop}`;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Fallback: mailto, falls EmailJS nicht konfiguriert ist
    if (!serviceId || !templateId || !publicKey) {
      const body = encodeURIComponent(
        `Name: ${name}\nE-Mail: ${email}\nWerkstatt: ${workshop}\n\nIch möchte am ERP-Testpiloten-Programm teilnehmen.`
      );
      window.location.href = `mailto:info@zentara-solutions.de?subject=${encodeURIComponent(
        "ERP-Testpilot Anfrage"
      )}&body=${body}`;
      return;
    }

    try {
      setSending(true);
      setStatus(null);
      await emailjs.sendForm(serviceId, templateId, form);
      setStatus("ok");
      form.reset();
    } catch (err) {
      console.error("ERP-Testpilot Formular Fehler:", err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="erp-page">
      {/* 1 — EXKLUSIVITÄTS-HERO */}
      <section className="erp-hero">
        <EmberCanvas />
        <div className="erp-hero-inner">
          <span className="erp-eyebrow">Exklusiver Testpiloten-Zugang</span>
          <HeroReveal
            className="erp-hero-headline"
            highlightClassName="erp-highlight"
            parts={[{ text: "Du wurdest" }, { text: "ausgewählt.", highlight: true }]}
          />
          <p className="erp-hero-sub">
            Willkommen im engsten Kreis, der unser Werkstatt-ERP vor allen anderen erleben darf.
            Dieser Zugang ist persönlich für dich – und nur über deinen Einladungslink erreichbar.
          </p>
          <MagneticButton href="#einsteigen" className="erp-cta erp-cta--lg">
            Jetzt als Testpilot einsteigen
          </MagneticButton>
        </div>
      </section>

      {/* 2 — WAS IST DAS ERP */}
      <section className="erp-section">
        <Reveal>
          <span className="erp-eyebrow">Was ist das?</span>
          <h2 className="erp-section-title">
            Schluss mit Excel, Zetteln und <span className="erp-highlight">WhatsApp-Chaos</span>
          </h2>
          <p className="erp-lead">
            Aufträge auf Klebezetteln, Termine in drei Kalendern, Teile-Bestände im Kopf und die
            halbe Kommunikation im WhatsApp-Verlauf? Unser ERP bündelt deine komplette Werkstatt in{" "}
            <strong>einem System</strong> – Planung, Kunden, Fahrzeuge, Lager, Rechnungen und Zeiten.
            Übersichtlich, schnell und für den Alltag in der Werkstatt gemacht.
          </p>
        </Reveal>
      </section>

      {/* 3 — FEATURE-BENTO */}
      <section className="erp-section">
        <Reveal>
          <span className="erp-eyebrow">Alles in einem System</span>
          <h2 className="erp-section-title">Die wichtigsten Funktionen</h2>
        </Reveal>

        <div className="erp-bento">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 3) * 80}
              className={`erp-bento-cell ${f.big ? "erp-span-3" : "erp-span-2"}`}
            >
              <TiltCard className="erp-feature-card" max={8}>
                <div className="erp-feature-icon" aria-hidden="true">
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4 — ERSTE EINBLICKE (Mockups mit Platzhaltern) */}
      <section className="erp-section">
        <Reveal>
          <span className="erp-eyebrow">Erste Einblicke</span>
          <h2 className="erp-section-title">So sieht es aus</h2>
          <p className="erp-lead">
            Ein Vorgeschmack auf die Oberfläche. Die echten Screenshots und ein kurzes Demo-Video
            folgen in Kürze – hier siehst du schon die Rahmen.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="erp-mockups">
            <div className="erp-laptop">
              <div className="erp-laptop-screen erp-placeholder">
                <strong>Screenshot folgt</strong>
                <small>Platzhalter – hier kommt später der Dashboard-Screenshot / das Demo-Video rein.</small>
              </div>
              <div className="erp-laptop-base" />
            </div>

            <div className="erp-phone">
              <span className="erp-phone-notch" />
              <div className="erp-phone-screen erp-placeholder">
                <strong>Screenshot folgt</strong>
                <small>Platzhalter – mobile Ansicht.</small>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 5 — PILOTPHASE-ANGEBOT */}
      <section className="erp-section">
        <Reveal>
          <div className="erp-offer-card">
            <span className="erp-offer-badge">Nur für Testpiloten</span>
            <h2>
              3 Monate <span className="erp-highlight">komplett kostenlos</span>
            </h2>

            <div className="erp-offer-stats">
              <div className="erp-offer-stat">
                <CountUp end={3} className="erp-stat-num" />
                <span className="erp-stat-label">Monate gratis</span>
              </div>
              <div className="erp-offer-stat">
                <span className="erp-stat-num">0&nbsp;€</span>
                <span className="erp-stat-label">Einrichtungsgebühr</span>
              </div>
              <div className="erp-offer-stat">
                <CountUp end={30} suffix={" %"} className="erp-stat-num" />
                <span className="erp-stat-label">Rabatt danach – auf Lebenszeit</span>
              </div>
            </div>

            <p className="erp-offer-note">
              Im Austausch für ein kurzes Feedback-Gespräch und die Erlaubnis, Screenshots &
              Demo-Material zu verwenden. Danach sicherst du dir dauerhaft{" "}
              <strong>30&nbsp;% Frühbucher-Rabatt</strong> – so lange du dabei bist.
            </p>

            <MagneticButton href="#einsteigen" className="erp-cta erp-cta--lg">
              Platz sichern
            </MagneticButton>
          </div>
        </Reveal>
      </section>

      {/* 6 — HAUPT-CTA / FORMULAR */}
      <section id="einsteigen" className="erp-section erp-cta-section">
        <Reveal>
          <span className="erp-eyebrow">Dein Platz wartet</span>
          <h2 className="erp-section-title">Bereit, dein Werkstatt-Chaos zu beenden?</h2>
          <p className="erp-lead">
            Kurz eintragen – ich melde mich persönlich bei dir und richte deinen Testpiloten-Zugang
            ein.
          </p>
        </Reveal>

        <form ref={formRef} onSubmit={onSubmit} className="erp-form" aria-label="Testpilot-Anfrage">
          <input type="text" name="from_name" placeholder="Dein Name" autoComplete="name" required />
          <input
            type="email"
            name="reply_to"
            placeholder="E-Mail"
            autoComplete="email"
            required
          />
          <input
            type="text"
            name="workshop"
            placeholder="Name deiner Werkstatt"
            autoComplete="organization"
            required
          />
          <input type="hidden" name="message" />

          <button
            type="submit"
            ref={ctaRef}
            className="erp-cta erp-cta--lg erp-cta--pulse erp-submit"
            onMouseMove={onCtaMove}
            onMouseLeave={onCtaLeave}
            disabled={sending}
          >
            {sending ? "Wird gesendet …" : "Jetzt als Testpilot einsteigen"}
          </button>

          {status === "ok" && (
            <p className="erp-form-status erp-form-status--ok" role="status">
              Perfekt! Deine Anfrage ist raus – ich melde mich sehr zeitnah bei dir.
            </p>
          )}
          {status === "error" && (
            <p className="erp-form-status erp-form-status--error" role="status">
              Das hat leider nicht geklappt. Schreib mir gern direkt an info@zentara-solutions.de.
            </p>
          )}
        </form>
      </section>

      {/* 7 — FOOTER */}
      <footer className="erp-footer">
        <p className="erp-footer-private">
          🔒 Diese Seite ist privat und ausschließlich für eingeladene Testpiloten bestimmt. Bitte
          teile den Link nicht öffentlich.
        </p>
        <p>
          Fragen? <a href="mailto:info@zentara-solutions.de">info@zentara-solutions.de</a>
        </p>
        <p>© {year} Zentara Solutions · Werkstatt-ERP</p>
      </footer>
    </main>
  );
}
