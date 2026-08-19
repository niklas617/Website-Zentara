"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import NavBar from "../components/NavBar";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

import AppDownload from "../components/AppDownload";
import RealEstateChatbot from "../components/RealEstateChatbot";
import AuditQuiz from "../components/AuditQuiz";
import ApkDownloadButton from "../components/ApkDownloadButton";

import HeroReveal from "../components/HeroReveal";
import Reveal from "../components/Reveal";
import DeviceShowcase from "../components/DeviceShowcase";
import StatsCounter from "../components/StatsCounter";
import PriceCalculator from "../components/PriceCalculator";
import MagneticButton from "../components/MagneticButton";
import CaseStudies from "../components/CaseStudies";
import FooterContact from "../components/FooterContact";
import RoadmapTimeline from "../components/RoadmapTimeline";


// 3D-/Gradient-Akzent im Hero: lazy geladen (kein SSR), rein CSS → sehr leicht.
const HeroBackdrop = dynamic(() => import("../components/HeroBackdrop"), { ssr: false });

// Einheitlicher Haupt-CTA-Text (Phase 4).
const CTA_TEXT = "Kostenloses Erstgespräch sichern";

// Feature-Flags: erst live schalten, wenn echte Daten vorliegen.
const SHOW_TESTIMONIALS = false;
const SHOW_CASE_STUDIES = false;

const WHATSAPP_NUMBER = "49017621742783";
const whatsappReady = !WHATSAPP_NUMBER.includes("X");
const whatsappHref = whatsappReady
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hallo Niklas, ich habe eine Frage zu ...")}`
  : "mailto:info@zentara-solutions.de";

