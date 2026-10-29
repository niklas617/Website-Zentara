"use client";

import "./motoset.css";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import localFont from "next/font/local";

// Echte 3D-Szene (three.js) – nur clientseitig laden.
const MotoSet3D = dynamic(() => import("../components/MotoSet3D"), { ssr: false });

// Selbst-gehostete Fonts (DSGVO-konform, kein Build-Zeit-Fetch zu Google).
const display = localFont({ src: "./fonts/anton-400.woff2", weight: "400", variable: "--font-display", display: "swap" });
const body = localFont({ src: "./fonts/space-grotesk.woff2", weight: "400 700", variable: "--font-body", display: "swap" });

const SCREENS = [
  "/assets/images/motoset-00.jpg",
  "/assets/images/motoset-01.jpg",
  "/assets/images/motoset-02.jpg",
  "/assets/images/motoset-03.jpg",
  "/assets/images/motoset-04.jpg",
  "/assets/images/motoset-05.jpg",
  "/assets/images/motoset-06.jpg",
  "/assets/images/motoset-07.jpg",
];

const MARQUEE = [
  "Setup", "Suspension", "Trackday", "Offline", "Versioniert", "Pro Bike",
  "Gabel", "Dämpfer", "Vorspannung", "Zugstufe", "Druckstufe",
];

