"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // Schließt das Menü, wenn die Escape-Taste gedrückt wird
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Verhindert das Scrollen im Hintergrund, wenn das Overlay-Menü geöffnet ist (Mobile-Friendly)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Hilfsfunktion zum Schließen des Menüs bei Klick auf einen Link
  const close = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-item nav-left">
        <button
          className="menu-btn"
          id="menuTrigger"
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-icon" />
        </button>
      </div>

      {/* <div className="nav-item nav-center">
        <Link href="/" className="logo" onClick={close}>
          Zentara
        </Link>
      </div> */}

      {/* <div className="nav-item nav-right">
        <Link href="/offer" className="cta-button" onClick={close}>
          <b>Projekt starten</b>
        </Link>
      </div> */}

      <div className={`overlay-menu ${open ? "active" : ""}`} id="overlayMenu">
        <ul className="menu-links">
          {/* <li>
            <a href="#services" onClick={close}>
              Dienstleistungen
            </a>
          </li> */}
          
          {/* ANGEPASST: Reguläres <a> Tag für reibungsloses In-Page-Scrolling */}
          <li>
            <a href="#portfolio" onClick={close}>
              Aktuelle Projekte
            </a>
          </li>

          {/* ANGEPASST: Reguläres <a> Tag für reibungsloses In-Page-Scrolling */}
          <li>
            <a href="#faq" onClick={close}>
              Häufige Fragen
            </a>
          </li>

          {/* BEIBEHALTEN: <Link> Komponente für eine echte neue Unterseite */}
          <li>
            <Link href="/pricing" onClick={close}>
              Preise & Pakete
            </Link>
          </li>

          {/* BEIBEHALTEN: <Link> Komponente für eine echte neue Unterseite */}
          <li>
            <Link href="/offer" onClick={close}>
              Angebot anfordern
            </Link>
          </li>

          {/* ANGEPASST: Reguläres <a> Tag für reibungsloses In-Page-Scrolling */}
          <li>
            <a href="#about" onClick={close}>
              Über mich
            </a>
          </li>

          {/* ANGEPASST: Reguläres <a> Tag für reibungsloses In-Page-Scrolling */}
          <li>
            <a href="#footer" onClick={close}>
              Kontakt
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}