export default function HomePage() {

  return (
    <section>
      <NavBar />

      {/* 1 — HERO */}
      <section className="hero">
        <HeroBackdrop />
        <div className="hero-content">
          <HeroReveal
            parts={[
              { text: "Websites & Software," },
              { text: "die", highlight: true }, { text: "Fachkräfte" }, { text: "anziehen und das", highlight: true }, { text: "Büro" }, { text: "entlasten.", highlight: true },
            ]}
          />
          <p className="hero-sub">
            Schluss mit Zettelwirtschaft und veralteten Homepages. Zeit für automatisierte Abläufe, mehr Marge und qualifizierte Bewerbungen.
          </p>
          <div className="hero-cta-row">
            <MagneticButton href="/offer" className="cta-primary cta-primary--lg">
              {CTA_TEXT}
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 2 — SCHMALE VERTRAUENS-LEISTE */}
      <div className="trust-bar" role="list" aria-label="Vertrauensmerkmale">
        <span role="listitem">Persönlich betreut</span>
        <span className="trust-dot" aria-hidden="true">·</span>
        <span role="listitem">100&nbsp;% DSGVO-konform</span>
        <span className="trust-dot" aria-hidden="true">·</span>
        <span role="listitem">Antwort innerhalb 24&nbsp;h</span>
      </div>

      <RealEstateChatbot />

      {/* 3 — VERGLEICHS-SEKTION */}
      <section className="section comparison-section" style={{ maxWidth: "1150px", margin: "0 auto" }}>
        <h2 className="section-title">
          08/15 Baukasten-Seite vs. <br /> <span className="highlight">Verkaufsstarke Webseite</span>
        </h2>
        <p className="section-lead">
          Ein Baukasten gibt dir eine Vorlage – ich gebe dir ein Werkzeug, das verkauft. Jede Zeile
          entsteht mit einem Ziel: aus Besuchern deine nächsten Kunden zu machen. Keine Lösung von
          der Stange, sondern eine Seite, die zu deinem Betrieb passt wie sonst keine.
        </p>

        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", marginTop: "0" }}
        >
          {/* 08/15 */}
          <Reveal>
            <div className="card compare-card compare-card--bad" style={{ padding: "40px 30px", textAlign: "left", marginBottom: 0 }}>
              <h3 className="compare-heading compare-heading--bad">08/15 Baukasten-Seite</h3>
              <ul className="compare-list">
                <li><span>❌</span> <span>Keine oder wenige qualifizierte Bewerbungen</span></li>
                <li><span>❌</span> <span>Anfragen für zeitraubende, unrentable Kleinprojekte</span></li>
                <li><span>❌</span> <span>Manuelle Übertragungen vom Zettel ins Büro-System</span></li>
                <li><span>❌</span> <span>Schlechte mobile Ladezeiten vergraulen Bewerber</span></li>
                <li><span>❌</span> <span>Verwirrt den Nutzer, statt ihn zu leiten</span></li>
                <li><span>❌</span> <span>Generiert keine echten Kundenanfragen</span></li>
              </ul>
            </div>
          </Reveal>

          {/* Verkaufsstark */}
          <Reveal delay={90}>
            <div
              className="card compare-card compare-card--good"
              style={{ padding: "40px 30px", textAlign: "left", marginBottom: 0, border: "1px solid rgba(16, 185, 129, 0.45)", boxShadow: "0 0 30px rgba(16, 185, 129, 0.10)" }}
            >
              <h3 className="compare-heading compare-heading--good">Verkaufsstarke Webseite</h3>
              <ul className="compare-list">
                <li><span>✅</span> <span>Express-Bewerberstrecke direkt auf dem Smartphone</span></li>
                <li><span>✅</span> <span>Vorqualifizierung von Kundenanfragen für höhere Marge</span></li>
                <li><span>✅</span> <span>Anbindung an DATANORM, GAEB, IDS Connect & ERPs</span></li>
                <li><span>✅</span> <span>100% optimiert für jedes Smartphone &amp; Tablet, unter 1 Sekunde Ladezeit</span></li>
                <li><span>✅</span> <span>Klare Struktur und intuitive Bedienung</span></li>
                <li style={{ fontWeight: "bold" }}><span>✅</span> <span>Verwandelt Besucher in zahlende Kunden</span></li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 — BENTO-GRID: WARUM ZENTARA */}
      <section id="why-zentara" className="section why-section">
        <h2 className="section-title">Warum <span className="highlight">Zentara?</span></h2>
        <p className="section-lead">
          Du arbeitest nicht mit einer anonymen Agentur, sondern direkt mit mir – vom ersten
          Gespräch bis zum Go-Live. Das Ergebnis: Technik, die sitzt, und ein Ansprechpartner, der
          dein Projekt wirklich kennt.
        </p>

        <div className="bento">
          <Reveal className="bento-item bento-a">
            <div className="card bento-card bento-card--featured">
              <div className="bento-icon">⚡</div>
              <h3 className="bento-title">Moderne Technologie</h3>
              <p>
                Keine langsamen Standard-Templates. Ich baue blitzschnelle, zukunftssichere
                Web-Anwendungen mit modernsten Frameworks.
              </p>
            </div>
          </Reveal>

          <Reveal className="bento-item bento-b" delay={80}>
            <div className="card bento-card">
              <div className="bento-icon">🤝</div>
              <h3 className="bento-title">Persönlich &amp; Direkt</h3>
              <p>
                Keine anonyme Agentur, keine ewigen Warteschleifen. Du hast einen festen
                Ansprechpartner, der dein Projekt von A bis Z kennt.
              </p>
            </div>
          </Reveal>

          <Reveal className="bento-item bento-c" delay={160}>
            <div className="card bento-card">
              <div className="bento-icon">🎯</div>
              <h3 className="bento-title">100% Maßgeschneidert</h3>
              <p>
                Dein Unternehmen ist einzigartig – deine Software sollte es auch sein. Exakt das, was
                du brauchst, ohne unnötigen Ballast.
              </p>
            </div>
          </Reveal>

          <Reveal className="bento-item bento-d" delay={240}>
            <div className="card bento-card">
              <div className="bento-icon">🛡️</div>
              <h3 className="bento-title">Rundum-Sorglos</h3>
              <p>
                Von der ersten Idee über das Design bis hin zu sicherem Hosting und laufender Wartung
                übernehme ich die komplette Technik.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — LIVE-ZAHLEN-COUNTER */}
      <section className="section stats-section">
        <StatsCounter />
      </section>



      {/* 7 — CASE STUDIES (Platzhalter, per Flag deaktiviert) */}
      {SHOW_CASE_STUDIES && <CaseStudies />}

      {/* 8 — HANDWERKS-DIGITAL-AUDIT (Leadmagnet) */}
      <section id="website-audit" className="section" style={{ background: "rgba(16, 185, 129, 0.03)" }}>
        <h2 className="section-title">Mach das <span className="highlight">Handwerks-Digital-Audit</span></h2>
        <p className="section-lead">
          Beantworte 11 kurze Fragen und finde in wenigen Minuten heraus, wo dein Betrieb digital Zeit,
          Anfragen und Fachkräfte verliert – und wo du schon stark aufgestellt bist.
        </p>
        <AuditQuiz />
      </section>

      {/* 9 — INTERAKTIVER PREIS-RECHNER */}
      <section id="preisrechner" className="section" style={{ maxWidth: "960px", margin: "0 auto" }}>
        <span className="section-eyebrow">Preis-Rechner</span>
        <h2 className="section-title">Was kostet deine <span className="highlight">Website?</span></h2>
        <p className="section-lead">
          Stell dir deine Wunsch-Website zusammen – der Live-Preis zählt sofort mit. Übernimm die
          Auswahl mit einem Klick in deine Anfrage.
        </p>
        <Reveal>
          <PriceCalculator />
        </Reveal>
      </section>

      {/* 10 — ROADMAP (scroll-animierte Timeline) */}
      <RoadmapTimeline />

      <section className="section final-cta">
        <Reveal>
          <h2 className="section-title">Bereit für den nächsten Schritt?</h2>
          <p className="section-lead">
            Lass uns unverbindlich über dein Projekt sprechen – klar, ehrlich und ohne Verkaufsdruck.
          </p>
          <div className="center-wrapper" style={{ marginBottom: 0 }}>
            <MagneticButton href="/offer" className="cta-primary cta-primary--lg">
              {CTA_TEXT}
            </MagneticButton>
          </div>
        </Reveal>
      </section>

      {/* 11 — VERSPRECHEN (Testimonials per Flag deaktiviert) */}
      <section className="section" style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "100px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 className="section-title">Meine <span className="highlight">Versprechen</span> an dich</h2>
          <div className="grid" style={{ marginTop: "30px", gap: "20px" }}>
            <Reveal>
              <div className="card promise-card">
                <div style={{ fontSize: "2.6rem", marginBottom: "14px" }}>🤝</div>
                <h3>Persönlich &amp; Vor Ort</h3>
                <p>Keine ewigen Warteschleifen. Du hast immer mich als direkten Ansprechpartner – auf Wunsch auch gerne bei einem Kaffee.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="card promise-card">
                <div style={{ fontSize: "2.6rem", marginBottom: "14px" }}>💶</div>
                <h3>100% Kostentransparenz</h3>
                <p>Keine versteckten Gebühren oder böse Überraschungen auf der Rechnung. Wir vereinbaren klare Fixpreise oder Pakete.</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="card promise-card">
                <div style={{ fontSize: "2.6rem", marginBottom: "14px" }}>🔒</div>
                <h3>Sicher &amp; DSGVO-konform</h3>
                <p>Deine Website wird nach aktuellen Sicherheitsstandards entwickelt und hostet datenschutzkonform in Europa.</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* TODO: Kundenstimmen erst wieder aktivieren, wenn echte, verifizierbare Case Studies vorliegen.
            Bis dahin über SHOW_TESTIMONIALS deaktiviert – der Code darunter bleibt vollständig erhalten. */}
        {SHOW_TESTIMONIALS && (
          <div style={{ textAlign: "center", marginTop: "120px" }}>
            <h2 className="section-title">Das sagen <span className="highlight">Kunden</span></h2>
            <div className="grid" style={{ marginTop: "30px", gap: "30px" }}>
              <div className="card" style={{ padding: "32px", textAlign: "left", marginBottom: "0", position: "relative", border: "1px solid rgba(16, 185, 129, 0.18)" }}>
                <div style={{ fontSize: "3.5rem", color: "rgba(16, 185, 129, 0.18)", position: "absolute", top: "10px", right: "20px", fontFamily: "serif", lineHeight: 1 }}>&quot;</div>
                <p style={{ fontStyle: "italic", marginBottom: "20px", position: "relative", zIndex: 1, lineHeight: 1.7 }}>
                  &quot;Niklas hat unsere alte Website komplett neu aufgestellt. Endlich konnten neue Kunden generiert werden und die Zusammenarbeit war super unkompliziert. Absolute Empfehlung!&quot;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #10B981, #34D399)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#0F172A", flexShrink: 0 }}>T</div>
                  <div>
                    <h4 style={{ color: "#fff", margin: 0, fontSize: "0.95rem", fontWeight: 700 }}>Thorsten Bach</h4>
                    <span style={{ color: "#34D399", fontSize: "0.82rem" }}>Handwerksbetrieb aus dem Emsland</span>
                  </div>
                </div>
              </div>
              <div className="card" style={{ padding: "32px", textAlign: "left", marginBottom: "0", position: "relative", border: "1px solid rgba(16, 185, 129, 0.18)" }}>
                <div style={{ fontSize: "3.5rem", color: "rgba(16, 185, 129, 0.18)", position: "absolute", top: "10px", right: "20px", fontFamily: "serif", lineHeight: 1 }}>&quot;</div>
                <p style={{ fontStyle: "italic", marginBottom: "20px", position: "relative", zIndex: 1, lineHeight: 1.7 }}>
                  &quot;Wir brauchten eine Software-Lösung für unsere internen Prozesse. Zentara hat das Problem schnell gelöst und perfekt umgesetzt. Sehr professionell.&quot;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #10B981, #34D399)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#0F172A", flexShrink: 0 }}>S</div>
                  <div>
                    <h4 style={{ color: "#fff", margin: 0, fontSize: "0.95rem", fontWeight: 700 }}>Sarah Schmidt</h4>
                    <span style={{ color: "#34D399", fontSize: "0.82rem" }}>Geschäftsführerin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 12 — FAQ */}
      <section id="faq" className="section" style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "100px" }}>
        <h2 className="section-title">Häufige <span className="highlight">Fragen</span></h2>
        <p className="section-lead">
          Noch unsicher? Hier findest du die Antworten auf Fragen, die mir oft gestellt werden.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px", textAlign: "left" }}>
          <details className="faq-item">
            <summary>
              Was kostet eine Website bei Zentara?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Das hängt vom Umfang ab. Eine moderne Basis-Website startet bei 799 €. Für komplexere Projekte mit Buchungssystemen oder individueller Software mache ich dir nach unserem Erstgespräch ein faires, transparentes Festpreis-Angebot. Keine versteckten Kosten!
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Wie lange dauert die Umsetzung?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Eine klassische Unternehmenswebsite dauert in der Regel etwa 2 bis 4 Wochen von der ersten Idee bis zum Go-Live. Bei individueller Software oder komplexeren Web-Apps planen wir den Zeitrahmen gemeinsam im Konzept-Gespräch.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Muss ich Texte und Bilder selbst liefern?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Wenn du schon Material hast – super! Wenn nicht, ist das auch kein Problem. Ich unterstütze dich gerne bei der Strukturierung und Erstellung der Texte. Für professionelle Fotos kann ich dir Tipps geben oder Kontakte vermitteln.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Was passiert, wenn die Seite online ist?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Du wirst nach dem Go-Live nicht allein gelassen! Mit meinem &quot;Rundum-Sorglos-Paket&quot; kümmere ich mich dauerhaft um Updates, Backups, Sicherheit und kleine Textänderungen. Du kannst dich zu 100 % auf dein Tagesgeschäft konzentrieren.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Bindet ihr auch unsere Handwerkersoftware an (z. B. DATEV, GAEB, DATANORM)?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Ja. Ich entwickle individuelle Schnittstellen zwischen deiner Website und deiner Handwerkersoftware – etwa DATANORM- und GAEB-Anbindung für den Großhandel, DATEV- und ZUGFeRD-Rechnungsexport oder IDS Connect für Online-Bestellungen. So entfällt doppelte Dateneingabe, und deine Systeme arbeiten direkt zusammen statt nebeneinander.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Baut ihr auch ein Bewerberportal, über das sich Fachkräfte direkt bei uns bewerben können?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Ja, ein Express-Bewerberportal gehört zu meinen Smarte-Software-Lösungen. Bewerber können sich in unter zwei Minuten direkt über deine Website melden – ohne PDF-Upload oder Umwege über Jobportale. Das senkt die Hürde für Initiativbewerbungen deutlich und hilft dir aktiv bei der Mitarbeitergewinnung.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Was unterscheidet eine Website von euch von einer Baukasten-Seite wie Wix oder Jimdo?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Baukästen nutzen Vorlagen, die tausende andere Firmen ebenfalls verwenden, und sind bei individuellen Funktionen schnell begrenzt. Ich programmiere jede Website individuell mit Next.js – schneller, technisch flexibler und ohne fremdes Branding. Das Ergebnis ist eine Seite, die exakt zu deinem Betrieb passt statt zu einer Vorlage.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Wir haben schon eine Agentur bzw. einen Bekannten, der unsere Website macht – warum zu euch wechseln?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Viele Agenturen konzentrieren sich rein aufs Design. Mein Schwerpunkt liegt zusätzlich auf der technischen Tiefe: Anbindung an DATANORM, GAEB oder DATEV, Bewerberportale und Performance. Wenn deine aktuelle Lösung solche Schnittstellen nicht bietet, lohnt sich zumindest ein unverbindliches Gespräch, um Lücken zu identifizieren.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Wir sind aktuell auf Monate ausgebucht – brauchen wir überhaupt eine neue Website?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Gerade dann kann sich eine Überarbeitung lohnen – nicht um mehr Anfragen zu bekommen, sondern um gezielt margenstarke Aufträge anzuziehen, unrentable Kleinanfragen zu filtern und über ein Bewerberportal dringend benötigte Fachkräfte zu gewinnen. Es geht also um Qualität statt Menge.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Ist meine Website bei euch DSGVO-konform und rechtlich abgesichert?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Ja, alle Websites werden 100% DSGVO-konform umgesetzt, inklusive datenschutzkonformem Hosting in Europa, korrekter Datenschutzerklärung und – wo nötig – Cookie-Einwilligung. Rechtliche Basics wie ein rechtssicheres Impressum gehören ebenfalls zum Leistungsumfang, damit du dir darüber keine Sorgen machen musst.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Kann ich die Inhalte später selbst pflegen, oder brauche ich dafür Programmierkenntnisse?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Kleine Textanpassungen kannst du je nach Setup meist selbst vornehmen oder gibst sie mir kurz durch – ganz ohne Programmierkenntnisse. Für laufende Wartung, Updates und größere Änderungen übernehme ich im Rundum-Sorglos-Paket die komplette Pflege, damit du dich auf dein Tagesgeschäft konzentrieren kannst.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Arbeitet ihr auch mit Betrieben außerhalb des Emslands/Niedersachsens zusammen?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Ja, ich arbeite deutschlandweit remote mit Handwerksbetrieben und KMU zusammen – Erstgespräche und Abstimmungen laufen unkompliziert per Video-Call oder Telefon. Persönliche Vor-Ort-Termine sind im Emsland und der näheren Umgebung ebenfalls möglich, aber keine Voraussetzung für die Zusammenarbeit.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Bietet ihr auch reine Softwarelösungen ohne Website an, z. B. interne Tools?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Ja. Neben Websites entwickle ich auch eigenständige interne Tools – etwa digitale Urlaubsanträge, Buchungssysteme, Kosten-Kalkulatoren oder Schnittstellen zu deiner Handwerkersoftware. Diese Lösungen laufen unabhängig von deiner Website und werden individuell auf deinen Arbeitsalltag zugeschnitten.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Wie läuft die Zusammenarbeit ab – von der ersten Anfrage bis zum Livegang?
              <span className="faq-plus" aria-hidden="true">+</span>
            </summary>
            <p>
              Nach deiner unverbindlichen Anfrage folgt ein kostenloses Erstgespräch, danach Konzeption, Design und Entwicklung mit modernen Frameworks wie Next.js, gefolgt von gemeinsamem Review und Launch. Eine klassische Website dauert dabei in der Regel 2 bis 4 Wochen.
            </p>
          </details>

        </div>
      </section>

      {/* 13 — ÜBER MICH */}
      <section id="about" className="section">
        <h2>Über mich</h2>
        <div style={{ marginBottom: "20px" }}>
          <Image
            className="aboutImage"
            src="/assets/images/ich.png"
            alt="Niklas Smit"
            width={200}
            height={300}
            style={{ borderRadius: "10px", objectFit: "cover" }}
          />
        </div>
        <p style={{ maxWidth: 700, margin: "0 auto" }}>
          Ich bin Niklas Smit. Ich arbeite pragmatisch, analytisch und lösungsorientiert. <br /> <br />
          Herausforderungen gehe ich direkt an, hinterfrage bestehende Ansätze und suche nach effizienten, technisch sauberen Lösungen. <br /> <br />
          Dabei lege ich Wert auf klare Ergebnisse, kontinuierliche Verbesserung und eine strukturierte Umsetzung.
        </p>
        {/* Lokaler SEO-Bezug (Platzhalter – Region eintragen) */}
        <p style={{ maxWidth: 700, margin: "20px auto 0", color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Webentwicklung &amp; individuelle Software für Handwerksbetriebe und KMU in{" "}
          <strong>Lingen</strong> – persönlich betreut,
          deutschlandweit umsetzbar.
        </p>
      </section>

      {/* 14 — ABSCHLUSS-CTA (gleicher Text wie im Hero) */}
      <section className="section final-cta">
        <Reveal>
          <h2 className="section-title">Bereit für den nächsten Schritt?</h2>
          <p className="section-lead">
            Lass uns unverbindlich über dein Projekt sprechen – klar, ehrlich und ohne Verkaufsdruck.
          </p>
          <div className="center-wrapper" style={{ marginBottom: 0 }}>
            <MagneticButton href="/offer" className="cta-primary cta-primary--lg">
              {CTA_TEXT}
            </MagneticButton>
          </div>
        </Reveal>
      </section>

      {/* 15 — FOOTER */}
      <footer id="footer" className="footer">
        <div className="footer-content footer-content--relaunch">
          {/* Spalte 1: Brand & Info */}
          <div className="footer-column">
            <span className="footer-logo">Zentara-Solutions</span>
            <p>Individuelle &amp; performante Webentwicklung für dein Business. Klar, modern und lösungsorientiert.</p>

            <div style={{ marginTop: "18px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={whatsappHref}
                target={whatsappReady ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="whatsapp-btn"
                aria-label="Kontakt über WhatsApp"
              >
                <FaWhatsapp aria-hidden="true" /> WhatsApp
              </a>
              <Link
                href="https://www.instagram.com/zentara.official"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social-icon"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>

          {/* Spalte 2: Navigation */}
          <div className="footer-column">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><Link href="/pricing">Dienstleistungen &amp; Preise</Link></li>
              <li><Link href="/project#portfolio">Projekte</Link></li>
              <li><Link href="#about">Über mich</Link></li>
              <li><Link href="/offer" className="highlight-link">Angebot anfordern</Link></li>
            </ul>

            <h4 style={{ marginTop: "24px" }}>Rechtliches</h4>
            <ul className="footer-links">
              <li><Link href="/impressum">Impressum</Link></li>
              <li><Link href="/datenschutz">Datenschutzerklärung</Link></li>
            </ul>
          </div>

          {/* Spalte 3: Kurzes Kontaktformular */}
          <div className="footer-column footer-column--contact">
            <h4>Schreib mir kurz</h4>
            <p className="footer-contact-intro">
              Eine Zeile genügt – ich melde mich zeitnah bei dir zurück.
            </p>
            <FooterContact />
            <p style={{ marginTop: "14px" }}>
              <a href="mailto:info@zentara-solutions.de" className="footer-contact-link">info@zentara-solutions.de</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Niklas Smit - Zentara-Solutions. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </section>
  );
}
