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

const mainStyle: React.CSSProperties = {
  backgroundColor: "#0F172A",
  backgroundImage:
    "radial-gradient(ellipse 85% 50% at 50% -8%, rgba(16,185,129,0.09) 0%, transparent 65%)",
  color: "#F8FAFC",
  minHeight: "100vh",
  paddingBottom: "100px",
  fontFamily: "inherit",
};

const formContainerStyle: React.CSSProperties = {
  backgroundColor: "rgba(30, 41, 59, 0.72)",
  border: "1px solid rgba(16, 185, 129, 0.14)",
  borderRadius: "20px",
  padding: "44px",
  maxWidth: "700px",
  margin: "0 auto",
  boxShadow: "0 4px 40px rgba(0, 0, 0, 0.50)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "22px",
  color: "#94A3B8",
  fontSize: "0.93rem",
  textAlign: "left",
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "8px",
  padding: "14px 16px",
  backgroundColor: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(16, 185, 129, 0.16)",
  borderRadius: "10px",
  color: "#F8FAFC",
  fontSize: "1rem",
  outline: "none",
  fontFamily: "inherit",
  transition: "all 0.25s ease",
};

const buttonStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  textAlign: "center",
  background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
  color: "#0F172A",
  border: "none",
  padding: "16px 20px",
  borderRadius: "50px",
  fontWeight: 700,
  fontSize: "1.05rem",
  cursor: "pointer",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
  marginTop: "32px",
  letterSpacing: "0.02em",
  boxShadow: "0 4px 22px rgba(16, 185, 129, 0.35)",
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

      <header style={{
        textAlign: "center",
        padding: "80px 20px 40px",
        maxWidth: "800px",
        margin: "0 auto",
      }}>
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
          Projekt anfragen
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: "1.75", color: "#94A3B8" }}>
          Erzähl mir von deiner Idee. Fülle das Formular aus und ich melde mich schnellstmöglich
          bei dir mit einer ersten Einschätzung.
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
            Deine Domain (optional)
            <input
              type="domain"
              name="from_domain"
              placeholder="beispiel-domain.de"
              required
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Art des Projekts
            <select name="projectType" required defaultValue="unknown" style={inputStyle}>
              <option value="unknown" disabled style={{ color: "#000" }}>Bitte wählen</option>
              <option value="website" style={{ color: "#000" }}>Neue Website erstellen</option>
              <option value="modernize" style={{ color: "#000" }}>Bestehende Website modernisieren</option>
              <option value="individual" style={{ color: "#000" }}>Individuelles Projekt (Software)</option>
              <option value="care" style={{ color: "#000" }}>Rundum-Sorglos-Paket (Pflege)</option>
              <option value="other" style={{ color: "#000" }}>Sonstiges</option>
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
              <option value="unknown" disabled style={{ color: "#000" }}>Bitte wählen</option>
              <option value="0-300" style={{ color: "#000" }}>0 – 300 €</option>
              <option value="300-1000" style={{ color: "#000" }}>300 – 1.000 €</option>
              <option value="1000+" style={{ color: "#000" }}>1.000 € +</option>
            </select>
          </label>

          <label style={{ ...labelStyle, color: "#F8FAFC" }}>
            Wunsch-Starttermin
            <input
              type="date"
              name="startDate"
              style={{ ...inputStyle, color: "#F8FAFC" }}
            />
          </label>

          <button
            type="submit"
            disabled={sending}
            style={{
              ...buttonStyle,
              opacity: sending ? 0.7 : 1,
              cursor: sending ? "not-allowed" : "pointer",
            }}
          >
            {sending ? "Wird gesendet..." : "Anfrage kostenfrei absenden"}
          </button>
        </form>
      </section>
    </main>
  );
}
