"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

// Platzhalterwerte – hier später echte Kennzahlen eintragen.
const STATS: Stat[] = [
  { value: 3, suffix: "+", label: "Projekte live" },
  { value: 100, suffix: "%", label: "DSGVO-konform" },
  { value: 1, prefix: "< ", suffix: " s", label: "Ladezeit" },
  { value: 24, prefix: "< ", suffix: " h", label: "Antwortzeit" },
];

function Counter({ stat, active }: { stat: Stat; active: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(stat.value);
      return;
    }
    const duration = 1400;
    let startTime: number | null = null;
    let raf = 0;
    const tick = (t: number) => {
      if (startTime === null) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(stat.value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, stat.value]);

  return (
    <div className="stat">
      <div className="stat-value">
        {stat.prefix}
        {Math.round(n)}
        {stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

/**
 * Statistik-Sektion mit Zahlen, die beim Einscrollen hochzählen.
 * Werte sind Platzhalter und im Array oben leicht anpassbar.
 */
export default function StatsCounter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="stats-row" ref={ref}>
      {STATS.map((s) => (
        <Counter key={s.label} stat={s} active={active} />
      ))}
    </div>
  );
}
