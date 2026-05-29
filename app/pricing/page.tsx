"use client";

import React from "react";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RealEstateChatbot from "../../components/RealEstateChatbot";

// --- 1. DESIGN-VORLAGEN (Angepasst an das Premium Dark / Mint Theme) ---
const mainStyle: React.CSSProperties = {
  backgroundColor: "#0F172A",
  backgroundImage: "radial-gradient(ellipse 85% 50% at 50% -8%, rgba(16,185,129,0.09) 0%, transparent 65%)",
  color: "#F8FAFC",
  minHeight: "100vh",
  paddingBottom: "100px",
  fontFamily: "inherit",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "rgba(30, 41, 59, 0.72)",
  border: "1px solid rgba(16, 185, 129, 0.14)",
  borderRadius: "20px",
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 4px 40px rgba(0, 0, 0, 0.50)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  transition: "transform 0.3s ease, borderColor 0.3s ease",
};

const titleStyle: React.CSSProperties = {
  color: "#F8FAFC",
  fontSize: "1.5rem",
  marginBottom: "15px",
  borderBottom: "1px solid rgba(16, 185, 129, 0.14)",
  paddingBottom: "10px",
  fontWeight: 700,
};

const descStyle: React.CSSProperties = {
  color: "#94A3B8",
  fontSize: "0.95rem",
  lineHeight: "1.5",
  marginBottom: "20px",
  minHeight: "65px",
};

const listStyle: React.CSSProperties = {
  listStyleType: "none",
  padding: 0,
  margin: "0 0 30px 0",
  color: "#F8FAFC",
  fontSize: "0.9rem",
  lineHeight: "1.8",
  flexGrow: 1,
};

const priceStyle: React.CSSProperties = {
  color: "#10B981", // Das neue Mint-Grün
  fontSize: "1.8rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "20px",
};

const buttonStyle: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
  color: "#0F172A", // Dunkle Schrift für starken Kontrast auf dem hellen Button
  textDecoration: "none",
  border: "none",
  padding: "16px 20px",
  borderRadius: "50px",
  fontWeight: 700,
  fontSize: "1.05rem",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
  letterSpacing: "0.02em",
  boxShadow: "0 4px 22px rgba(16, 185, 129, 0.35)",
};

// --- 2. DEINE SEITE ---

export default function OfferPage() {
  return (
    <main style={mainStyle}>
      {/* Navigation */}
      <NavBar />

      {/* Kopfbereich (Hero) */}
      <header style={{ textAlign: "center", padding: "120px 20px 60px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 800,
          letterSpacing: "-0.025em",
          marginBottom: "16px",
          background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Webdesign & Software aus dem Emsland
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#94A3B8" }}>
          Als Entwickler direkt hier aus der Region lege ich Wert auf persönliche Beratung und klare Kommunikation. Lass uns dein Projekt gemeinsam digital umsetzen.
        </p>
      </header>

      {/* Angebots-Grid */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "30px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px"
      }}>

        {/* Karte 1: Webdesign Starter */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>Digitale Visitenkarte</h2>
          <p style={descStyle}>Perfekt für Betriebe, die online professionell gefunden werden wollen.</p>
          <ul style={listStyle}>
            <li>✓ Individuelles, modernes Design</li>
            <li>✓ 1 bis 3 Unterseiten</li>
            <li>✓ Kontaktformular & Google Maps</li>
            <li>✓ Perfekt fürs Smartphone optimiert</li>
          </ul>
          <div style={priceStyle}>ab 799 €</div>
          <Link href="/offer" style={buttonStyle}>Projekt anfragen</Link>
        </div>

        {/* Karte 2: Web-Nacharbeitung */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>Frischer Wind</h2>
          <p style={descStyle}>Deine Website sieht auf dem Handy nicht gut aus oder lädt zu langsam? Ich modernisiere sie.</p>
          <ul style={listStyle}>
            <li>✓ Analyse der alten Website</li>
            <li>✓ Neues, responsives Design</li>
            <li>✓ Technisches Update für mehr Speed</li>
            <li>✓ Anpassung von Bildern & Texten</li>
          </ul>
          <div style={priceStyle}>ab 249 €</div>
          <Link href="/offer" style={buttonStyle}>Website modernisieren</Link>
        </div>

         {/* Karte 3: Webpflege */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>Rundum-Sorglos</h2>
          <p style={descStyle}>Damit du dich auf dein Geschäft konzentrieren kannst, kümmere ich mich um die Technik.</p>
          <ul style={listStyle}>
            <li>✓ Sicheres Hosting & Backups</li>
            <li>✓ Regelmäßige System-Updates</li>
            <li>✓ Kleine inhaltliche Anpassungen</li>
            <li>✓ Persönlicher Support vor Ort</li>
          </ul>
          <div style={priceStyle}>ab 49 € / Monat</div>
          <Link href="/offer" style={buttonStyle}>Pflege anfragen</Link>
        </div>

        {/* Karte 4: Softwarelösungen */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>Smarte Software</h2>
          <p style={descStyle}>Schluss mit der Zettelwirtschaft. Ich baue kleine, smarte Helfer für deinen Arbeitsalltag.</p>
          <ul style={listStyle}>
            <li>✓ Digitale Urlaubsanträge</li>
            <li>✓ Einfache Buchungssysteme</li>
            <li>✓ Interne Kosten-Kalkulatoren</li>
            <li>✓ Genau auf dich zugeschnitten</li>
          </ul>
          <div style={priceStyle}>Individuell</div>
          <Link href="/offer" style={buttonStyle}>Idee besprechen</Link>
        </div>

      </section>

      {/* Chatbot */}
      <RealEstateChatbot />
    </main>
  );
}