"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Step = { title: string; desc: ReactNode };

// Schritte 1:1 aus der bisherigen Roadmap (inkl. Link in Schritt 1).
const STEPS: Step[] = [
  {
    title: "Formular",
    desc: (
      <>
        Fülle das{" "}
        <a href="/offer" className="roadmap-button">
          Kontaktformular
        </a>{" "}
        unverbindlich aus.
      </>
    ),
  },
  { title: "Erstgespräch", desc: "Wir klären die Anforderungen und stecken den Rahmen ab." },
  { title: "Konzeption", desc: "Wir entwickeln ein detailliertes Konzept für dein Projekt." },
  {
    title: "Design & Prototyping",
    desc: "Wir erstellen ein visuelles Design, das genau zu dir oder deinem Betrieb passt.",
  },
  {
    title: "Entwicklung",
    desc: "Die Website wird zum Leben erweckt – responsiv, schnell und suchmaschinenoptimiert.",
  },
  {
    title: "Review & Launch",
    desc: "Gemeinsamer Check, letzte Schliffe und das Go-Live deiner neuen Website.",
  },
  {
    title: "Wartung & Support (optional)",
    desc: "Ich kümmere mich um Updates und Sicherheit, damit du dich voll und ganz auf dein Business konzentrieren kannst.",
  },
];

/** Mittelpunkt (Viewport-Y) des Nummern-Kreises eines Schritts – misst den
 *  echten Kreis, damit die Linie über alle Breakpoints hinweg exakt sitzt. */
function circleCenter(item: HTMLElement) {
  const num = item.querySelector<HTMLElement>(".rt-number") ?? item;
  const r = num.getBoundingClientRect();
  return r.top + r.height / 2;
}

/**
 * Prozess-Timeline "Dein Weg zum Erfolg" mit scroll-gebundener Animation:
 *  1) Verbindungslinie füllt sich progressiv mit Mint (Scroll-Fortschritt).
 *  2) Aktiver Schritt (Kreis nächstliegend zur Viewport-Mitte) wird hervorgehoben.
 *  3) Ein Punkt wandert entlang der Linie an die aktuelle Scroll-Position.
 *
 * Dependency-frei (Scroll-Listener + requestAnimationFrame). Der Fortschritt wird
 * über die CSS-Variable --rt-progress gesetzt (kein React-Re-Render pro Frame).
 * Farben ausschließlich aus den bestehenden CSS-Variablen. prefers-reduced-motion:
 * Linie sofort komplett, kein wandernder Punkt, keine Bewegungsanimation.
 */
export default function RoadmapTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      container.classList.add("rt-reduced");
      container.style.setProperty("--rt-progress", "1");
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
      if (items.length < 2) return;

      const cRect = container.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const center = vh * 0.5;

      const firstCenter = circleCenter(items[0]);
      const lastCenter = circleCenter(items[items.length - 1]);
      const span = lastCenter - firstCenter || 1;

      // Fortschritt: Viewport-Mitte relativ zum ersten/letzten Kreis
      const p = Math.min(Math.max((center - firstCenter) / span, 0), 1);
      container.style.setProperty("--rt-progress", p.toFixed(4));
      container.style.setProperty("--rt-top", `${firstCenter - cRect.top}px`);
      container.style.setProperty("--rt-span", `${span}px`);

      // Aktiver Schritt: Kreis, dessen Mitte der Viewport-Mitte am nächsten ist
      let best = -1;
      let bestDist = Infinity;
      items.forEach((el, i) => {
        const mid = circleCenter(el);
        const d = Math.abs(mid - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      // Nur hervorheben, wenn die Sektion tatsächlich im Blickfeld ist
      if (bestDist > vh * 0.6) best = -1;
      setActive((prev) => (prev === best ? prev : best));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="roadmap-section">
      <h2 className="section-title">Dein Weg zum Erfolg</h2>

      <div className="rt-container" ref={containerRef}>
        <span className="rt-track" aria-hidden="true" />
        <span className="rt-progress" aria-hidden="true" />
        <span className="rt-dot" aria-hidden="true" />

        {STEPS.map((step, i) => (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={`rt-item ${active === i ? "is-active" : ""}`}
          >
            <div className="rt-number">{String(i + 1).padStart(2, "0")}</div>
            <div className="step-content rt-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
