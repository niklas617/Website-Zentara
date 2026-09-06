"use client";

import React, { useRef } from "react";
import Image from "next/image";

type Props = {
  /** Hochkant-Screenshots (1080×2262). Werden 1:1 ohne Crop dargestellt. */
  images: string[];
  alt: string;
  /** Größere Karten (für Projekte, bei denen die App-Screens im Fokus stehen). */
  big?: boolean;
};

/**
 * Horizontale, wischbare Galerie aus Handy-Mockups. Auf Touch wird nativ
 * gewischt, auf dem Desktop scrollen die Pfeile jeweils eine Karte weiter.
 * Das Seitenverhältnis der Screens passt exakt zu den Screenshots
 * (1080/2262), daher wird nichts beschnitten.
 */
export default function PhoneGallery({ images, alt, big = false }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".phone-card");
    const amount = card ? card.offsetWidth + 18 : 260;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className={`phone-gallery ${big ? "phone-gallery--big" : ""}`}>
      <button
        type="button"
        className="phone-gallery-arrow prev"
        onClick={() => scrollByCard(-1)}
        aria-label="Vorherige App-Ansicht"
      >
        &#8249;
      </button>

      <div className="phone-gallery-track" ref={trackRef} role="list">
        {images.map((src, i) => (
          <div className="phone-card" role="listitem" key={i}>
            <div className="phone-card-screen">
              <Image
                src={src}
                alt={`${alt} – Screenshot ${i + 1}`}
                fill
                sizes={big ? "340px" : "300px"}
                quality={90}
                className="phone-card-img"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="phone-gallery-arrow next"
        onClick={() => scrollByCard(1)}
        aria-label="Nächste App-Ansicht"
      >
        &#8250;
      </button>
    </div>
  );
}
