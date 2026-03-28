"use client";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Image from "next/image";
import Typewriter from "../components/Typewriter/Typewriter";
import { useState } from "react";
import Impressum from "./impressum/page";
import AppDownload from "../components/AppDownload";

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
          <p>Ich entwickle individuelle Websites, die Unternehmen professionell nach außen vertreten.</p>
          <Link href="/offer" className="cta-button">
            Jetzt Angebot anfordern
          </Link>
        </div>
      </section>

      <section id="services" className="section">
        <h2>Meine Dienstleistungen</h2>
        <div className="grid">

          {/*Karte 1 mit Rabatt Badge*/}
          <div className="card">
            <div className="discount-badge">Angebot</div>
            <h3>Webentwicklung</h3>
            <p>Moderne Webentwicklung mit Fokus auf Performance nach Kundenwunsch.</p>

            <div className="price-tag">
              <span className="old-price">ab 1099€</span>
              <span className="new-price">ab 799€</span>
            </div>
          </div>

          {/*Karte 2 Standard ohne Badge, aber reduziert */}
          <div className="card">
            <h3>Web-Nacharbeitung</h3>
            <p>Analyse, Optimierung und technische Weiterentwicklung bestehender Web-Anwendungen.</p>

            <div className="price-tag">
              <span className="old-price">ab 499€</span>
              <span className="new-price">ab 249€</span>
            </div>
          </div>

          {/*Karte 3 Stundenlohn / Fixpreis */}
          <div className="card">
            <h3>Webpflege</h3>
            <p>Kontinuierliche Pflege, Wartung und Optimierung bestehender Web-Lösungen.</p>

            <div className="price-tag">
              <span className="old-price">ab 49€/h</span>
              <span className="new-price">ab 29€/h</span>
            </div>
          </div>

        </div>
        <div>
          <Link href="/offer" className="cta-card">
            <b>Jetzt Angebot anfordern</b>
          </Link>
        </div>
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
        <h2>Aktuelles Projekt: Fahrwerkeinstellungs-App</h2>

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
            <div className="portfolio-info">
              <h3>Fahrwerkeinstellungen-Übersicht leicht gemacht</h3>
              <p>
                MotoSet ist eine moderne, mobile Anwendung zur strukturierten Erfassung und Optimierung von Motorrad-Fahrwerks-Setups, speziell für Trackdays und ambitionierte Fahrer. <br />
                <br />
                Ziel der Anwendung ist es, komplexe Fahrwerksdaten einfach zugänglich zu machen und Fahrern dabei zu helfen, ihr Setup effizient zu analysieren und gezielt zu optimieren.<br />
                <br />
                Durch die Anbindung an eine Cloud-Datenbank bleiben alle Daten sicher gespeichert und geräteübergreifend verfügbar. Die Anmeldung erfolgt flexibel per E-Mail oder Google-Konto.
              </p>
              <AppDownload />

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
              <p>Wir erstellen ein visuelles Design (UI), das genau zu dir passt.</p>
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
              <h3>Wartung & Support</h3>
              <p>Ich kümmere mich um Updates und Sicherheit, damit du dich auf dein Business konzentrieren kannst.</p>
            </div>
          </div>
        </div>

        <div className="center-wrapper">
          <Link href="/offer" className="cta-roadmap">
            Jetzt Angebot anfordern
          </Link>
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

      <footer className="footer">
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
              <li><Link href="#services">Dienstleistungen</Link></li>
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