export default function MotoSetOnepager() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const a2Ref = useRef<HTMLDivElement | null>(null);
  const a3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scroll-Reveal
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    rootRef.current?.querySelectorAll(".ms-reveal").forEach((el) => io.observe(el));

    if (reduce) return () => io.disconnect();

    let raf = 0;
    let mx = 0, my = 0;
    const onMove = (ev: MouseEvent) => {
      mx = ev.clientX; my = ev.clientY;
      if (cursorRef.current) { cursorRef.current.style.left = mx + "px"; cursorRef.current.style.top = my + "px"; }
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      const cx = mx / window.innerWidth - 0.5;
      const cy = my / window.innerHeight - 0.5;
      if (phoneRef.current) phoneRef.current.style.transform =
        `perspective(900px) rotateY(${cx * 14}deg) rotateX(${-cy * 12}deg) translateZ(0)`;
      if (a2Ref.current) a2Ref.current.style.transform = `translate3d(${cx * -40}px, ${cy * -30}px, 0)`;
      if (a3Ref.current) a3Ref.current.style.transform = `translate3d(${cx * 34}px, ${cy * 26}px, 0)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Karten-Spotlight
    const cards = rootRef.current?.querySelectorAll<HTMLElement>(".ms-card");
    const onCard = (ev: Event) => {
      const el = ev.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const me = ev as MouseEvent;
      el.style.setProperty("--mx", `${me.clientX - r.left}px`);
      el.style.setProperty("--my", `${me.clientY - r.top}px`);
    };
    cards?.forEach((c) => c.addEventListener("mousemove", onCard));

    return () => {
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      cards?.forEach((c) => c.removeEventListener("mousemove", onCard));
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className={`ms-root ${display.variable} ${body.variable}`}>
      <div className="ms-grain" aria-hidden="true" />
      <div ref={cursorRef} className="ms-cursor" aria-hidden="true" />

      <div className="ms-shell">
        {/* NAV */}
        <nav className="ms-nav">
          <span className="ms-logo"><span className="ms-logo-dot" />MotoSet</span>
          <a href="/downloads/motoset.apk" download className="ms-nav-cta">App laden ↗</a>
        </nav>

        {/* HERO */}
        <header className="ms-hero">
          <MotoSet3D />
          <div className="ms-aurora a1" aria-hidden="true" />
          <div ref={a2Ref} className="ms-aurora a2" aria-hidden="true" />
          <div ref={a3Ref} className="ms-aurora a3" aria-hidden="true" />

          <div className="ms-wrap ms-hero-inner">
            <div>
              <span className="ms-eyebrow">Motorrad-Fahrwerk · digital</span>
              <h1 className="ms-title">
                Moto<span className="l2">Set.</span>
              </h1>
              <p className="ms-lead">
                Schluss mit Zetteln, Fotos und Excel. <strong>MotoSet</strong> speichert jedes
                Fahrwerks-Setup pro Bike – versioniert, blitzschnell abrufbar und{" "}
                <strong>offline am Trackday</strong>.
              </p>

              <div className="ms-hero-actions">
                <a href="/downloads/motoset.apk" download className="ms-btn ms-btn--primary">
                  ↓ Android-App laden
                </a>
                <a href="https://motoset-2d516.web.app/" target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn--ghost">
                  Web-App öffnen ↗
                </a>
              </div>

              <div className="ms-hero-meta">
                <div><b>100%</b><span>Offline nutzbar</span></div>
                <div><b>∞</b><span>Setups &amp; Bikes</span></div>
                <div><b>Sek.</b><span>statt Zettelsuche</span></div>
              </div>
            </div>

            <div ref={phoneRef} className="ms-hero-phone">
              <div className="ms-phone">
                <Image src={SCREENS[0]} alt="MotoSet App" fill sizes="320px" quality={90} priority />
              </div>
            </div>
          </div>

          <div className="ms-3d-hint" aria-hidden="true">
            <span className="ms-3d-hint-dot" />3D · ziehen zum Drehen
          </div>
          <div className="ms-scrollcue" aria-hidden="true"><i />Scroll</div>
        </header>

        {/* MARQUEE */}
        <div className="ms-marquee" aria-hidden="true">
          <div className="ms-marquee-track">
            {[0, 1].map((dup) => (
              <span key={dup} style={{ gap: "40px" }}>
                {MARQUEE.map((w, i) => <span key={i}>{w}</span>)}
              </span>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <section className="ms-section">
          <div className="ms-wrap">
            <div className="ms-section-head ms-reveal">
              <span className="ms-kicker">Kernfunktionen</span>
              <h2 className="ms-h2">Alles für dein <em>perfektes Setup</em></h2>
              <p className="ms-sub">
                MotoSet ist deine digitale Fahrwerks-Zentrale: einmal einstellen, für immer
                griffbereit – egal ob Landstraße, Enduro oder Rennstrecke.
              </p>
            </div>

            <div className="ms-bento">
              <div className="ms-card col3 ms-reveal">
                <span className="ms-card-ico">🏍️</span>
                <h3>Setups pro Bike</h3>
                <p>Jedes Motorrad bekommt sein eigenes Profil mit allen Fahrwerks-Werten – sauber getrennt, nie wieder vertauscht.</p>
              </div>
              <div className="ms-card col3 ms-reveal">
                <span className="ms-card-ico">🕓</span>
                <h3>Versioniert</h3>
                <p>Jede Änderung wird gespeichert. Ein Setup war besser? Hol den alten Stand in Sekunden zurück.</p>
              </div>
              <div className="ms-card col2 ms-reveal">
                <span className="ms-card-ico">📡</span>
                <h3>100% Offline</h3>
                <p>Funktioniert ohne Netz – genau da, wo du es brauchst: in der Box am Trackday.</p>
              </div>
              <div className="ms-card col2 ms-reveal">
                <span className="ms-card-ico">⚡</span>
                <h3>Sofort abrufbar</h3>
                <p>Gabel, Dämpfer, Zug- &amp; Druckstufe – in Sekunden nachgeschlagen statt im Zettelchaos gesucht.</p>
              </div>
              <div className="ms-card col2 ms-reveal">
                <span className="big">0</span>
                <h3 style={{ marginTop: "6px" }}>Zettel nötig</h3>
                <p>Alles an einem Ort – dein Handy ersetzt den Ordner.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SCREENS */}
        <section className="ms-section" style={{ paddingTop: 0 }}>
          <div className="ms-wrap">
            <div className="ms-section-head ms-reveal">
              <span className="ms-kicker">Einblick</span>
              <h2 className="ms-h2">So sieht’s <em>in der App</em> aus</h2>
              <p className="ms-sub">Wische dich durch – klar, schnell und auf den Punkt gebaut.</p>
            </div>
          </div>
          <div className="ms-wrap ms-reveal">
            <div className="ms-screens">
              {SCREENS.map((src, i) => (
                <div className="ms-screen" key={i}>
                  <div className="ms-screen-frame">
                    <Image src={src} alt={`MotoSet Screenshot ${i + 1}`} fill sizes="300px" quality={90} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ms-section" style={{ paddingTop: 0 }}>
          <div className="ms-wrap ms-reveal">
            <div className="ms-cta">
              <h2>Bereit fürs<br />nächste Setup?</h2>
              <p>Lad dir MotoSet und hab deine Fahrwerks-Einstellungen ab sofort immer dabei.</p>
              <div className="ms-hero-actions">
                <a href="/downloads/motoset.apk" download className="ms-btn ms-btn--primary">↓ Android-App laden</a>
                <a href="https://motoset-2d516.web.app/" target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn--ghost">Web-App öffnen ↗</a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="ms-footer">
          <div className="ms-wrap ms-footer-inner">
            <span className="ms-copy">© {new Date().getFullYear()} Zentara Solutions · Niklas Smit</span>
            <div className="ms-footer-links">
              <Link href="/impressum">Impressum</Link>
              <Link href="/datenschutz">Datenschutz</Link>
              {/* Dezenter Einstieg zur versteckten, passwortgeschützten Monetra-Seite */}
              <Link href="/monetra" className="ms-lock" aria-label="Interner Bereich" title="Interner Bereich">🔒</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
