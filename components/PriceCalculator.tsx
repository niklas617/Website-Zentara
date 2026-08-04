"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// --- Preise leicht anpassbar ---------------------------------------------
const BASE_PRICE = 799;

type Feature = { id: string; label: string; price: number; hint?: string };

const FEATURES: Feature[] = [
  { id: "booking", label: "Buchungssystem", price: 450, hint: "Termine & Kalender" },
  { id: "login", label: "Login-/Mitgliederbereich", price: 350, hint: "Geschützte Inhalte" },
  { id: "cms", label: "CMS zum Selbstpflegen", price: 250, hint: "Inhalte selbst ändern" },
  { id: "multilang", label: "Mehrsprachigkeit", price: 300, hint: "z. B. DE / EN" },
  { id: "ai-assistant", label: "KI-Assistent", price: 600, hint: "Kunden Betreuung" },
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
 * Interaktiver Preis-Rechner: Funktionen antippen → Live-Preis zählt hoch.
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

  const total =
    BASE_PRICE +
    FEATURES.filter((f) => selected.has(f.id)).reduce((sum, f) => sum + f.price, 0);

  const animated = useAnimatedNumber(total);

  // Nachricht für das Kontaktformular vorbereiten
  const chosen = FEATURES.filter((f) => selected.has(f.id));
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
      <div className="price-calc-features">
        {FEATURES.map((f) => {
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

      <div className="price-calc-result">
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
