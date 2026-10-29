"use client";

import "../variants.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import VariantSections from "../../../components/variants/VariantSections";
import { MS_LEAD, MS_LINKS } from "../../../lib/motoset-content";

const Scene = dynamic(() => import("../../../components/variants/scenes/SynthwaveScene"), { ssr: false });

export default function SynthwavePage() {
  return (
    <div className="vroot v-synth">
      <nav className="v-nav">
        <span className="v-logo"><i />MotoSet</span>
        <div className="v-nav-links">
          <Link href="/designs">Designs</Link>
          <a href={MS_LINKS.apk} download className="v-btn v-btn--primary v-nav-cta" style={{ padding: "9px 18px", fontSize: ".85rem" }}>App laden ↗</a>
        </div>
      </nav>

      <header className="v-hero">
        <Scene />
        <div className="v-wrap v-hero-content">
          <span className="v-badge">Design 02 · Synthwave</span>
          <span className="v-eyebrow">Ride into the sunset</span>
          <h1 className="v-title v-grad">Moto<em>Set</em></h1>
          <p className="v-lead">{MS_LEAD}</p>
          <div className="v-actions">
            <a href={MS_LINKS.apk} download className="v-btn v-btn--primary">↓ Android-App laden</a>
            <a href={MS_LINKS.web} target="_blank" rel="noopener noreferrer" className="v-btn v-btn--ghost">Web-App öffnen ↗</a>
          </div>
        </div>
        <div className="v-hint"><i />Maus bewegen</div>
      </header>

      <VariantSections />
    </div>
  );
}
