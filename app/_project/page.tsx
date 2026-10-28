"use client";

import React from "react";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RealEstateChatbot from "../../components/RealEstateChatbot";
import BrowserShowcase from "../../components/BrowserShowcase";
import PhoneGallery from "../../components/PhoneGallery";
import ApkDownloadButton from "../../components/ApkDownloadButton";
import HeroBackdrop from "../../components/HeroBackdrop";
import HeroReveal from "../../components/HeroReveal";

// --- Monetra: Web-App (quer, Browser-Mockup) --------------------------------
// Browserleiste & Taskleiste weggecroppt → exaktes 1918×921-Format.
const monetraWeb = [
  "/assets/images/monetra-web-01.jpg", // Login
  "/assets/images/monetra-web-02.jpg", // Übersicht / Dashboard
  "/assets/images/monetra-web-03.jpg", // Portfolio
  "/assets/images/monetra-web-04.jpg", // Portfolio – Trade-Logbuch
  "/assets/images/monetra-web-05.jpg", // Konten
  "/assets/images/monetra-web-06.jpg", // Konten – Analytics
  "/assets/images/monetra-web-07.jpg", // Sparziele & Budgets
];

// --- Monetra: mobile App (hochkant, Handy-Galerie) --------------------------
// Statusleiste weggecroppt. monetra-08 ist ein Duplikat von monetra-04.
const monetraMobile = [
  "/assets/images/monetra-11.jpg", // Login
  "/assets/images/monetra-09.jpg", // Übersicht / Dashboard
  "/assets/images/monetra-01.jpg", // Portfolio
  "/assets/images/monetra-02.jpg", // Portfolio – Allocation & Positionen
  "/assets/images/monetra-03.jpg", // Portfolio – Historie
  "/assets/images/monetra-04.jpg", // Konten
  "/assets/images/monetra-05.jpg", // Konten – Analytics
  "/assets/images/monetra-06.jpg", // Konten – Verlauf
  "/assets/images/monetra-07.jpg", // Konten – Optionen
  "/assets/images/monetra-10.jpg", // Menü / Werkzeuge
];

// --- MotoSet: mobile App (hochkant, Handy-Galerie) --------------------------
const motosetMobile = [
  "/assets/images/motoset-00.jpg",
  "/assets/images/motoset-01.jpg",
  "/assets/images/motoset-02.jpg",
  "/assets/images/motoset-03.jpg",
  "/assets/images/motoset-04.jpg",
  "/assets/images/motoset-05.jpg",
  "/assets/images/motoset-06.jpg",
  "/assets/images/motoset-07.jpg",
];

export default function ProjectPage() {
  return (
    <>
      <NavBar />
      <RealEstateChatbot />

      <section className="hero" style={{ paddingBottom: "0" }}>
        <HeroBackdrop />
        <div className="hero-content">
          <HeroReveal
            parts={[
              { text: "Von der" },
              { text: "Idee", highlight: true },
              { text: "zur" },
              { text: "fertigen App.", highlight: true },
            ]}
          />
        </div>
      </section>

      {/* ===== PROJEKT: MONETRA (Web-App + mobile App) ===== */}
      <section id="portfolio" className="section project-section">
        <span className="section-eyebrow">Eigenentwicklung · Web &amp; Mobile</span>
        <h2 className="section-title">
          Projekt: <span className="highlight">Monetra</span>
        </h2>
        <p className="section-lead">
          Deine Finanzen in einer Übersicht – als vollwertige Web-App und native
          Android-App.
        </p>

        <div className="project-stage">
          <BrowserShowcase
            images={monetraWeb}
            url="monetra.zentara-solutions.de"
            alt="Monetra – Web-App"
          />

          <div className="project-mobile-block">
            <span className="project-mobile-tag">📱 Auch als native App</span>
            <PhoneGallery images={monetraMobile} alt="Monetra – App" />
          </div>
        </div>

        <div className="project-copy">
          <p>
            Bündelt Kontoauszüge, Trades, Aktien und Krypto an einem Ort: Ein- und
            Ausgaben werden per KI automatisch ausgelesen und kategorisiert, alle
            Werte in einer Übersicht zusammengefasst und im Diagramm direkt
            gegenübergestellt — statt fünf Apps parallel zu checken.
          </p>

          <div className="project-note">
            <p>
              <strong>Plattform-Hinweis:</strong> Die Monetra-App steht als native{" "}
              <strong>Android-App</strong> zum direkten Download bereit. Für{" "}
              <strong>Apple iOS (iPhone/iPad)</strong> sowie alle Desktop-Nutzer
              wurde eine voll funktionsfähige <strong>Web-App</strong> entwickelt,
              die nahtlos und ohne Installation direkt im Browser läuft.
            </p>
          </div>

          <div className="project-actions">
            <ApkDownloadButton
              buttonLabel="App herunterladen"
              apkPath="/downloads/money_app.apk"
              apkName="money_app.apk"
              title="Download der Monetra-App"
              description="Lade dir die native Android-Version der Monetra-App herunter. Sicherheitshinweis: Da es ein direkter Download ist, bestätige bitte die Installation aus unbekannten Quellen."
            />
            <Link
              href="https://monetra.zentara-solutions.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-btn-shared btn-outlined"
            >
              Web-App öffnen
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROJEKT: MOTOSET (mobile App) ===== */}
      <section id="motoset" className="section project-section">
        <span className="section-eyebrow">Eigenentwicklung · Mobile App</span>
        <h2 className="section-title">
          Projekt: <span className="highlight">MotoSet</span>
        </h2>
        <p className="section-lead">
          Fahrwerks-Setups pro Bike – gespeichert, versioniert und in Sekunden
          wieder abrufbar. Auch offline am Trackday.
        </p>

        <div className="project-stage">
          <div className="project-mobile-block project-mobile-block--solo">
            <PhoneGallery images={motosetMobile} alt="MotoSet – App" big />
          </div>
        </div>

        <div className="project-copy">
          <p>
            Ersetzt Zettel, Fotos und Excel-Tabellen: Fahrwerks-Einstellungen sind
            pro Bike gespeichert, versioniert und in Sekunden wieder abrufbar —
            auch am Trackday, offline.
          </p>

          <div className="project-note">
            <p>
              <strong>Plattform-Hinweis:</strong> MotoSet steht als native{" "}
              <strong>Android-App</strong> zum direkten Download bereit. Für{" "}
              <strong>Apple iOS (iPhone/iPad)</strong> sowie alle Desktop-Nutzer
              wurde eine voll funktionsfähige <strong>Web-App</strong> entwickelt,
              die nahtlos und ohne Installation direkt im Browser läuft.
            </p>
          </div>

          <div className="project-actions">
            <ApkDownloadButton
              buttonLabel="App herunterladen"
              apkPath="/downloads/motoset.apk"
              apkName="motoset.apk"
              title="Download von MotoSet"
              description="Lade dir die native Android-Version von MotoSet herunter. Sicherheitshinweis: Da es ein direkter Download ist, bestätige bitte die Installation aus unbekannten Quellen."
            />
            <Link
              href="https://motoset-2d516.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-btn-shared btn-outlined"
            >
              Web-App öffnen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
