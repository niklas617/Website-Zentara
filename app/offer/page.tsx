"use client";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import NavBar from "../../components/NavBar";

type FormValues = {
  from_name: string;
  reply_to: string;
  projectType: string;
  message: string;
  budget?: string;
  startDate?: string;
};

// --- DESIGN-VORLAGEN (Passend zur Pricing-Page) ---

const mainStyle: React.CSSProperties = {
  backgroundColor: "#050514",
  color: "#ffffff",
  minHeight: "100vh",
  paddingBottom: "100px",
  fontFamily: "sans-serif",
};

const formContainerStyle: React.CSSProperties = {
  backgroundColor: "#0a0a1f",
  border: "1px solid rgba(0, 255, 255, 0.2)",
  borderRadius: "12px",
  padding: "40px",
  maxWidth: "700px", // Verhindert, dass es zu breit wird
  margin: "0 auto",  // Zentriert das Formular perfekt auf allen Geräten!
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "20px",
  color: "#b3b3cc",
  fontSize: "0.95rem",
  textAlign: "left",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "8px",
  padding: "14px 16px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(0, 255, 255, 0.2)",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "1rem",
  outline: "none",
  fontFamily: "inherit",
  transition: "all 0.3s ease",
};

const buttonStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  textAlign: "center",
  background: "linear-gradient(90deg, #0ea5e9, #2dd4bf)", // Der Zentara-Farbverlauf
  color: "#020617", // Dunkler Text für Kontrast
  border: "none",
  padding: "16px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "1.1rem",
  cursor: "pointer",
  transition: "transform 0.3s ease, boxShadow 0.3s ease",
  marginTop: "30px",
};


export default function OfferForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.warn(
        "EmailJS ist nicht initialisiert: NEXT_PUBLIC_EMAILJS_PUBLIC_KEY fehlt. Lege eine .env.local an."
      );
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || sending) return;

    const fd = new FormData(formRef.current);
    const data = Object.fromEntries(fd.entries()) as unknown as FormValues;

    const budgetMissing = !data.budget || data.budget === "unknown";
    const startDateMissing = !data.startDate;

    if (budgetMissing) {
      const proceed = window.confirm(
        "Hinweis:\nOhne Budget ist eine Einschätzung schwieriger.\n\nMöchtest du trotzdem absenden?"
      );
      if (!proceed) return;
    }

    if (startDateMissing) {
      const proceed = window.confirm(
        "Hinweis:\nOhne Wunschtermin ist eine Einschätzung schwieriger.\n\nMöchtest du trotzdem absenden?"
      );
      if (!proceed) return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      alert("EmailJS ist nicht vollständig konfiguriert (Service/Template ID fehlen).");
      return;
    }

    try {
      setSending(true);
      await emailjs.sendForm(serviceId, templateId, formRef.current);
      alert(`Danke, ${data.from_name}! Deine Anfrage wurde erfolgreich versendet.`);
      formRef.current.reset();
    } catch (err) {
      console.error("E-Mail-Fehler:", err);
      alert("Fehler beim Senden. Bitte versuche es später erneut.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main style={mainStyle}>
      <NavBar />

      {/* Kopfbereich passend zur Pricing-Seite */}
      <header style={{ textAlign: "center", padding: "10px 20px 40px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#00FFFF", fontSize: "2.5rem", marginBottom: "15px" }}>
          Projekt anfragen
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#b3b3cc" }}>
          Erzähl mir von deiner Idee. Fülle das Formular aus und ich melde mich schnellstmöglich bei dir mit einer ersten Einschätzung.
        </p>
      </header>

      <section style={{ padding: "0 20px" }}>
        <form ref={formRef} onSubmit={onSubmit} style={formContainerStyle}>
          
          <label style={labelStyle}>
            Dein Name
            <input
              type="text"
              name="from_name"
              placeholder="Vor- und Nachname"
              required
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Deine E-Mail
            <input 
              type="email" 
              name="reply_to" 
              placeholder="name@beispiel.de" 
              required 
              style={inputStyle} 
            />
          </label>

          <label style={labelStyle}>
            Art des Projekts
            <select name="projectType" required defaultValue="unknown" style={inputStyle}>
              <option value="unknown" disabled style={{color: "#000"}}>Bitte wählen</option>
              <option value="website" style={{color: "#000"}}>Neue Website erstellen</option>
              <option value="modernize" style={{color: "#000"}}>Bestehende Website modernisieren</option>
              <option value="individual" style={{color: "#000"}}>Individuelles Projekt (Software)</option>
              <option value="care" style={{color: "#000"}}>Rundum-Sorglos-Paket (Pflege)</option>
              <option value="other" style={{color: "#000"}}>Sonstiges</option>
            </select>
          </label>

          <label style={labelStyle}>
            Projektbeschreibung
            <textarea
              name="message"
              rows={4}
              placeholder="Beschreibe dein Projekt so genau wie möglich..."
              required
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </label>

          <label style={labelStyle}>
            Ungefährer Budgetrahmen
            <select name="budget" defaultValue="unknown" style={inputStyle}>
              <option value="unknown" disabled style={{color: "#000"}}>Bitte wählen</option>
              <option value="0-300" style={{color: "#000"}}>0 – 300 €</option>
              <option value="300-1000" style={{color: "#000"}}>300 – 1.000 €</option>
              <option value="1000+" style={{color: "#000"}}>1.000 € +</option>
            </select>
          </label>

          <label style={{ ...labelStyle, color: "#ffffff" }}>
            Wunsch-Starttermin
            <input 
              type="date" 
              name="startDate" 
              style={{ ...inputStyle, color: "#fff" }} 
            />
          </label>

          <button 
            type="submit" 
            disabled={sending} 
            style={{ 
              ...buttonStyle, 
              opacity: sending ? 0.7 : 1, 
              cursor: sending ? "not-allowed" : "pointer" 
            }}
          >
            {sending ? "Wird gesendet..." : "Anfrage kostenfrei absenden"}
          </button>
        </form>
      </section>
    </main>
  );
}