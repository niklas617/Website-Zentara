"use client";

import React from "react";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RealEstateChatbot from "../../components/RealEstateChatbot";
import DeviceShowcase from "../../components/DeviceShowcase";
import ApkDownloadButton from "../../components/ApkDownloadButton";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import AppDownload from "../../components/AppDownload";
import HeroBackdrop from "../../components/HeroBackdrop";
import HeroReveal from "../../components/HeroReveal";


// Portfolio-Screenshots
const projectImages = [
  "/assets/images/LogIn.png",
  "/assets/images/Balkendiagramm.png",
  "/assets/images/Kuchendiagramm.png",
  "/assets/images/Buchungen.png",
  "/assets/images/Buchungenliste.png",
  "/assets/images/Kategorien.png",
];

const projectImagesDownload = [
  "/assets/images/motoset-00.jpg",
  "/assets/images/motoset-01.jpg",
  "/assets/images/motoset-02.jpg",
  "/assets/images/motoset-03.jpg",
  "/assets/images/motoset-04.jpg",
  "/assets/images/motoset-05.jpg",
  "/assets/images/motoset-06.jpg",
  "/assets/images/motoset-07.jpg",
];

// Hochkant-Screenshots der mobilen Monetra-App (z. B. 1080x2340)
const moneyMobileImages: string[] = [];

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
        { text: "Von der" }, { text: "Idee", highlight: true }, { text: "zur" }, { text: "fertigen App.", highlight: true },
      ]}
    />
  </div>
</section>
      
      {/* 6 — PORTFOLIO: MONEY-DASHBOARD (Laptop-Mockup) */}
      <section id="portfolio" className="section">
        <h2>Projekt: Monetra</h2>

        <div className="portfolio-container">
          <div className="portfolio-card">
            <span className="badge-eigenentwicklung">Eigenentwicklung</span>

            <DeviceShowcase
              device="duo"
              images={projectImages}
              phoneImages={moneyMobileImages}
              alt="Monetra – Web- und mobile App"
            />

            <div className="portfolio-info">
              <h3>Finanz-Übersicht leicht gemacht</h3>
              <p>
                Bündelt Kontoauszüge, Trades, Aktien und Krypto an einem Ort: Ein- und Ausgaben werden per KI automatisch ausgelesen und kategorisiert, alle Werte in einer Übersicht zusammengefasst und im Diagramm direkt gegenübergestellt — statt fünf Apps parallel zu checken.
              </p>

              <div style={{ padding: "15px 20px", backgroundColor: "rgba(16, 185, 129, 0.06)", borderLeft: "4px solid #10B981", borderRadius: "0 8px 8px 0", margin: "25px 0" }}>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                  <strong>Plattform-Hinweis:</strong> Die Monetra-App steht als native <strong>Android-App</strong> zum direkten Download bereit. Für <strong>Apple iOS (iPhone/iPad)</strong> sowie alle Desktop-Nutzer wurde eine voll funktionsfähige <strong>Web-App</strong> entwickelt, die nahtlos und ohne Installation direkt im Browser läuft.
                </p>
              </div>

              {/* Button Container */}
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start" }}>
                
                {/* Button 1: Monetra-App Download */}
                {/* Die div-Hülle entfernt das standardmäßige Padding der btn-Klasse für die äußere Hülle, da ApkDownloadButton die Klasse intern nutzt */}
                <div className="portfolio-btn-shared btn-filled" style={{ padding: 0, border: "none" }}>
                  <ApkDownloadButton
                    buttonLabel="App herunterladen"
                    apkPath="/downloads/money_app.apk"
                    apkName="money_app.apk"
                    title="Download der Monetra-App"
                    description="Lade dir die native Android-Version der Monetra-App herunter. Sicherheitshinweis: Da es ein direkter Download ist, bestätige bitte die Installation aus unbekannten Quellen."
                  />
                </div>

                {/* Button 2: Link zum Live-Projekt */}
                <Link 
                  href="https://dashboard.zentara-solutions.de/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-btn-shared btn-outlined"
                >
                  Web-App öffnen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — PORTFOLIO: MOTOSET (Handy-Mockup) */}
      <section id="motoset" className="section">
        <h2>Projekt: MotoSet</h2>

        <div className="portfolio-container">
          <div className="portfolio-card">
            <span className="badge-eigenentwicklung">Eigenentwicklung</span>

            <DeviceShowcase 
              device="phone" 
              images={projectImagesDownload} 
              alt="MotoSet – Screenshot der App" 
            />

            <div className="portfolio-info">
              <h3>Fahrwerkeinstellungen-Übersicht leicht gemacht</h3>
              <p>
                Ersetzt Zettel, Fotos und Excel-Tabellen: Fahrwerks-Einstellungen sind pro Bike gespeichert, versioniert und in Sekunden wieder abrufbar — auch am Trackday, offline.
              </p>

              <div style={{ padding: "15px 20px", backgroundColor: "rgba(16, 185, 129, 0.06)", borderLeft: "4px solid #10B981", borderRadius: "0 8px 8px 0", margin: "25px 0" }}>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                  <strong>Plattform-Hinweis:</strong> MotoSet steht als native <strong>Android-App</strong> zum direkten Download bereit. Für <strong>Apple iOS (iPhone/iPad)</strong> sowie alle Desktop-Nutzer wurde eine voll funktionsfähige <strong>Web-App</strong> entwickelt, die nahtlos und ohne Installation direkt im Browser läuft.
                </p>
              </div>

              {/* Button Container */}
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start", }}>
                
                {/* Button 1: MotoSet Download */}
                <div className="portfolio-btn-shared btn-filled" style={{ padding: 0, border: "none", }}>
                  <ApkDownloadButton
                    buttonLabel="App herunterladen"
                    apkPath="/downloads/motoset.apk" 
                    apkName="motoset.apk"
                    title="Download von MotoSet" 
                    description="Lade dir die native Android-Version von MotoSet herunter. Sicherheitshinweis: Da es ein direkter Download ist, bestätige bitte die Installation aus unbekannten Quellen."
                  />
                </div>

                {/* Button 2: Web-App Link */}
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
          </div>
        </div>
      </section>
    </>
  );
}