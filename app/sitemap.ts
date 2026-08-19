import type { MetadataRoute } from "next";
import { POST_ORDER } from "../lib/blog";

// Falls deine finale Domain abweicht, hier (und in robots.ts / layout.tsx) anpassen.
const SITE_URL = "https://zentara-solutions.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/project", priority: 0.7, changeFrequency: "monthly" },
    { path: "/offer", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.6, changeFrequency: "monthly" },
    // Blog-Artikel
    ...POST_ORDER.map((slug) => ({
      path: `/blog/${slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    { path: "/impressum", priority: 0.3, changeFrequency: "yearly" },
    { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
