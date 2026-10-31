"use client";

import "./designs/variants.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import VariantSections from "../components/variants/VariantSections";
import { MS_LEAD, MS_LINKS } from "../lib/motoset-content";

// Startseite = Blueprint-Design (Federbein). Nur clientseitig geladene 3D-Szene.
const Scene = dynamic(() => import("../components/variants/scenes/BlueprintScene"), { ssr: false });

export default function Home() {
  return (
    <div className="vroot v-blueprint">
      <nav className="v-nav">
        <span className="v-logo"><i />MotoSet</span>
        <a
          href={MS_LINKS.apk}
          download
          className="v-btn v-btn--primary v-nav-cta"
          style={{ padding: "9px 18px", fontSize: ".85rem" }}
        >
          App laden ↗
        </a>
      </nav>

      <header className="v-hero bp-hero">
        <Scene />
        <div className="bp-scrim" aria-hidden="true" />
        <div className="v-wrap v-hero-content bp-content">
          <div className="bp-text">
            <span className="v-badge">Motorrad-Fahrwerk · digital</span>
            <span className="v-eyebrow">Dein Fahrwerks-Setup, immer dabei</span>
            <h1 className="v-title">Moto<em>Set</em></h1>
            <p className="v-lead">{MS_LEAD}</p>
            <div className="v-actions">
              <a href={MS_LINKS.apk} download className="v-btn v-btn--primary">↓ Android-App laden</a>
              <a href={MS_LINKS.web} target="_blank" rel="noopener noreferrer" className="v-btn v-btn--ghost">Web-App öffnen ↗</a>
            </div>
          </div>
        </div>
        <div className="v-hint"><i />3D · ziehen zum Drehen</div>
      </header>

      <VariantSections home />
    </div>
  );
}
