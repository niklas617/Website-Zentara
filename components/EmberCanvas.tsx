"use client";

import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

/**
 * Subtile, nach oben schwebende Funken/Ember (Werkstatt-Feeling) auf Canvas.
 * Performant: vorgerendertes Glow-Sprite + drawImage (kein per-Partikel-Shadow),
 * additives Compositing, Partikelzahl nach Breite gedeckelt, pausiert außerhalb
 * des Sichtfelds. Bei prefers-reduced-motion komplett inaktiv (nur CSS-Glow bleibt).
 * Farbe fix aus dem ERP-Orange (#f59e0b).
 */
export default function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    if (!ctx || !parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let embers: Ember[] = [];
    let raf = 0;
    let running = true;

    // Glow-Sprite einmalig vorrendern
    const sprite = document.createElement("canvas");
    const S = 32;
    sprite.width = S;
    sprite.height = S;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const g = sctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
      g.addColorStop(0, "rgba(251, 191, 36, 0.95)");
      g.addColorStop(0.35, "rgba(245, 158, 11, 0.55)");
      g.addColorStop(1, "rgba(245, 158, 11, 0)");
      sctx.fillStyle = g;
      sctx.beginPath();
      sctx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
      sctx.fill();
    }

    const spawn = (initial = false): Ember => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + Math.random() * 40,
      r: 0.8 + Math.random() * 2.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(0.2 + Math.random() * 0.65),
      life: initial ? Math.random() * 200 : 0,
      maxLife: 220 + Math.random() * 320,
    });

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(48, Math.max(12, Math.floor(width / 24)));
      embers = Array.from({ length: count }, () => spawn(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const p of embers) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.03; // flackerndes Driften
        const t = p.life / p.maxLife;
        const alpha = Math.sin(Math.min(t, 1) * Math.PI) * 0.75;
        if (p.life >= p.maxLife || p.y < -20) {
          Object.assign(p, spawn(false));
          continue;
        }
        const size = p.r * 6;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      if (running) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    // Außerhalb des Sichtfelds pausieren (Akku/CPU schonen)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!running) {
              running = true;
              raf = requestAnimationFrame(draw);
            }
          } else {
            running = false;
            if (raf) cancelAnimationFrame(raf);
          }
        });
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="erp-ember" aria-hidden="true" />;
}
