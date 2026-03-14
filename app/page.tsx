import Link from "next/link";
import NavBar from "../components/NavBar";
import Image from "next/image";
import Typewriter from "../components/Typewriter";
import { useEffect, useState } from "react";


export default function HomePage() {
  return (
    <section>
      <NavBar />


      {/* <header> <div className="nav-item nav-center">
        <Link href="/pageOffer" className="logo">
          Zentara
        </Link>
      </div>
      </header> */}

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
          <div className="card">
            <h3>Webentwicklung</h3>
            <p>Moderne Webentwicklung mit Fokus auf Performance nach Kundenwunch.</p>
          </div>
          <div className="card">
            <h3>Web-Nacharbeitung</h3>
            <p>Analyse, Optimierung und technische Weiterentwicklung bestehender Web-Anwendungen.</p>
          </div>
          <div className="card">
            <h3>Webpflege
            </h3>
            <p>Kontinuierliche Pflege, Wartung und Optimierung bestehender Web-Lösungen.</p>
          </div>
        </div>
        <div>  <a href="/offer" className="cta-card">
          Jetzt Angebot anfordern
        </a></div>
      </section>

      {/* <section id="projects" className="section alt-bg">
        <h2>Ausgewählte Projekte</h2>
        <div className="project-grid">
          <article className="project-card">
            <div className="project-img">Bild Platzhalter</div>
            <div className="project-info">
              <h4>E-Commerce Dashboard</h4>
              <p>Automatisierte Bestandsverwaltung für Online-Shops.</p>
            </div>
          </article>
        </div>
      </section> */}

      <section className="roadmap-section">
        <h2 className="section-title">Dein Weg zum Erfolg</h2>
        <div className="roadmap-container">
          <div className="roadmap-item">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Erstgespräch</h3>
              <p>Wir klären die Anforderungen und stecken den Rahmen ab.</p>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Konzeption</h3>
              <p>Ein klarer Fahrplan sorgt für volle Kostentransparenz.</p>
            </div>
          </div>
          {/* Weitere Items... */}
        </div>
      </section>

      <section id="about" className="section">
        <h2>Über mich</h2>
        <div style={{ marginBottom: "20px" }}>
          {/* Optimierte Image-Komponente statt normalem img */}
          <Image
            className="aboutImage"
            src="/assets/images/ich.png"
            alt="Niklas Smit"
            width={200}
            height={300}
            style={{ borderRadius: "10px", objectFit: "cover" }}
          />
        </div>
        <p style={{ maxWidth: 800, margin: "0 auto" }}>
          Ich bin Niklas Smit. Fokus: pragmatische, wartbare Software. Direkte Kommunikation,
          schnelle Ergebnisse.
        </p>
      </section>

      <footer>
        <p>&copy; 2026 Niklas Smit - Zentara. Alle Rechte vorbehalten.</p>
      </footer>
    </section>
  );
}