"use client";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Image from "next/image";
import Typewriter from "../components/Typewriter/Typewriter";
import { useState } from "react";
import Impressum from "./impressum/page";
import AppDownload from "../components/AppDownload";
import RealEstateChatbot from "../components/RealEstateChatbot";
import OfferPrizing from "./pricing/page";
import { FaInstagram } from "react-icons/fa";
import AuditQuiz from "../components/AuditQuiz";

export default function HomePage() {
  // --- SLIDESHOW LOGIK ---
  const projectImages = [
    "/assets/images/LogIn.png",
    "/assets/images/Balkendiagramm.png",
    "/assets/images/Kuchendiagramm.png",
    "/assets/images/Buchungen.png",
    "/assets/images/Buchungenliste.png",
    "/assets/images/Kategorien.png",
  ];
  const projectImagesDownload = [
    "/assets/images/loginmotoset .png",
    "/assets/images/start.png",
    "/assets/images/setup.png",
    "/assets/images/strecke.png",
    "/assets/images/federbein.png",
    "/assets/images/session.png",

  ];

  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = () => {
    setCurrentImg((prev) => (prev + 1) % projectImages.length);
  };

  const prevImg = () => {
    setCurrentImg((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
  };
  // -----------------------


  return (
    <section>
      <NavBar />

      <section className="hero">
        <div className="hero-content">
          <span><Typewriter /></span>
        </div>


        <div className="heroSlogan">
          <p>Ich entwickle individuelle Websites und Anwendungen, um dein Unternehmen digital sichtbar, effizient und zukunftssicher zu machen.</p>
          <Link href="/offer" className="cta-button">
            Jetzt Angebot anfordern
          </Link>
        </div>
      </section>

      <RealEstateChatbot />

      {/* WARUM ZENTARA BEREICH */}
      <section id="why-zentara" className="section" style={{
        background: "linear-gradient(to bottom, transparent 0%, rgba(15,23,42,0.97) 25%, rgba(15,23,42,0.97) 75%, transparent 100%)",
        paddingBottom: "clamp(80px,12vw,300px)", paddingTop: "clamp(80px,12vw,300px)"
      }}>        <h2 className="section-title">Warum <span className="highlight">Zentara?</span></h2>
        <p style={{ color: "#94a3b8", maxWidth: "700px", margin: "0 auto 40px", fontSize: "1.05rem", lineHeight: "1.7" }}>
          Standard-Baukästen stoßen schnell an ihre Grenzen. Ich biete dir Lösungen, die genau auf dein Unternehmen zugeschnitten sind.
        </p>

        <div className="grid">
          {/* Grund 1 */}
          <div className="card why-card" style={{ padding: "40px 30px", textAlign: "left", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "0", border: "1px solid rgba(16, 185, 129, 0.22)" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "4px" }}>⚡</div>
            <h3 style={{ fontSize: "1.2rem", color: "white", margin: 0, fontWeight: 700 }}>Moderne Technologie</h3>
            <p style={{ margin: 0 }}>
              Keine langsamen Standard-Templates. Ich baue blitzschnelle, zukunftssichere Web-Anwendungen mit modernsten Frameworks.
            </p>
          </div>

          {/* Grund 2 */}
          <div className="card why-card" style={{ padding: "40px 30px", textAlign: "left", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "0", border: "1px solid rgba(16, 185, 129, 0.22)" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "4px" }}>🤝</div>
            <h3 style={{ fontSize: "1.2rem", color: "white", margin: 0, fontWeight: 700 }}>Persönlich & Direkt</h3>
            <p style={{ margin: 0 }}>
              Keine anonyme Agentur, keine ewigen Warteschleifen. Du hast einen festen Ansprechpartner, der dein Projekt von A bis Z kennt.
            </p>
          </div>

          {/* Grund 3 */}
          <div className="card why-card" style={{ padding: "40px 30px", textAlign: "left", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "0", border: "1px solid rgba(16, 185, 129, 0.22)" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "4px" }}>🎯</div>
            <h3 style={{ fontSize: "1.2rem", color: "white", margin: 0, fontWeight: 700 }}>100% Maßgeschneidert</h3>
            <p style={{ margin: 0 }}>
              Dein Unternehmen ist einzigartig – deine Software sollte es auch sein. Ich entwickle exakt das, was du brauchst, ohne unnötigen Ballast.
            </p>
          </div>

          {/* Grund 4 */}
          <div className="card why-card" style={{ padding: "40px 30px", textAlign: "left", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "0", border: "1px solid rgba(16, 185, 129, 0.22)" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "4px" }}>🛡️</div>
            <h3 style={{ fontSize: "1.2rem", color: "white", margin: 0, fontWeight: 700 }}>Rundum-Sorglos</h3>
            <p style={{ margin: 0 }}>
              Von der ersten Idee über das Design bis hin zum sicheren Hosting und der laufenden Wartung übernehme ich die komplette Technik.
            </p>
          </div>
        </div>
      </section>

      {/* VERGLEICHS-SEKTION (08/15 vs Zentara) */}
      <section className="section" style={{ maxWidth: "1150px", margin: "0 auto", }}>
        <h2 className="section-title">08/15 Webseite vs. <br /> <span className="highlight">Zentara Lösung</span></h2>
        <p style={{ color: "#94a3b8", marginBottom: "50px", fontSize: "1.05rem", lineHeight: "1.7" }}>
          Das macht den Unterschied zwischen einer einfachen Online-Visitenkarte und einem echten digitalen Aushängeschild aus:
        </p>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", marginTop: "0", }}>

          {/* Die schlechte 08/15 Webseite */}
          <div className="card" style={{ padding: "40px 30px", textAlign: "left", marginBottom: 0, opacity: 0.75, paddingBottom: "40px" }}>
            <h3 style={{ fontSize: "1.4rem", color: "#94a3b8", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "14px", fontWeight: 700 }}>
              08/15 Baukasten-Seite
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "30px" }}>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#94a3b8" }}>
                <span>❌</span> <span>Keine klare Botschaft für den Besucher</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#94a3b8" }}>
                <span>❌</span> <span>Wirkt altmodisch und erzeugt <br />kein Vertrauen</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#94a3b8" }}>
                <span>❌</span> <span>Lange Ladezeiten, die Kunden abbrechen lassen</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#94a3b8" }}>
                <span>❌</span> <span>Auf dem Smartphone verschoben oder schlecht lesbar</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#94a3b8" }}>
                <span>❌</span> <span>Verwirrt den Nutzer, statt ihn zu leiten</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#94a3b8" }}>
                <span>❌</span> <span>Generiert keine echten Kundenanfragen</span>
              </li>
            </ul>
          </div>

          {/* Die Premium Zentara Webseite */}
          <div className="card" style={{ padding: "40px 30px", textAlign: "left", marginBottom: 0, border: "1px solid rgba(16, 185, 129, 0.45)", boxShadow: "0 0 30px rgba(16, 185, 129, 0.10)" }}>
            <h3 style={{ fontSize: "1.4rem", color: "#fff", marginBottom: "20px", borderBottom: "1px solid rgba(16, 185, 129, 0.22)", paddingBottom: "14px", fontWeight: 700 }}>
              Verkaufsstarke Webseite
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "30px" }}>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#e2e8f0" }}>
                <span>✅</span> <span>Das Angebot wird in Sekunden sofort verstanden</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#e2e8f0" }}>
                <span>✅</span> <span>Modernes Design baut direkt Vertrauen auf</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#e2e8f0" }}>
                <span>✅</span> <span>Blitzschnelle Ladezeiten durch moderne Next.js Technik</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#e2e8f0" }}>
                <span>✅</span> <span>100% optimiert für jedes Smartphone & Tablet</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#e2e8f0" }}>
                <span>✅</span> <span>Klare Struktur und intuitive Bedienung</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#fff", fontWeight: "bold" }}>
                <span>✅</span> <span>Verwandelt einfache Besucher in zahlende Kunden</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* --- NEU: LEADMAGNET AUDIT QUIZ HIER EINFÜGEN --- */}
      <section id="website-audit" className="section" style={{ background: "rgba(16, 185, 129, 0.03)" }}>
        <h2 className="section-title">Machen Sie den 5-Minuten <span className="highlight">Website-Check</span></h2>
        <p style={{ color: "#94a3b8", marginBottom: "40px", fontSize: "1.05rem", lineHeight: "1.7", maxWidth: "700px", margin: "0 auto 40px" }}>
          Finden Sie in 7 kurzen Fragen heraus, ob Ihre Website Kunden gewinnt oder unbemerkt Zeit und Umsatz verbrennt.
        </p>
        
        <AuditQuiz />
        
      </section>

      {/* NEUER PROJEKT BEREICH MIT SLIDER */}
      <section id="portfolio" className="section">
        <h2>Aktuelles Projekt: Money-Dashboard</h2>

        <div className="portfolio-container">
          <div className="portfolio-card">

            {/* Bild-Slider */}
            <div className="slider-wrapper">
              <button className="slider-btn prev-btn" onClick={prevImg}>&#10094;</button>

              <div className="slider-image-container">
                <Image
                  src={projectImages[currentImg]}
                  alt={`Projekt Screenshot ${currentImg + 1}`}
                  width={800}
                  height={450}
                  className="slider-image"
                />
              </div>

              <button className="slider-btn next-btn" onClick={nextImg}>&#10095;</button>

              {/* Kleine Indikator-Punkte unten */}
              <div className="slider-dots">
                {projectImages.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentImg ? "active" : ""}`}
                    onClick={() => setCurrentImg(index)}
                  ></span>
                ))}
              </div>
            </div>

            {/* Projekt-Info & Link */}
            <div className="portfolio-info">
              <h3>Finanz-Übersicht leicht gemacht</h3>
              <p>
                Dieses Projekt ist eine benutzerfreundliche und sichere Webanwendung zur Verwaltung von persönlichen oder geschäftlichen Finanzen. <br />
                <br />
                Das Ziel des Dashboards ist es, alltägliche Zahlungsströme in einer klaren, leicht verständlichen Übersicht darzustellen, damit Nutzer jederzeit die volle Kontrolle über ihr Geld behalten.
                <br />
                Schluss mit kompliziertem Papierkram oder unübersichtlichen Excel-Tabellen.
                <br /> <br />
                Das Finanz-Dashboard bietet eine moderne, intuitive und stressfreie Lösung, um Finanzen smart zu planen und fundierte finanzielle Entscheidungen zu treffen.
              </p>
              <Link href="https://money-dashboard-qem5mns8rbvthdkgffx5uq.streamlit.app/" target="_blank" rel="noopener noreferrer" className="project-link-btn">
                Live Projekt ansehen
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* MotoSet Projekt Bereich mit eigenem Slider */}
      <section id="motoset" className="section">
        <h2>Aktuelles Projekt: MotoSet</h2>

        <div className="portfolio-container">
          <div className="portfolio-card">

            {/* Bild-Slider */}
            <div className="slider-wrapper">
              <button className="slider-btn prev-btn" onClick={prevImg}>&#10094;</button>

              <div className="slider-image-container">
                <Image
                  src={projectImagesDownload[currentImg]}
                  alt={`Projekt Screenshot ${currentImg + 1}`}
                  width={800}
                  height={450}
                  className="slider-image"
                />
              </div>

              <button className="slider-btn next-btn" onClick={nextImg}>&#10095;</button>

              {/* Kleine Indikator-Punkte unten */}
              <div className="slider-dots">
                {projectImagesDownload.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentImg ? "active" : ""}`}
                    onClick={() => setCurrentImg(index)}
                  ></span>
                ))}
              </div>
            </div>

            {/* Projekt-Info & Link */}
            {/* Projekt-Info & Link */}
            <div className="portfolio-info">
              <h3>Fahrwerkeinstellungen-Übersicht leicht gemacht</h3>
              <p>
                MotoSet ist eine moderne, mobile Anwendung zur strukturierten Erfassung und Optimierung von Motorrad-Fahrwerks-Setups, speziell für Trackdays und ambitionierte Fahrer. <br />
                <br />
                Ziel der Anwendung ist es, komplexe Fahrwerksdaten einfach zugänglich zu machen und Fahrern dabei zu helfen, ihr Setup effizient zu analysieren und gezielt zu optimieren.<br />
                <br />
                Durch die Anbindung an eine Cloud-Datenbank bleiben alle Daten sicher gespeichert und geräteübergreifend verfügbar. Die Anmeldung erfolgt flexibel per E-Mail oder Google-Konto.
              </p>

              {/* NEU: Professionelle Info-Box für iOS / Android */}
              <div style={{ padding: "15px 20px", backgroundColor: "rgba(16, 185, 129, 0.06)", borderLeft: "4px solid #10B981", borderRadius: "0 8px 8px 0", margin: "25px 0" }}>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "#e2e8f0" }}>
                  <strong>Plattform-Hinweis:</strong> MotoSet steht als native <strong>Android-App</strong> zum direkten Download bereit. Für <strong>Apple iOS (iPhone/iPad)</strong> sowie alle Desktop-Nutzer wurde eine voll funktionsfähige <strong>Web-App</strong> entwickelt, die nahtlos und ohne Installation direkt im Browser läuft.
                </p>
              </div>

              {/* NEU: Button Container (Flexbox für nebeneinander/untereinander) */}
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" }}>

                {/* Button 1: Dein bestehendes Modal für Android (Leuchtend) */}
                <AppDownload />

                {/* Button 2: Der neue Web-App Link (Edler Rahmen) */}
                <Link
                  href="https://motoset-2d516.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "8px 25px",
                    background: "transparent",
                    color: "#34D399",
                    textDecoration: "none",
                    fontWeight: "bold",
                    borderRadius: "50px",
                    border: "2px solid rgba(16, 185, 129, 0.50)",
                    transition: "0.25s",
                    fontSize: "0.93rem"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(16, 185, 129, 0.10)";
                    e.currentTarget.style.boxShadow = "0 0 18px rgba(16, 185, 129, 0.22)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Web-App öffnen
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="roadmap-section">
        <h2 className="section-title">Dein Weg zum Erfolg</h2>
        <div className="roadmap-container">
          <div className="roadmap-item">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Formular</h3>
              <p>Fülle das <a href="/offer" className="roadmap-button" >Kontaktformular</a> unverbindlich aus.</p>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Erstgespräch</h3>
              <p>Wir klären die Anforderungen und stecken den Rahmen ab.</p>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Konzeption</h3>
              <p>Wir entwickeln ein detailliertes Konzept für dein Projekt.</p>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3>Design & Prototyping</h3>
              <p>Wir erstellen ein visuelles Design, das genau zu dir oder deinem Betrieb passt.</p>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="step-number">05</div>
            <div className="step-content">
              <h3>Entwicklung</h3>
              <p>Die Website wird zum Leben erweckt – responsiv, schnell und suchmaschinenoptimiert.</p>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="step-number">06</div>
            <div className="step-content">
              <h3>Review & Launch</h3>
              <p>Gemeinsamer Check, letzte Schliffe und das Go-Live deiner neuen Website.</p>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="step-number">07</div>
            <div className="step-content">
              <h3>Wartung & Support (optional)</h3>
              <p>Ich kümmere mich um Updates und Sicherheit, damit du dich voll und ganz auf dein Business konzentrieren kannst.</p>
            </div>
          </div>
        </div>

        <div className="center-wrapper">
          <Link href="/offer" className="cta-roadmap">
            Jetzt Angebot anfordern
          </Link>
        </div>
      </section>

      {/* VERTRAUENS-SEKTION */}
      <section className="section" style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "100px" }}>

        {/* Teil 1: Die Garantien */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 className="section-title">Meine <span className="highlight">Versprechen</span> an dich</h2>
          <div className="grid" style={{ marginTop: "30px", gap: "20px" }}>

            <div className="card" style={{ padding: "32px", marginBottom: "0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", border: "1px solid rgba(16, 185, 129, 0.16)" }}>
              <div style={{ fontSize: "2.6rem", marginBottom: "14px" }}>🤝</div>
              <h3 style={{ color: "#fff", fontSize: "1.15rem", marginBottom: "10px", fontWeight: 700 }}>Persönlich & Vor Ort</h3>
              <p style={{ margin: 0, fontSize: "0.92rem" }}>Keine ewigen Warteschleifen. Du hast immer mich als direkten Ansprechpartner – auf Wunsch auch gerne bei einem Kaffee.</p>
            </div>

            <div className="card" style={{ padding: "32px", marginBottom: "0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", border: "1px solid rgba(16, 185, 129, 0.16)" }}>
              <div style={{ fontSize: "2.6rem", marginBottom: "14px" }}>💶</div>
              <h3 style={{ color: "#fff", fontSize: "1.15rem", marginBottom: "10px", fontWeight: 700 }}>100% Kostentransparenz</h3>
              <p style={{ margin: 0, fontSize: "0.92rem" }}>Keine versteckten Gebühren oder böse Überraschungen auf der Rechnung. Wir vereinbaren klare Fixpreise oder Pakete.</p>
            </div>

            <div className="card" style={{ padding: "32px", marginBottom: "0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", border: "1px solid rgba(16, 185, 129, 0.16)" }}>
              <div style={{ fontSize: "2.6rem", marginBottom: "14px" }}>🔒</div>
              <h3 style={{ color: "#fff", fontSize: "1.15rem", marginBottom: "10px", fontWeight: 700 }}>Sicher & DSGVO-konform</h3>
              <p style={{ margin: 0, fontSize: "0.92rem" }}>Deine Website wird nach aktuellen Sicherheitsstandards entwickelt und hostet datenschutzkonform in Europa.</p>
            </div>

          </div>
        </div>

        {/* Teil 2: Kundenstimmen (Testimonials) */}
        <div style={{ textAlign: "center", marginTop: "120px" }}>
          <h2 className="section-title">Das sagen <span className="highlight">Kunden</span></h2>
          <div className="grid" style={{ marginTop: "30px", gap: "30px" }}>

            {/* Bewertung 1 */}
            <div className="card" style={{ padding: "32px", textAlign: "left", marginBottom: "0", position: "relative", border: "1px solid rgba(16, 185, 129, 0.18)" }}>
              <div style={{ fontSize: "3.5rem", color: "rgba(16, 185, 129, 0.18)", position: "absolute", top: "10px", right: "20px", fontFamily: "serif", lineHeight: 1 }}>"</div>
              <p style={{ fontStyle: "italic", marginBottom: "20px", position: "relative", zIndex: 1, lineHeight: 1.7 }}>
                "Niklas hat unsere alte Website komplett neu aufgestellt. Endlich konnten neue Kunden generiert werden und die Zusammenarbeit war super unkompliziert. Absolute Empfehlung!"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #10B981, #34D399)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#0F172A", flexShrink: 0 }}>
                  T
                </div>
                <div>
                  <h4 style={{ color: "#fff", margin: 0, fontSize: "0.95rem", fontWeight: 700 }}>Thorsten Bach</h4>
                  <span style={{ color: "#34D399", fontSize: "0.82rem" }}>Handwerksbetrieb aus dem Emsland</span>
                </div>
              </div>
            </div>

            {/* Bewertung 2 */}
            <div className="card" style={{ padding: "32px", textAlign: "left", marginBottom: "0", position: "relative", border: "1px solid rgba(16, 185, 129, 0.18)" }}>
              <div style={{ fontSize: "3.5rem", color: "rgba(16, 185, 129, 0.18)", position: "absolute", top: "10px", right: "20px", fontFamily: "serif", lineHeight: 1 }}>"</div>
              <p style={{ fontStyle: "italic", marginBottom: "20px", position: "relative", zIndex: 1, lineHeight: 1.7 }}>
                "Wir brauchten eine Software-Lösung für unsere internen Prozesse. Zentara hat das Problem schnell gelöst und perfekt umgesetzt. Sehr professionell."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #10B981, #34D399)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#0F172A", flexShrink: 0 }}>
                  S
                </div>
                <div>
                  <h4 style={{ color: "#fff", margin: 0, fontSize: "0.95rem", fontWeight: 700 }}>Sarah Schmidt</h4>
                  <span style={{ color: "#34D399", fontSize: "0.82rem" }}>Geschäftsführerin</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* FAQ BEREICH */}
      <section id="faq" className="section" style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "100px" }}>
        <h2 className="section-title">Häufige <span className="highlight">Fragen</span></h2>
        <p style={{ color: "#94a3b8", marginBottom: "40px", fontSize: "1.05rem", lineHeight: "1.7" }}>
          Noch unsicher? Hier findest du die Antworten auf Fragen, die mir oft gestellt werden.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px", textAlign: "left" }}>

          {/* Frage 1 */}
          <details style={{ background: "rgba(10, 20, 45, 0.70)", border: "1px solid rgba(99, 102, 241, 0.14)", borderRadius: "14px", padding: "20px 24px", cursor: "pointer", transition: "border-color 0.25s", backdropFilter: "blur(12px)" }}>
            <summary style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f1f5f9", outline: "none", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
              Was kostet eine Website bei Zentara?
              <span style={{ color: "#34D399", fontSize: "1.3rem", fontWeight: 300, flexShrink: 0 }}>+</span>
            </summary>
            <p style={{ color: "#94a3b8", marginTop: "16px", marginBottom: "0", lineHeight: "1.7", borderTop: "1px solid rgba(16,185,129,0.10)", paddingTop: "16px" }}>
              Das hängt vom Umfang ab. Eine moderne Basis-Website startet bei 799 €. Für komplexere Projekte mit Buchungssystemen oder individueller Software mache ich dir nach unserem Erstgespräch ein faires, transparentes Festpreis-Angebot. Keine versteckten Kosten!
            </p>
          </details>

          {/* Frage 2 */}
          <details style={{ background: "rgba(10, 20, 45, 0.70)", border: "1px solid rgba(99, 102, 241, 0.14)", borderRadius: "14px", padding: "20px 24px", cursor: "pointer", transition: "border-color 0.25s", backdropFilter: "blur(12px)" }}>
            <summary style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff", outline: "none", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Wie lange dauert die Umsetzung?
              <span style={{ color: "#34D399", fontSize: "1.3rem", fontWeight: 300, flexShrink: 0 }}>+</span>
            </summary>
            <p style={{ color: "#94a3b8", marginTop: "16px", marginBottom: "0", lineHeight: "1.7", borderTop: "1px solid rgba(16,185,129,0.10)", paddingTop: "16px" }}>
              Eine klassische Unternehmenswebsite dauert in der Regel etwa 2 bis 4 Wochen von der ersten Idee bis zum Go-Live. Bei individueller Software oder komplexeren Web-Apps planen wir den Zeitrahmen gemeinsam im Konzept-Gespräch.
            </p>
          </details>

          {/* Frage 3 */}
          <details style={{ background: "rgba(10, 20, 45, 0.70)", border: "1px solid rgba(99, 102, 241, 0.14)", borderRadius: "14px", padding: "20px 24px", cursor: "pointer", transition: "border-color 0.25s", backdropFilter: "blur(12px)" }}>
            <summary style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff", outline: "none", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Muss ich Texte und Bilder selbst liefern?
              <span style={{ color: "#34D399", fontSize: "1.3rem", fontWeight: 300, flexShrink: 0 }}>+</span>
            </summary>
            <p style={{ color: "#94a3b8", marginTop: "16px", marginBottom: "0", lineHeight: "1.7", borderTop: "1px solid rgba(16,185,129,0.10)", paddingTop: "16px" }}>
              Wenn du schon Material hast – super! Wenn nicht, ist das auch kein Problem. Ich unterstütze dich gerne bei der Strukturierung und Erstellung der Texte. Für professionelle Fotos kann ich dir Tipps geben oder Kontakte vermitteln.
            </p>
          </details>

          {/* Frage 4 */}
          <details style={{ background: "rgba(10, 20, 45, 0.70)", border: "1px solid rgba(99, 102, 241, 0.14)", borderRadius: "14px", padding: "20px 24px", cursor: "pointer", transition: "border-color 0.25s", backdropFilter: "blur(12px)" }}>
            <summary style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff", outline: "none", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Was passiert, wenn die Seite online ist?
              <span style={{ color: "#34D399", fontSize: "1.3rem", fontWeight: 300, flexShrink: 0 }}>+</span>
            </summary>
            <p style={{ color: "#94a3b8", marginTop: "16px", marginBottom: "0", lineHeight: "1.7", borderTop: "1px solid rgba(16,185,129,0.10)", paddingTop: "16px" }}>
              Du wirst nach dem Go-Live nicht allein gelassen! Mit meinem "Rundum-Sorglos-Paket" kümmere ich mich dauerhaft um Updates, Backups, Sicherheit und kleine Textänderungen. Du kannst dich <br />  zu 100 % auf dein Tagesgeschäft konzentrieren.
            </p>
          </details>

        </div>
      </section>

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
      </section>

      <footer id="footer" className="footer">
        <div className="footer-content">


          {/* Spalte 1: Brand & Info */}
          <div className="footer-column">
            <span className="footer-logo">Zentara</span>
            <p>Individuelle & performante Webentwicklung für dein Business. Klar, modern und lösungsorientiert.</p>
          </div>

          {/* Spalte 2: Quick Links */}
          <div className="footer-column">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><Link href="/pricing">Dienstleistungen & Preise</Link></li>
              <li><Link href="#portfolio">Projekte</Link></li>
              <li><Link href="#about">Über mich</Link></li>
              <li><Link href="/offer" className="highlight-link">Angebot anfordern</Link></li>
            </ul>
          </div>

          {/* Spalte 3: Kontakt & Rechtliches */}
          <div className="footer-column">
            <h4>Kontakt</h4>
            <p><a href="mailto:info@zentara-solutions.de" className="footer-contact-link">info@zentara-solutions.de</a></p>
            {/* Hier kannst du später auch Links zu GitHub oder LinkedIn einfügen */}
            {/* Social Media Bereich */}
            <div style={{ marginTop: "15px", display: "flex", gap: "15px" }}>
              <Link
                href="https://www.instagram.com/zentara.official" // <- Hier deinen Insta-Namen eintragen!
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  display: "inline-flex",
                  color: "#94a3b8", // Standard-Grau
                  transition: "color 0.3s ease",
                  fontSize: "25px" // Hier steuerst du direkt die Größe des Icons!
                }}
                onMouseOver={(e) => e.currentTarget.style.color = "#34D399"}
                onMouseOut={(e) => e.currentTarget.style.color = "#94a3b8"}
              >
                {/* Hier wird das React-Icon aufgerufen */}
                <FaInstagram />
              </Link>
            </div>

            <h4 style={{ marginTop: "20px" }}>Rechtliches</h4>
            <ul className="footer-links">
              <li><Link href="/impressum">Impressum</Link></li>
              <li><Link href="/datenschutz">Datenschutzerklärung</Link></li>
            </ul>
          </div>

        </div>

        {/* Die unterste Leiste */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Niklas Smit - Zentara. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </section>
  );
}