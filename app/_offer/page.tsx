"use client";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import NavBar from "../../components/NavBar";

type FormValues = {
  from_name: string;
  reply_to: string;
  projectType: string;
  message: string;
  startDate?: string;
};

const mainStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-base)",
  backgroundImage:
    "radial-gradient(ellipse 85% 50% at 50% -8%, rgba(16,185,129,0.09) 0%, transparent 65%)",
  color: "var(--text-primary)",
  minHeight: "100vh",
  paddingBottom: "100px",
  fontFamily: "inherit",
};

const formContainerStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "20px",
  padding: "clamp(20px, 5vw, 44px)",
  maxWidth: "700px",
  margin: "0 auto",
  boxShadow: "var(--shadow-card)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "22px",
  color: "var(--text-secondary)",
  fontSize: "0.93rem",
  textAlign: "left",
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "8px",
  padding: "14px 16px",
  backgroundColor: "var(--input-bg)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "10px",
  color: "var(--text-primary)",
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

  // Übernimmt eine Auswahl aus dem Preis-Rechner (per URL-Parameter) ins Formular.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    const message = params.get("message");
    const projectType = params.get("projectType");

    if (message) {
      const el = form.elements.namedItem("message") as HTMLTextAreaElement | null;
      if (el) el.value = message;
    }
    if (projectType) {
      const el = form.elements.namedItem("projectType") as HTMLSelectElement | null;
      if (el) el.value = projectType;
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || sending) return;

    const fd = new FormData(formRef.current);
    const data = Object.fromEntries(fd.entries()) as unknown as FormValues;

    const startDateMissing = !data.startDate;

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
          color: "var(--text-primary)",
        }}>
          Kostenloses <span className="highlight">1:1 Beratungsgespräch anfragen</span>
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: "1.75", color: "var(--text-secondary)" }}>
          Erzähl mir von deiner Idee. Fülle das Formular aus und ich melde mich schnellstmöglich
          bei dir mit einer ersten Einschätzung.
        </p>
      </header>

      <section style={{ padding: "0 clamp(12px, 3.5vw, 20px)" }}>
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
              placeholder="Beschreibe dein Projekt kurz, alles weitere klären wir im Gespräch."
              required
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </label>

          <label style={{ ...labelStyle, color: "var(--text-primary)" }}>
            Wunsch-Starttermin
            <input
              type="date"
              name="startDate"
              style={{ ...inputStyle, color: "var(--text-primary)" }}
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
