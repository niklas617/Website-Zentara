import { cookies } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";
import { MONETRA_COOKIE, tokenForPassword } from "../../lib/monetra-auth";
import MonetraGate from "../../components/MonetraGate";
import BrowserShowcase from "../../components/BrowserShowcase";
import PhoneGallery from "../../components/PhoneGallery";
import "./monetra.css";

export const metadata: Metadata = {
  title: "Monetra – Interner Bereich",
  robots: { index: false, follow: false },
};

// Nicht cachen – der Auth-Status hängt vom Cookie ab.
export const dynamic = "force-dynamic";

const monetraWeb = [
  "/assets/images/monetra-web-01.jpg",
  "/assets/images/monetra-web-02.jpg",
  "/assets/images/monetra-web-03.jpg",
  "/assets/images/monetra-web-04.jpg",
  "/assets/images/monetra-web-05.jpg",
  "/assets/images/monetra-web-06.jpg",
  "/assets/images/monetra-web-07.jpg",
];

const monetraMobile = [
  "/assets/images/monetra-11.jpg",
  "/assets/images/monetra-09.jpg",
  "/assets/images/monetra-01.jpg",
  "/assets/images/monetra-02.jpg",
  "/assets/images/monetra-03.jpg",
  "/assets/images/monetra-04.jpg",
  "/assets/images/monetra-05.jpg",
  "/assets/images/monetra-06.jpg",
  "/assets/images/monetra-07.jpg",
  "/assets/images/monetra-10.jpg",
];

export default async function MonetraPage() {
  const pw = process.env.MONETRA_PASSWORD;
  const store = await cookies();
  const session = store.get(MONETRA_COOKIE)?.value;
  const expected = pw ? await tokenForPassword(pw) : null;
  const authed = !!expected && !!session && session === expected;

  if (!authed) {
    return <MonetraGate configured={!!pw} />;
  }

  return (
    <div className="mon-page">
      <header className="mon-head">
        <span className="mon-eyebrow">Eigenentwicklung · Interner Bereich</span>
        <h1>
          Projekt: <span>Monetra</span>
        </h1>
        <p>Deine Finanzen in einer Übersicht – als vollwertige Web-App und native Android-App.</p>
      </header>

      <div className="mon-stage">
        <BrowserShowcase images={monetraWeb} url="monetra.zentara-solutions.de" alt="Monetra – Web-App" />
        <div className="mon-mobile">
          <span className="mon-tag">📱 Auch als native App</span>
          <PhoneGallery images={monetraMobile} alt="Monetra – App" />
        </div>
      </div>

      <div className="mon-copy">
        <p>
          Bündelt Kontoauszüge, Trades, Aktien und Krypto an einem Ort: Ein- und Ausgaben werden
          per KI automatisch ausgelesen und kategorisiert, alle Werte in einer Übersicht
          zusammengefasst und im Diagramm direkt gegenübergestellt — statt fünf Apps parallel zu
          checken.
        </p>
        <div className="mon-actions">
          <Link
            href="https://monetra.zentara-solutions.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="mon-btn mon-btn--primary"
          >
            Dashboard öffnen ↗
          </Link>
          <a href="/downloads/money_app.apk" download className="mon-btn mon-btn--ghost">
            ↓ Android-App laden
          </a>
        </div>
      </div>

      <footer className="mon-foot">
        <Link href="/">← Zur MotoSet-Startseite</Link>
      </footer>
    </div>
  );
}
