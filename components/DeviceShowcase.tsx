"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  device: "phone" | "laptop";
  images: string[];
  alt: string;
};

/**
 * Parallax-Hook: verschiebt das Gerät leicht relativ zur Scroll-Position.
 * rAF-gedrosselt (kein Jank) und bei prefers-reduced-motion deaktiviert.
 */
function useParallax(strength: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 800;
      const centerDelta = rect.top + rect.height / 2 - viewportH / 2;
      setOffset(centerDelta * strength);
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
  }, [strength]);

  return { ref, offset };
}

/**
 * Animiertes Geräte-Mockup (Handy oder Laptop) mit Scroll-Parallax und
 * integriertem Bild-Slider. Ersetzt die statischen Portfolio-Screenshots.
 * Farben/Rahmen sind an das Zentara-Farbschema (CSS-Variablen) angepasst.
 */
export default function DeviceShowcase({ device, images, alt }: Props) {
  const [current, setCurrent] = useState(0);
  const { ref, offset } = useParallax(device === "phone" ? 0.09 : 0.06);

  const next = () => setCurrent((p) => (p + 1) % images.length);
  const prev = () => setCurrent((p) => (p === 0 ? images.length - 1 : p - 1));

  return (
    <div className={`device-slider device-slider--${device}`}>
      <button className="slider-btn prev-btn" onClick={prev} type="button" aria-label="Vorheriges Bild">
        &#10094;
      </button>

      <div
        ref={ref}
        className={`device device--${device}`}
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        {device === "phone" ? (
          <div className="phone-frame">
            <span className="phone-notch" />
            <div className="device-screen device-screen--phone">
              <Image
                src={images[current]}
                alt={alt}
                fill
                sizes="230px"
                className="device-img"
                style={{ objectPosition: "top" }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="laptop-frame">
              <div className="device-screen device-screen--laptop">
                <Image
                  src={images[current]}
                  alt={alt}
                  fill
                  sizes="(max-width: 600px) 85vw, 440px"
                  className="device-img"
                  style={{ objectPosition: "top" }}
                />
              </div>
            </div>
            <div className="laptop-base">
              <span className="laptop-hinge" />
            </div>
          </>
        )}
      </div>

      <button className="slider-btn next-btn" onClick={next} type="button" aria-label="Nächstes Bild">
        &#10095;
      </button>

      <div className="slider-dots" role="tablist" aria-label="Bildauswahl">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Bild ${i + 1} von ${images.length} anzeigen`}
            aria-current={i === current}
          />
        ))}
      </div>
    </div>
  );
}
