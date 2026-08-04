"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

/**
 * Kurzes Kontaktformular für den Footer (Name, E-Mail, Nachricht).
 * Nutzt dieselbe EmailJS-Pipeline wie das große Offer-Formular
 * (gleiche Feldnamen: from_name, reply_to, message).
 * Fallback auf mailto, falls EmailJS nicht konfiguriert ist.
 */
export default function FooterContact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "error">(null);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) emailjs.init(publicKey);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || sending) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const fd = new FormData(formRef.current);
    const name = String(fd.get("from_name") || "");
    const email = String(fd.get("reply_to") || "");
    const message = String(fd.get("message") || "");

    // Fallback: mailto, wenn EmailJS nicht konfiguriert ist
    if (!serviceId || !templateId || !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}`);
      window.location.href = `mailto:info@zentara-solutions.de?subject=${encodeURIComponent(
        "Kontaktanfrage über die Website"
      )}&body=${body}`;
      return;
    }

    try {
      setSending(true);
      setStatus(null);
      await emailjs.sendForm(serviceId, templateId, formRef.current);
      setStatus("ok");
      formRef.current.reset();
    } catch (err) {
      console.error("Footer-Kontakt Fehler:", err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="footer-form" aria-label="Kurzes Kontaktformular">
      <label className="footer-form-field">
        <span className="footer-form-label">Name</span>
        <input type="text" name="from_name" required placeholder="Dein Name" autoComplete="name" />
      </label>
      <label className="footer-form-field">
        <span className="footer-form-label">E-Mail</span>
        <input type="email" name="reply_to" required placeholder="name@beispiel.de" autoComplete="email" />
      </label>
      <label className="footer-form-field">
        <span className="footer-form-label">Nachricht</span>
        <textarea name="message" rows={3} required placeholder="Worum geht's?" />
      </label>

      <button type="submit" className="footer-form-btn" disabled={sending}>
        {sending ? "Wird gesendet …" : "Nachricht senden"}
      </button>

      {status === "ok" && (
        <p className="footer-form-status footer-form-status--ok" role="status">
          Danke! Deine Nachricht ist raus – ich melde mich zeitnah.
        </p>
      )}
      {status === "error" && (
        <p className="footer-form-status footer-form-status--error" role="status">
          Ups, das hat nicht geklappt. Schreib mir gern direkt an info@zentara-solutions.de.
        </p>
      )}
    </form>
  );
}
