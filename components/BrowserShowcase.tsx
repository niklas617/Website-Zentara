"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  /** Web-Screenshots (quer, ~2.08:1). Werden 1:1 ohne Crop dargestellt. */
  images: string[];
  /** Adresszeile im Browser-Rahmen, z. B. "monetra.zentara-solutions.de". */
  url: string;
  alt: string;
};

/**
 * Großes Browser-Fenster-Mockup mit Bild-Carousel für die Web-App.
 * Das Seitenverhältnis des Screens ist exakt auf die Screenshots abgestimmt
 * (1918×921 → aspect 1918/921), daher wird nichts beschnitten. Alle Bilder
 * werden gestapelt gerendert und per Opacity weich übergeblendet.
 */
export default function BrowserShowcase({ images, url, alt }: Props) {
  const [current, setCurrent] = useState(0);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const go = (delta: number) =>
    setCurrent((p) => (p + delta + images.length) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - (startY.current ?? 0);
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    startX.current = null;
    startY.current = null;
  };

  return (
    <div className="browser-showcase">
      <div className="browser-frame" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="browser-bar">
          <span className="browser-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="browser-url">
            <span className="browser-lock" aria-hidden="true">🔒</span>
            {url}
          </span>
        </div>
        <div className="browser-screen">
          {images.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`${alt} – Ansicht ${idx + 1}`}
              fill
              /* Screen ist bis ~1000px breit; großzügige sizes → next/image
                 liefert eine hochauflösende (retina-scharfe) Variante. */
              sizes="(max-width: 1060px) 94vw, 1000px"
              quality={90}
              priority={idx === 0}
              className={`browser-img ${idx === current ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="showcase-controls">
        <button
          type="button"
          className="showcase-arrow"
          onClick={() => go(-1)}
          aria-label="Vorheriges Bild"
        >
          &#8249;
        </button>
        <div className="showcase-dots" role="tablist" aria-label="Bildauswahl">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`showcase-dot ${idx === current ? "active" : ""}`}
              aria-current={idx === current}
              onClick={() => setCurrent(idx)}
              aria-label={`Bild ${idx + 1} von ${images.length}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="showcase-arrow"
          onClick={() => go(1)}
          aria-label="Nächstes Bild"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
