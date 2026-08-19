import fs from "fs";
import path from "path";
import { cache } from "react";

export type BlogDesign = "timeline" | "bento" | "pricebars" | "split";

export type BlogFrontmatter = {
  title: string;
  meta_description: string;
  slug: string;
  vorgeschlagenes_design: string;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string; // Markdown-Body ohne Frontmatter und ohne führende H1
  design: BlogDesign;
  category: string;
  datePublished: string;
  dateModified: string;
  excerpt: string;
  readingMinutes: number;
  related: string[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Anzeige-Reihenfolge der Übersicht
export const POST_ORDER = [
  "e-rechnungspflicht-handwerk-zugferd",
  "datanorm-gaeb-schnittstellen-handwerk-erklaert",
  "website-kosten-handwerksbetrieb-2026",
  "digitales-bewerberportal-fachkraefte-handwerk",
];

// Design-Variante, Kategorie, Daten (für JSON-LD) und thematisch passende Artikel je Slug.
// Bewusst hier im Code statt im Frontmatter, damit die .md-Dateien unverändert bleiben.
type PostMeta = {
  design: BlogDesign;
  category: string;
  datePublished: string;
  dateModified: string;
  related: string[];
};

const META: Record<string, PostMeta> = {
  "e-rechnungspflicht-handwerk-zugferd": {
    design: "timeline",
    category: "Recht & Fristen",
    datePublished: "2026-08-19",
    dateModified: "2026-08-19",
    related: [
      "datanorm-gaeb-schnittstellen-handwerk-erklaert",
      "website-kosten-handwerksbetrieb-2026",
    ],
  },
  "datanorm-gaeb-schnittstellen-handwerk-erklaert": {
    design: "bento",
    category: "Schnittstellen erklärt",
    datePublished: "2026-08-19",
    dateModified: "2026-08-19",
    related: [
      "e-rechnungspflicht-handwerk-zugferd",
      "website-kosten-handwerksbetrieb-2026",
    ],
  },
  "website-kosten-handwerksbetrieb-2026": {
    design: "pricebars",
    category: "Preise & Kosten",
    datePublished: "2026-08-19",
    dateModified: "2026-08-19",
    related: [
      "digitales-bewerberportal-fachkraefte-handwerk",
      "datanorm-gaeb-schnittstellen-handwerk-erklaert",
    ],
  },
  "digitales-bewerberportal-fachkraefte-handwerk": {
    design: "split",
    category: "Fachkräfte gewinnen",
    datePublished: "2026-08-19",
    dateModified: "2026-08-19",
    related: [
      "website-kosten-handwerksbetrieb-2026",
      "datanorm-gaeb-schnittstellen-handwerk-erklaert",
    ],
  },
};

// Minimaler Frontmatter-Parser – der Content ist ein kontrolliertes, einfaches Format (key: "value").
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^﻿?---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const [, fm, body] = match;
  const data: Record<string, string> = {};
  for (const line of fm.split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    data[m[1]] = val;
  }
  return { data, body };
}

// Entfernt die erste H1 (dupliziert den Titel, der im Artikel-Hero erscheint).
function stripLeadingH1(md: string): string {
  return md.replace(/^\s*#\s+.*(?:\r?\n)+/, "");
}

// Kurzer Teaser: erster echter Absatz (Intro), ohne Markdown-Zeichen.
function makeExcerpt(md: string): string {
  const paras = md
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const first =
    paras.find((p) => !/^[#>\-*]/.test(p) && !p.startsWith("---")) || "";
  const text = first
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 165 ? text.slice(0, 162).trimEnd() + "…" : text;
}

function readingMinutes(md: string): number {
  const words = md.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const getPostBySlug = cache((slug: string): BlogPost | null => {
  const meta = META[slug];
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!meta || !fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, body } = parseFrontmatter(raw);
  const content = stripLeadingH1(body);

  return {
    slug,
    frontmatter: {
      title: data.title || "",
      meta_description: data.meta_description || "",
      slug: data.slug || slug,
      vorgeschlagenes_design: data.vorgeschlagenes_design || "",
    },
    content,
    design: meta.design,
    category: meta.category,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    excerpt: makeExcerpt(content),
    readingMinutes: readingMinutes(content),
    related: meta.related,
  };
});

export const getAllPosts = cache((): BlogPost[] => {
  return POST_ORDER.map((slug) => getPostBySlug(slug)).filter(
    (p): p is BlogPost => p !== null
  );
});
