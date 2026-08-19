import React from "react";

// Bewerberportal: Split-Screen "Klassischer Weg" vs. "Express-Portal" (2 Minuten statt 20).
const OLD_STEPS = [
  "Lebenslauf schreiben",
  "Zeugnisse einscannen",
  "Alles als PDF hochladen",
  "Per Mail verschicken",
];

const NEW_STEPS = [
  "Name & Kontakt eingeben",
  "Position auswählen",
  "Absenden – fertig",
];

export default function BlogHeroSplit() {
  return (
    <div className="blog-hero blog-split">
      <div className="blog-split-col blog-split-old">
        <span className="blog-split-tag">Klassischer Weg</span>
        <ul className="blog-split-steps">
          {OLD_STEPS.map((s) => (
            <li key={s}>
              <span className="blog-split-mark blog-split-mark--old" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
        <div className="blog-split-time blog-split-time--old">
          <span className="blog-split-time-num">~ 20</span>
          <span className="blog-split-time-unit">Minuten</span>
        </div>
      </div>

      <div className="blog-split-vs" aria-hidden="true">
        <span>vs</span>
      </div>

      <div className="blog-split-col blog-split-new">
        <span className="blog-split-tag">Express-Portal</span>
        <ul className="blog-split-steps">
          {NEW_STEPS.map((s) => (
            <li key={s}>
              <span className="blog-split-mark blog-split-mark--new" aria-hidden="true">
                ✓
              </span>
              {s}
            </li>
          ))}
        </ul>
        <div className="blog-split-time blog-split-time--new">
          <span className="blog-split-time-num">unter 2</span>
          <span className="blog-split-time-unit">Minuten</span>
        </div>
      </div>
    </div>
  );
}
