"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  // Wichtig: color-scheme mitschalten, sonst bleiben Scrollbar/Form-Elemente dunkel
  root.style.colorScheme = theme;
}

/**
 * Dark-/Light-Mode-Umschalter. Setzt data-theme + color-scheme am <html>-Element
 * und speichert die Wahl in localStorage. Ein Inline-Script im Layout setzt das
 * Theme bereits vor dem ersten Paint (kein Flackern). Das <html>-JSX enthält
 * bewusst KEIN festes data-theme, damit React die Wahl nicht überschreibt.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme") as Theme | null;
    const saved =
      typeof localStorage !== "undefined" ? (localStorage.getItem("theme") as Theme | null) : null;
    const current = attr ?? saved ?? "dark";
    setTheme(current);
    applyTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    // Aktuelle Wahl aus dem DOM lesen (Source of Truth) – robust gegen
    // React Strict Mode (doppelte Updater-Aufrufe) und schnelle Klicks.
    const current: Theme =
      document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const nextTheme: Theme = current === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      /* localStorage nicht verfügbar – kein Problem */
    }
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={theme === "dark" ? "Hellen Modus aktivieren" : "Dunklen Modus aktivieren"}
      aria-pressed={theme === "light"}
      title={theme === "dark" ? "Heller Modus" : "Dunkler Modus"}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {mounted && theme === "light" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
