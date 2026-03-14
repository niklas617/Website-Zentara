"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

type FormValues = {
  from_name: string;
  reply_to: string;
  projectType: string;
  message: string;
  budget?: string;
  startDate?: string;
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
    <form id="offerForm" className="offer-container" ref={formRef} onSubmit={onSubmit}>
      <label>
        Name
        <input
          type="text"
          name="from_name"
          placeholder="Gib hier deinen Vor- und Nachnamen ein"
          required
        />
      </label>

      <label>
        E-Mail
        <input type="email" name="reply_to" placeholder="Gib hier deine aktuelle E-Mail ein" required />
      </label>

      <label>
        Art des Projekts
        <select name="projectType" required defaultValue="unknown">
          <option value="unknown">Bitte wählen</option>
          <option value="website">Website</option>
          <option value="webapp">Web-App</option>
          <option value="automation">Automatisierung</option>
          <option value="other">Sonstiges</option>
        </select>
      </label>

      <label>
        Projektbeschreibung
        <textarea
          name="message"
          rows={3}
          placeholder="Beschreibe dein Projekt so genau wie möglich"
          required
        />
      </label>

      <label>
        Budgetrahmen
        <select name="budget" defaultValue="unknown">
          <option value="unknown">Bitte wählen</option>
          <option value="500-1000">500 – 1.000 €</option>
          <option value="1000-3000">1.000 – 3.000 €</option>
          <option value="3000+">3.000 €+</option>
        </select>
      </label>

      <label>
        Wunsch-Starttermin
        <input type="date" name="startDate" />
      </label>

      <button type="submit" id="submitBtn" disabled={sending}>
        {sending ? "Wird gesendet..." : "Angebot anfordern"}
      </button>
    </form>
  );
}
