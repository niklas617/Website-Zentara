"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false); // 1. Neuer State für das Dropdown
  const pathname = usePathname();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setProjectsOpen(false); // Dropdown schließen, wenn ESC gedrückt wird
      }
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

  const close = () => {
    setOpen(false);
    setProjectsOpen(false); // Dropdown zurücksetzen, wenn man navigiert
  };

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
        <ThemeToggle />
      </div>

      <div className="nav-item nav-center">
        <Link href="/" className="logo" onClick={close}>
          Zentara-Solutions
        </Link>
      </div>

      <div className="nav-item nav-right hide-on-mobile">
        <Link href="/offer" className="cta-button" onClick={close}>
          <b>Erstgespräch sichern</b>
        </Link>
      </div>

      <div className={`overlay-menu ${open ? "active" : ""}`} id="overlayMenu">
        <ul className="menu-links">

          {/* 2. & 3. Aktuelle Projekte - Mit Unterkategorien */}
          <li className="has-submenu">
            <button
              className="submenu-trigger"
              onClick={() => setProjectsOpen(!projectsOpen)}
              aria-expanded={projectsOpen}
              style={{
                backgroundColor: "transparent",
                backgroundImage: "none",
                border: "none",
                boxShadow: "none"
              }}
            >
              Aktuelle Projekte
              <span className="dropdown-arrow">
                {projectsOpen ? " ▲" : " ▼"}
              </span>
            </button>

            {/* Das Untermenü wird nur angezeigt, wenn projectsOpen true ist */}
            {projectsOpen && (
              <ul className="submenu">
                <li>
                    <Link href="/project" onClick={close}>Alle ansehen</Link>
                </li>

                {/* Spezifische Unterprojekte */}
                <li>
                  {pathname === "/" ? (
                    <a href="project#portfolio" onClick={close}>
                      Money-Dashboard
                    </a>
                  ) : (
                    <Link href="/project#portfolio" onClick={close}>
                      Money-Dashboard
                    </Link>
                  )}
                </li>
                <li>
                  {pathname === "/" ? (
                    <a href="project#motoset" onClick={close}>
                      MotoSet
                    </a>
                  ) : (
                    <Link href="/project#motoset" onClick={close}>
                      MotoSet
                    </Link>
                  )}
                </li>
              </ul>
            )}
          </li>

          
          {/* Handwerks-Digital-Audit */}
          <li>
            <Link href="#website-audit" onClick={close}>
              Kostenloses Handwerks-Audit
            </Link>
          </li>

          {/* Angebot anfordern */}
          <li>
            <Link href="/offer" onClick={close}>
              Angebot anfordern
            </Link>
          </li>
          
          {/* Preise & Pakete */}
          <li>
            <Link href="/pricing" onClick={close}>
              Preise & Pakete
            </Link>
          </li>

          {/* Häufige Fragen */}
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


          {/* Über mich */}
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

          {/* Kontakt */}
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
      </div >
    </nav >
  );
}