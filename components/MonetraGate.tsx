"use client";

import { useState } from "react";

/** Passwort-Gate für die versteckte Monetra-Seite. Sendet das Passwort an
 *  /api/monetra-auth; bei Erfolg setzt der Server das Cookie und wir laden neu. */
export default function MonetraGate({ configured }: { configured: boolean }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/monetra-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const d = await res.json().catch(() => ({}));
      setErr(d.message || "Falsches Passwort.");
    } catch {
      setErr("Netzwerkfehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mon-gate">
      <div className="mon-gate-card">
        <div className="mon-gate-lock" aria-hidden="true">🔒</div>
        <h1>Interner Bereich</h1>
        <p>Dieser Bereich ist passwortgeschützt. Bitte gib das Zugangspasswort ein.</p>

        {!configured && (
          <p className="mon-gate-warn">
            Hinweis: Der Zugang ist serverseitig noch nicht konfiguriert
            (Umgebungsvariable <code>MONETRA_PASSWORD</code> fehlt).
          </p>
        )}

        <form onSubmit={onSubmit}>
          <input
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              if (err) setErr(null);
            }}
            placeholder="Passwort"
            autoFocus
            autoComplete="current-password"
            disabled={loading}
            aria-label="Passwort"
          />
          <button type="submit" disabled={loading || !pw}>
            {loading ? "Prüfe …" : "Zugang entsperren"}
          </button>
          {err && <p className="mon-gate-err">{err}</p>}
        </form>

        <a href="/" className="mon-gate-back">← Zurück zur Startseite</a>
      </div>
    </div>
  );
}
