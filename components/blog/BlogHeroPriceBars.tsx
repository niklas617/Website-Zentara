import React from "react";
import Link from "next/link";

// Website-Kosten: Preisspannen als horizontale Balken, anschlussfähig an den echten Preis-Rechner.
const BARS = [
  { label: "Website modernisieren", value: "ab 249 €", width: 26 },
  { label: "Basis-Website", value: "ab 799 €", width: 48 },
  { label: "Individuelle Software / Schnittstellen", value: "individuell", width: 100, open: true },
  { label: "Laufende Pflege", value: "ab 49 € / Monat", width: 16, unit: true },
];

export default function BlogHeroPriceBars() {
  return (
    <div className="blog-hero blog-pricebars">
      <div className="blog-hero-kicker">
        <span className="blog-hero-kicker-dot" />
        Ehrliche Preisspannen 2026
      </div>

      <div className="blog-bars">
        {BARS.map((b) => (
          <div className="blog-bar-row" key={b.label}>
            <div className="blog-bar-head">
              <span className="blog-bar-label">{b.label}</span>
              <span className="blog-bar-value">{b.value}</span>
            </div>
            <div className="blog-bar-track">
              <div
                className={`blog-bar-fill${b.open ? " blog-bar-fill--open" : ""}${
                  b.unit ? " blog-bar-fill--unit" : ""
                }`}
                style={{ width: `${b.width}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Link href="/#preisrechner" className="cta-primary blog-hero-cta">
        Zum interaktiven Preis-Rechner<span aria-hidden="true"> →</span>
      </Link>
    </div>
  );
}
