"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  end: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

/**
 * Zählt beim Einscrollen von 0 auf `end` hoch. Wiederverwendbar (Zentara & ERP).
 * Dependency-frei via IntersectionObserver + requestAnimationFrame.
 * Respektiert prefers-reduced-motion: zeigt den Zielwert sofort.
 */
export default function CountUp({
  end,
  durationMs = 1600,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            io.unobserve(entry.target);

            let startTime: number | null = null;
            let raf = 0;
            const tick = (t: number) => {
              if (startTime === null) startTime = t;
              const p = Math.min((t - startTime) / durationMs, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(end * eased);
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [end, durationMs]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
