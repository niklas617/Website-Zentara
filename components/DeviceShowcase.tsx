"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  device: "phone" | "laptop" | "duo";
  images: string[];
  /** Für device="duo": Hochkant-Screenshots für das überlappende Handy. */
  phoneImages?: string[];
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
export default function DeviceShowcase({ device, images, phoneImages, alt }: Props) {
  const [current, setCurrent] = useState(0);
  const { ref, offset } = useParallax(device === "phone" ? 0.09 : 0.06);
  // Zweite, leicht stärkere Parallax für das Handy im Duo-Layout → dezente Tiefe.
  const phone = useParallax(0.1);

  // Im Duo-Layout kann das Handy mehr Screenshots haben als der Laptop – der
  // Slider läuft dann über die größere Anzahl, das Laptop-Bild wiederholt sich.
  const slideCount =
    device === "duo"
      ? Math.max(images.length, phoneImages?.length ?? 0)
      : images.length;
  const next = () => setCurrent((p) => (p + 1) % slideCount);
  const prev = () => setCurrent((p) => (p === 0 ? slideCount - 1 : p - 1));

  // --- Swipe-Navigation (Touch): links/rechts wischen wie bei Instagram ---
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - (touchStartY.current ?? 0);
    // Nur eindeutig horizontale Wischer auslösen (vertikales Scrollen bleibt unberührt).
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Duo: Laptop als Haupt-Slider, davor überlappend ein Handy.
  if (device === "duo") {
    const pics = phoneImages ?? [];
    const phoneSrc = pics.length ? pics[current % pics.length] : null;

    return (
      <div className="device-slider device-slider--duo" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <button className="slider-btn prev-btn" onClick={prev} type="button" aria-label="Vorheriges Bild">
          &#10094;
        </button>

        <div className="device-duo">
          <div
            ref={ref}
            className="device device--laptop"
            style={{ transform: `translate3d(0, ${offset}px, 0)` }}
          >
            <div className="laptop-frame">
              <div className="device-screen device-screen--laptop">
                <Image
                  src={images[current % images.length]}
                  alt={alt}
                  fill
                  sizes="(max-width: 600px) 92vw, 520px"
                  quality={90}
                  className="device-img"
                  /* left top: hält die Monetra-Sidebar sichtbar (Web-Screens sind
                     breiter als der 16:10-Laptop) */
                  style={{ objectPosition: "left top" }}
                />
              </div>
            </div>
            <div className="laptop-base">
              <span className="laptop-hinge" />
            </div>
          </div>

          <div
            ref={phone.ref}
            className="device-duo-phone"
            style={{ transform: `translate3d(0, ${phone.offset}px, 0)` }}
          >
            <div className="phone-frame">
              <span className="phone-notch" />
              <div className="device-screen device-screen--phone">
                {phoneSrc ? (
                  <Image
                    src={phoneSrc}
                    alt={`${alt} – mobile Ansicht`}
                    fill
                    sizes="360px"
                    quality={90}
                    className="device-img"
                    style={{ objectPosition: "top" }}
                  />
                ) : (
                  <div className="device-placeholder" aria-hidden="true">
                    <span className="device-placeholder-icon">📱</span>
                    <strong>Mobil-Ansicht</strong>
                    <small>Screenshot folgt</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className="slider-btn next-btn" onClick={next} type="button" aria-label="Nächstes Bild">
          &#10095;
        </button>

        <div className="slider-dots" role="tablist" aria-label="Bildauswahl">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Bild ${i + 1} von ${slideCount} anzeigen`}
              aria-current={i === current}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`device-slider device-slider--${device}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
            <div className="device-screen device-screen--phone">
              <Image
                src={images[current]}
                alt={alt}
                fill
                /* object-fit: cover zeichnet das 16:9-Bild in der hohen
                   Handy-Box ~810px breit – daher hier eine entsprechend
                   große sizes-Angabe, damit next/image eine scharfe
                   Variante (statt einer 640px-Miniatur) lädt. */
                sizes="810px"
                quality={90}
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
                  /* Cover zeichnet das Bild ~500px breit im Laptop-Rahmen;
                     großzügige sizes + höhere Qualität für scharfe Screenshots. */
                  sizes="(max-width: 600px) 92vw, 520px"
                  quality={90}
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
