"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

      <div className="nav-item nav-center">
        {/* Relativer Link, kein target="_blank" */}
        <Link href="/" className="logo" onClick={close}>
          Zentara
        </Link>
      </div>

      <div className="nav-item nav-right hide-on-mobile">
        {/* Relativer Link, kein target="_blank" */}
        <Link href="/offer" className="cta-button" onClick={close}>
          <b>Projekt starten</b>
        </Link>
      </div>

      <div className={`overlay-menu ${open ? "active" : ""}`} id="overlayMenu">
        <ul className="menu-links">
          
          {/* Aktuelle Projekte - Intelligenter Link */}
          <li>
            {pathname === "/" ? (
              <a href="#portfolio" onClick={close}>
                Aktuelle Projekte
              </a>
            ) : (
              <Link href="/#portfolio" onClick={close}>
                Aktuelle Projekte
              </Link>
            )}
          </li>

          {/* Häufige Fragen - Intelligenter Link */}
          <li>
            {pathname === "/" ? (
              <a href="#faq" onClick={close}>
                Häufige Fragen
              </a>
            ) : (
              <Link href="/#faq" onClick={close}>
                Häufige Fragen
              </Link>
            )}
          </li>

          {/* Preise & Pakete - Relativer Link, kein neuer Tab */}
          <li>
            <Link href="/pricing" onClick={close}>
              Preise & Pakete
            </Link>
          </li>

          {/* Angebot anfordern - Relativer Link, kein neuer Tab */}
          <li>
            <Link href="/offer" onClick={close}>
              Angebot anfordern
            </Link>
          </li>

          {/* Über mich - Intelligenter Link */}
          <li>
            {pathname === "/" ? (
              <a href="#about" onClick={close}>
                Über mich
              </a>
            ) : (
              <Link href="/#about" onClick={close}>
                Über mich
              </Link>
            )}
          </li>

          {/* Kontakt - Intelligenter Link */}
          <li>
            {pathname === "/" ? (
              <a href="#footer" onClick={close}>
                Kontakt
              </a>
            ) : (
              <Link href="/#footer" onClick={close}>
                Kontakt
              </Link>
            )}
          </li>

        </ul>
      </div>
    </nav>
  );
}
