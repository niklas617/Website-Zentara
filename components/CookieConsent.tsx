"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const CONSENT_KEY = "zentara-cookie-consent";

// "pending" = noch nicht geprüft (SSR/erste Render), "none" = keine Wahl getroffen (Banner zeigen)
type Consent = "pending" | "none" | "accepted" | "declined";

/**
 * DSGVO-freundliches Cookie-Banner im Zentara-Look.
 * Die (cookielose) Umami-Reichweitenmessung wird NUR nach ausdrücklicher
 * Zustimmung ("Alle akzeptieren") geladen. Die Wahl wird in localStorage
 * gespeichert, sodass das Banner nicht erneut erscheint.
 */
export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>("pending");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      /* localStorage evtl. blockiert */
    }
    setConsent(stored === "accepted" || stored === "declined" ? (stored as Consent) : "none");
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* ignore */
    }
    setConsent(value);
  };

  return (
    <>
      {/* Analytics erst nach Zustimmung laden */}
      {consent === "accepted" && (
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="53bfbd4e-455a-49e3-bfb2-dd72a45eaefa"
          strategy="afterInteractive"
        />
      )}

      {consent === "none" && (
        <div
          className="cookie-banner"
          role="dialog"
          aria-label="Cookie-Hinweis"
          aria-live="polite"
        >
          <div className="cookie-banner-inner">
            <div className="cookie-banner-text">
              <strong className="cookie-banner-title">🍪 Cookies & Datenschutz</strong>
              <p>
                Wir verwenden nur technisch notwendige Cookies. Mit deiner Zustimmung nutzen wir
                zusätzlich eine anonyme, datenschutzfreundliche Reichweitenmessung, um die Website
                zu verbessern. Details in der{" "}
                <Link href="/datenschutz" className="cookie-banner-link">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>

            <div className="cookie-banner-actions">
              <button
                type="button"
                className="cookie-btn cookie-btn-ghost"
                onClick={() => choose("declined")}
              >
                Nur notwendige
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-primary"
                onClick={() => choose("accepted")}
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
