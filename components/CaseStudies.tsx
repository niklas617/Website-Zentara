"use client";

import Reveal from "./Reveal";

type CaseStudy = {
  project: string;
  metricLabel: string;
  before: string;
  after: string;
  result: string;
};

// PLATZHALTER – erst live schalten (Flag in page.tsx), wenn echte Zahlen vorliegen.
const CASES: CaseStudy[] = [
  {
    project: "Platzhalter-Projekt A",
    metricLabel: "Anfragen / Monat",
    before: "4",
    after: "17",
    result: "Mehr qualifizierte Anfragen durch klare Struktur und schnelle Ladezeit.",
  },
  {
    project: "Platzhalter-Projekt B",
    metricLabel: "Ladezeit",
    before: "4,8 s",
    after: "0,9 s",
    result: "Deutlich schnellere Seite – weniger Absprünge, bessere Sichtbarkeit.",
  },
];

/**
 * Case-Study-Kacheln mit Fokus auf konkrete Zahlen (Vorher/Nachher).
 * Aktuell PLATZHALTER – wird über das Flag SHOW_CASE_STUDIES in page.tsx
 * gesteuert und ist standardmäßig deaktiviert, bis echte Daten vorliegen.
 */
export default function CaseStudies() {
  return (
    <section id="case-studies" className="section" style={{ maxWidth: "1150px", margin: "0 auto" }}>
      <span className="section-eyebrow">Ergebnisse</span>
      <h2 className="section-title">
        Case <span className="highlight">Studies</span>
      </h2>
      <p className="section-lead">
        Zahlen statt Meinungen: So wirken sich moderne Websites messbar aus.
      </p>

      <div className="case-grid">
        {CASES.map((c, i) => (
          <Reveal key={c.project} delay={i * 90}>
            <article className="case-card card">
              <span className="case-badge">Platzhalter</span>
              <h3 className="case-project">{c.project}</h3>
              <div className="case-metric">
                <div className="case-metric-col case-metric-col--before">
                  <span className="case-metric-num">{c.before}</span>
                  <span className="case-metric-tag">vorher</span>
                </div>
                <span className="case-arrow" aria-hidden="true">→</span>
                <div className="case-metric-col case-metric-col--after">
                  <span className="case-metric-num">{c.after}</span>
                  <span className="case-metric-tag">nachher</span>
                </div>
              </div>
              <span className="case-metric-label">{c.metricLabel}</span>
              <p className="case-result">{c.result}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
