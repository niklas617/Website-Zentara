import Link from "next/link";
import "./variants.css";

const VARIANTS = [
  { slug: "blueprint", n: "01", name: "Blueprint", desc: "Technischer CAD-Look: drehbares Wireframe-Rad über Konstruktions-Grid, Mono-Typo, Cyan.", cols: ["#060d16", "#6fe9ff", "#7fa6bd"] },
  { slug: "synthwave", n: "02", name: "Synthwave", desc: "Retro-Sonnenuntergang mit scrollendem Neon-Terrain und gestreifter Sonne. Pink/Orange.", cols: ["#140a28", "#ff2e9a", "#ff9a3d"] },
  { slug: "chrome", n: "03", name: "Chrome", desc: "Premium & edel: hochglänzendes Chrom-Objekt mit Studio-Reflexionen, drag-to-rotate.", cols: ["#0a0a0c", "#e8e8ee", "#a9b0c0"] },
  { slug: "particles", n: "04", name: "Particles", desc: "Generativ: Partikel-Sphäre, die vor dem Cursor zurückweicht. Minimal, Violett/Cyan.", cols: ["#050509", "#8b5cff", "#27e0ff"] },
  { slug: "showroom", n: "05", name: "Showroom", desc: "Produkt im Fokus: drehbarer 3D-Ring aus echten App-Screenshots. Clean, Teal.", cols: ["#0f1116", "#2ee6b6", "#6c7bff"] },
];

export default function DesignsIndex() {
  return (
    <div className="dx">
      <div className="dx-head">
        <h1>5 MotoSet-Designs in 3D</h1>
        <p>
          Fünf komplett unterschiedliche Richtungen – jede mit eigener 3D-Szene und eigenem Look.
          Klick dich durch, dann sag mir, welche dir gefällt (oder welche Mischung). Dein aktuelles
          Live-Design bleibt davon unberührt.
        </p>
      </div>
      <div className="dx-grid">
        {VARIANTS.map((v) => (
          <Link key={v.slug} href={`/designs/${v.slug}`} className="dx-card">
            <span className="dx-num">Design {v.n}</span>
            <h2>{v.name}</h2>
            <p>{v.desc}</p>
            <span className="dx-swatch">
              {v.cols.map((c, i) => <span key={i} style={{ background: c }} />)}
            </span>
          </Link>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <Link href="/" className="dx-back">← Zur aktuellen Live-Version</Link>
      </div>
    </div>
  );
}
