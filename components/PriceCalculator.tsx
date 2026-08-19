"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// --- Preise leicht anpassbar ---------------------------------------------
const BASE_PRICE = 799;

type Feature = { id: string; category: string; label: string; price: number; hint?: string };

// Reihenfolge der Kategorien bestimmt die Anzeige-Reihenfolge.
const CATEGORY_ORDER = ["Website & Inhalte", "Wachstum & Handwerk"];

const FEATURES: Feature[] = [
  { id: "cms", category: "Website & Inhalte", label: "CMS zum Selbstpflegen", price: 250, hint: "Inhalte selbst ändern" },
  { id: "booking", category: "Website & Inhalte", label: "Buchungssystem", price: 450, hint: "Termine & Kalender" },
  { id: "login", category: "Website & Inhalte", label: "Login-/Mitgliederbereich", price: 350, hint: "Geschützte Inhalte" },
  { id: "multilang", category: "Website & Inhalte", label: "Mehrsprachigkeit", price: 300, hint: "z. B. DE / EN" },
  { id: "google-local-seo", category: "Wachstum & Handwerk", label: "Google Local SEO", price: 350, hint: "Lokale Sichtbarkeit & Business-Profil" },
  { id: "ai-assistant", category: "Wachstum & Handwerk", label: "KI-Assistent", price: 600, hint: "Automatische Kundenbetreuung" },
  { id: "bewerber-express-funnel", category: "Wachstum & Handwerk", label: "Bewerber-Express-Funnel", price: 450, hint: "Fachkräfte gewinnen" },
];
// -------------------------------------------------------------------------

const euro = (n: number) => new Intl.NumberFormat("de-DE").format(Math.round(n));

/** Zählt die angezeigte Zahl weich zum Zielwert hoch (respektiert reduced-motion). */
function useAnimatedNumber(target: number) {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      displayRef.current = target;
      setDisplay(target);
      return;
    }
    const from = displayRef.current;
    const to = target;
    if (Math.round(from) === to) {
      displayRef.current = to;
      setDisplay(to);
      return;
    }
    const duration = 500;
    let startTime: number | null = null;
    let raf = 0;
    const tick = (t: number) => {
      if (startTime === null) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = from + (to - from) * eased;
      displayRef.current = val;
      setDisplay(val);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return display;
}

/**
 * Interaktiver Preis-Rechner: Funktionen nach Kategorie gruppiert antippen →
 * Live-Preis + aufgeschlüsselte Zusammenfassung zählen sofort mit.
 * Der Button übernimmt die Auswahl vorausgefüllt ins Kontaktformular (/offer).
 */
export default function PriceCalculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => {
      const nextSet = new Set(prev);
      if (nextSet.has(id)) nextSet.delete(id);
      else nextSet.add(id);
      return nextSet;
    });

  const chosen = FEATURES.filter((f) => selected.has(f.id));
  const total = BASE_PRICE + chosen.reduce((sum, f) => sum + f.price, 0);
  const animated = useAnimatedNumber(total);

  // Nachricht für das Kontaktformular vorbereiten
  const messageLines = [
    "Konfiguration aus dem Preis-Rechner:",
    `• Basis-Website (${euro(BASE_PRICE)} €)`,
    ...chosen.map((f) => `• ${f.label} (+${euro(f.price)} €)`),
    "",
    `Geschätzte Summe: ${euro(total)} € (unverbindliche Orientierung)`,
  ];
  const offerHref = `/offer?projectType=website&message=${encodeURIComponent(
    messageLines.join("\n")
  )}`;

  return (
    <div className="price-calc">
      {/* Linke Spalte: Basis + gruppierte Funktionen */}
      <div className="price-calc-features">
        {/* Basis-Paket – immer enthalten */}
        <div className="calc-included">
          <span className="calc-check-box calc-check-box--fixed" aria-hidden="true">✓</span>
          <span className="calc-feature-text">
            <span className="calc-feature-label">Basis-Website</span>
            <span className="calc-feature-hint">Design · mobil-optimiert · Kontaktformular</span>
          </span>
          <span className="calc-price">{euro(BASE_PRICE)} €</span>
        </div>

        {CATEGORY_ORDER.map((cat) => (
          <div className="calc-group" key={cat}>
            <span className="calc-group-title">{cat}</span>
            {FEATURES.filter((f) => f.category === cat).map((f) => {
              const isOn = selected.has(f.id);
              return (
                <label key={f.id} className={`calc-feature ${isOn ? "calc-feature--on" : ""}`}>
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => toggle(f.id)}
                    className="calc-checkbox"
                  />
                  <span className="calc-check-box" aria-hidden="true">
                    {isOn ? "✓" : ""}
                  </span>
                  <span className="calc-feature-text">
                    <span className="calc-feature-label">{f.label}</span>
                    {f.hint ? <span className="calc-feature-hint">{f.hint}</span> : null}
                  </span>
                  <span className="calc-price">+{euro(f.price)} €</span>
                </label>
              );
            })}
          </div>
        ))}
      </div>

      {/* Rechte Spalte: aufgeschlüsselte Zusammenfassung + Live-Preis */}
      <div className="price-calc-result">
        <span className="price-calc-result-title">Deine Konfiguration</span>

        <div className="price-calc-breakdown">
          <div className="calc-line calc-line--base">
            <span>Basis-Website</span>
            <span>{euro(BASE_PRICE)} €</span>
          </div>
          {chosen.map((f) => (
            <div className="calc-line" key={f.id}>
              <span>{f.label}</span>
              <span>+{euro(f.price)} €</span>
            </div>
          ))}
          {chosen.length === 0 && (
            <p className="calc-line-empty">Wähle links Funktionen aus, um dein Paket zusammenzustellen.</p>
          )}
        </div>

        <div className="price-calc-divider" aria-hidden="true"></div>

        <div className="price-calc-sum">
          <span className="price-calc-sum-label">Geschätzter Preis</span>
          <span className="price-calc-sum-value" aria-live="polite">
            {euro(animated)} €
          </span>
          <span className="price-calc-sum-note">
            Unverbindliche Orientierung – Startpreis ab {euro(BASE_PRICE)} €
          </span>
        </div>

        <Link href={offerHref} className="cta-primary price-calc-cta">
          Anfrage mit dieser Auswahl senden
        </Link>
      </div>
    </div>
  );
}
