"use client";

import { useEffect, useState } from "react";

type Part = { text: string; highlight?: boolean };

type Props = {
  parts: Part[];
  className?: string;
  /** Millisekunden Versatz zwischen den Wörtern */
  stagger?: number;
  /** Klasse für hervorgehobene Wörter (Default: Zentara-Mint "highlight"). */
  highlightClassName?: string;
};

/**
 * Hero-Headline, die beim Laden einmalig Wort für Wort sanft eingeblendet wird.
 * Ersetzt den früheren Typewriter-Effekt. Respektiert prefers-reduced-motion
 * (dann erscheint die Headline sofort komplett). Der Wortabstand kommt aus CSS
 * (.word-reveal-wrap { margin-right }), damit nichts zusammenklebt.
 */
export default function HeroReveal({
  parts,
  className = "",
  stagger = 85,
  highlightClassName = "highlight",
}: Props) {
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStart(true);
      return;
    }
    const id = requestAnimationFrame(() => setStart(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const fullLabel = parts.map((p) => p.text).join(" ");
  let wordIndex = 0;

  return (
    <h1 className={`hero-headline ${className}`} aria-label={fullLabel}>
      {parts.map((part, pi) => {
        const words = part.text.split(" ");
        return words.map((w, wi) => {
          const idx = wordIndex++;
          return (
            <span className="word-reveal-wrap" key={`${pi}-${wi}`} aria-hidden="true">
              <span
                className={`word-reveal ${start ? "word-reveal--in" : ""} ${part.highlight ? highlightClassName : ""}`}
                style={{ transitionDelay: `${idx * stagger}ms` }}
              >
                {w}
              </span>
            </span>
          );
        });
      })}
    </h1>
  );
}
