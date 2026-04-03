import React from "react";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RealEstateChatbot from "../../components/RealEstateChatbot";

// --- 1. DESIGN-VORLAGEN (Typensicher für TypeScript) ---
const bodyStyle: React.CSSProperties = {
  backgroundColor: "#050514",
};
const cardStyle: React.CSSProperties = {
  backgroundColor: "#0a0a1f",
  border: "1px solid rgba(0, 255, 255, 0.2)",
  borderRadius: "12px",
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  transition: "transform 0.3s ease, border-color 0.3s ease",
};

const titleStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: "1.5rem",
  marginBottom: "15px",
  borderBottom: "1px solid rgba(0, 255, 255, 0.2)",
  paddingBottom: "10px"
};

const descStyle: React.CSSProperties = {
  color: "#b3b3cc",
  fontSize: "0.95rem",
  lineHeight: "1.5",
  marginBottom: "20px",
  minHeight: "65px"
};

const listStyle: React.CSSProperties = {
  listStyleType: "none",
  padding: 0,
  margin: "0 0 30px 0",
  color: "#fff",
  fontSize: "0.9rem",
  lineHeight: "1.8",
  flexGrow: 1
};

const priceStyle: React.CSSProperties = {
  color: "#00FFFF",
  fontSize: "1.8rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "20px"
};

const buttonStyle: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  backgroundColor: "transparent",
  color: "#00FFFF",
  textDecoration: "none",
  padding: "12px 20px",
  border: "1px solid #00FFFF",
  borderRadius: "6px",
  fontWeight: "bold",
  transition: "all 0.3s ease"
};

// --- 2. DEINE SEITE ---

export default function OfferPage() {
  return (
    <main style={{ backgroundColor: "#050514", color: "#ffffff", minHeight: "100vh",paddingBottom: "100px", fontFamily: "sans-serif" }}>
      {/* Navigation */}
      <NavBar />

      {/* Kopfbereich (Hero) */}
      <header style={{ textAlign: "center", padding: "120px 20px 60px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#00FFFF", fontSize: "2.5rem", marginBottom: "20px" }}>
          Webdesign & Software aus dem Emsland
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#b3b3cc" }}>
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
          <div style={priceStyle}>ab 49 € pro Monat</div>
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