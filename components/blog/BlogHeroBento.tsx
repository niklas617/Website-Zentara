import React from "react";

// Schnittstellen: die vier Begriffe als aufklappbare Bento-Kacheln (native <details>, kein JS nötig).
// Die Kurz-Antworten fassen die Artikel-Aussagen zusammen (inhaltlich identisch).
const TERMS = [
  {
    term: "DATANORM",
    sub: "Preise & Artikel",
    answer:
      "Importiert Artikeldaten und aktuelle Preise direkt vom Großhandel in deine Kalkulation – ohne alles von Hand abzutippen.",
  },
  {
    term: "GAEB",
    sub: "Ausschreibungen",
    answer:
      "Standardformat für Leistungsverzeichnisse: Angebote digital einreichen, statt Papierberge zu wälzen.",
  },
  {
    term: "DATEV",
    sub: "Steuerberater",
    answer:
      "Überträgt Rechnungs- und Lohndaten automatisch an den Steuerberater – kein Ordner-Hin-und-Her am Monatsende.",
  },
  {
    term: "IDS Connect",
    sub: "Direktbestellung",
    answer:
      "Material direkt aus deiner Werkstattsoftware beim Großhandel bestellen – ohne Umweg über eine separate Website.",
  },
];

export default function BlogHeroBento() {
  return (
    <div className="blog-hero blog-bento">
      <div className="blog-hero-kicker">
        <span className="blog-hero-kicker-dot" />
        Antippen zum Aufklappen
      </div>
      <div className="blog-bento-grid">
        {TERMS.map((t) => (
          <details className="blog-bento-tile" key={t.term}>
            <summary>
              <span className="blog-bento-term">{t.term}</span>
              <span className="blog-bento-sub">{t.sub}</span>
              <span className="blog-bento-plus" aria-hidden="true" />
            </summary>
            <p className="blog-bento-answer">{t.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
