import React from "react";

// E-Rechnung: Fristen als visuelle Zeitleiste (2025 / 2026–2027 / 2028).
const MILESTONES = [
  {
    year: "2025",
    tag: "seit Januar",
    label: "Empfangen wird Pflicht – für jedes Unternehmen, ausnahmslos.",
    state: "now",
  },
  {
    year: "2026–2027",
    tag: "Übergang",
    label: "Übergangsfristen fürs Versenden, je nach Betriebsgröße.",
    state: "next",
  },
  {
    year: "ab 2028",
    tag: "Endspurt",
    label: "E-Rechnung wird für praktisch alle B2B-Rechnungen Pflicht.",
    state: "final",
  },
];

export default function BlogHeroTimeline() {
  return (
    <div className="blog-hero blog-timeline" role="img" aria-label="Zeitleiste der E-Rechnungs-Fristen: 2025 Empfangen Pflicht, 2026 bis 2027 Übergangsfristen, ab 2028 vollständige Pflicht.">
      <div className="blog-hero-kicker">
        <span className="blog-hero-kicker-dot" />
        Die Uhr läuft
      </div>
      <div className="blog-timeline-track">
        <div className="blog-timeline-line" aria-hidden="true" />
        {MILESTONES.map((m) => (
          <div className={`blog-tl-node blog-tl-node--${m.state}`} key={m.year}>
            <span className="blog-tl-dot" aria-hidden="true" />
            <span className="blog-tl-year">{m.year}</span>
            <span className="blog-tl-tag">{m.tag}</span>
            <span className="blog-tl-label">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
