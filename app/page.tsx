"use client";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Image from "next/image";
import Typewriter from "../components/Typewriter";
import { useState } from "react";

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
          <a href="/offer" className="cta-button">
            Jetzt Angebot anfordern
          </a>
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

          {/*Karte 2 Standart ohne Badge, aber reduziert */}
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
          <a href="/offer" className="cta-card">
            <b>Jetzt Angebot anfordern</b>
          </a>
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
                Ein modernes Dashboard zur Verwaltung von Finanzen. Entwickelt mit Fokus auf
                Performance, sauberes UI/UX-Design und intuitive Bedienung.
                Features inkludieren visuelle Auswertungen und sicheres Login-Management.
              </p>
              <a href="https://money-dashboard-qem5mns8rbvthdkgffx5uq.streamlit.app/" target="_blank" rel="noopener noreferrer" className="project-link-btn">
                Live Projekt ansehen
              </a>
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
              <p>Fülle das <a href="/offer" className="roadmap-button" >Kontakformular</a> unverbindlich aus.</p>
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
          <a href="/offer" className="cta-roadmap">
            Jetzt Angebot anfordern 
          </a> 
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

      <footer>
        <p>&copy; 2026 Niklas Smit - Zentara. Alle Rechte vorbehalten.</p>
      </footer>
    </section>
  );
}