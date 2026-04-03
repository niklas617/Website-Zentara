"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent background scrolling when the overlay is open (mobile-friendly)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
          <li>
            <Link href="/#services" onClick={close}>
              Dienstleistungen
            </Link>
          </li>
          {<li>
            <Link href="/#portfolio" onClick={close}>
              Projekte
            </Link>
          </li>}
          <li>
            <Link href="/#about" onClick={close}>
              Über mich
            </Link>
          </li>
          <li>
            <Link href="/pricing" onClick={close}>
              Preise
            </Link>
          </li>
          <li>
            <Link href="/offer" onClick={close}>
              Angebot anfordern
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
