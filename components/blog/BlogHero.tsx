import React from "react";
import type { BlogDesign } from "../../lib/blog";
import BlogHeroTimeline from "./BlogHeroTimeline";
import BlogHeroBento from "./BlogHeroBento";
import BlogHeroPriceBars from "./BlogHeroPriceBars";
import BlogHeroSplit from "./BlogHeroSplit";

// Wählt das artikelspezifische Hero-Element anhand der Design-Variante.
export default function BlogHero({ design }: { design: BlogDesign }) {
  switch (design) {
    case "timeline":
      return <BlogHeroTimeline />;
    case "bento":
      return <BlogHeroBento />;
    case "pricebars":
      return <BlogHeroPriceBars />;
    case "split":
      return <BlogHeroSplit />;
    default:
      return null;
  }
}
