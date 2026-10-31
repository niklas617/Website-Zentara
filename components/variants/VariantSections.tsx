import Image from "next/image";
import Link from "next/link";
import { MS_FEATURES, MS_SCREENS, MS_MARQUEE, MS_LINKS } from "../../lib/motoset-content";

/** Geteilte Inhalts-Sektionen unterhalb des Hero. Das Aussehen kommt pro
 *  Variante über die Theme-Klasse am Seiten-Root (z. B. .v-chrome) + variants.css.
 *  `home` = öffentliche Startseite (Footer ohne Dev-Links, mit verstecktem
 *  Monetra-Zugang). */
export default function VariantSections({ home = false }: { home?: boolean }) {
  return (
    <>
      {/* Marquee */}
      <div className="vs-marquee" aria-hidden="true">
        <div className="vs-marquee-track">
          {[0, 1].map((d) => (
            <span className="vs-marquee-row" key={d}>
              {MS_MARQUEE.map((w, i) => (
                <span className="vs-marquee-word" key={i}>{w}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="vs-section">
        <div className="vs-wrap">
          <div className="vs-head">
            <span className="vs-kicker">Kernfunktionen</span>
            <h2 className="vs-h2">Alles für dein perfektes Setup</h2>
            <p className="vs-sub">
              MotoSet ist deine digitale Fahrwerks-Zentrale: einmal einstellen, für immer
              griffbereit – egal ob Landstraße, Enduro oder Rennstrecke.
            </p>
          </div>
          <div className="vs-features">
            {MS_FEATURES.map((f, i) => (
              <div className="vs-card" key={i}>
                <span className="vs-card-ico">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screens */}
      <section className="vs-section vs-section--screens">
        <div className="vs-wrap">
          <div className="vs-head">
            <span className="vs-kicker">Einblick</span>
            <h2 className="vs-h2">So sieht’s in der App aus</h2>
            <p className="vs-sub">Wische dich durch – klar, schnell und auf den Punkt gebaut.</p>
          </div>
        </div>
        <div className="vs-wrap">
          <div className="vs-screens">
            {MS_SCREENS.map((src, i) => (
              <div className="vs-screen" key={i}>
                <div className="vs-screen-frame">
                  <Image src={src} alt={`MotoSet Screenshot ${i + 1}`} fill sizes="300px" quality={90} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vs-section">
        <div className="vs-wrap">
          <div className="vs-cta">
            <h2>Bereit fürs nächste Setup?</h2>
            <p>Lad dir MotoSet und hab deine Fahrwerks-Einstellungen ab sofort immer dabei.</p>
            <div className="vs-actions">
              <a href={MS_LINKS.apk} download className="vs-btn vs-btn--primary">↓ Android-App laden</a>
              <a href={MS_LINKS.web} target="_blank" rel="noopener noreferrer" className="vs-btn vs-btn--ghost">Web-App öffnen ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="vs-footer">
        <div className="vs-wrap vs-footer-inner">
          <span className="vs-copy">© {new Date().getFullYear()} MotoSet · Niklas Smit</span>
          <div className="vs-footer-links">
            {!home && <Link href="/designs">← Alle Designs</Link>}
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            {/* Dezenter, versteckter Zugang zur passwortgeschützten Monetra-Seite */}
            <Link href="/monetra" className="vs-lock" aria-label="Interner Bereich" title="Interner Bereich">🔒</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
