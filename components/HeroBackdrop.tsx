"use client";

/**
 * Subtiler, animierter Gradient-Mesh-Akzent für den Hero.
 * Reine CSS-Lösung (kein WebGL/Three.js-Bundle) → sehr performant und wird
 * per next/dynamic (ssr:false) lazy geladen. Die Animation läuft ausschließlich
 * über transform/opacity (GPU) und wird bei prefers-reduced-motion eingefroren.
 */
export default function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <span className="hero-blob hero-blob--1" />
      <span className="hero-blob hero-blob--2" />
      <span className="hero-blob hero-blob--3" />
    </div>
  );
}
