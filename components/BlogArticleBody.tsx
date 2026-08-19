import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

/**
 * rehype-Plugin: Markiert den Absatz DIREKT nach jeder H2, der komplett fett ist
 * (die kurze Frage-Antwort), mit der Klasse "answer-callout". So heben sich genau
 * diese – bewusst für KI-Suchmaschinen extrahierbaren – Antwortsätze visuell ab.
 * Absätze nach H2, die nicht voll fett sind, bleiben normaler Fließtext.
 */
function rehypeAnswerCallouts() {
  const isWhitespace = (n: any) =>
    n && n.type === "text" && !String(n.value).trim();

  const isFullyBold = (node: any) => {
    if (!node || node.type !== "element" || node.tagName !== "p") return false;
    const kids = (node.children || []).filter((c: any) => !isWhitespace(c));
    return (
      kids.length === 1 &&
      kids[0].type === "element" &&
      kids[0].tagName === "strong"
    );
  };

  return (tree: any) => {
    const walk = (node: any) => {
      const children = node && node.children;
      if (!Array.isArray(children)) return;
      for (let i = 0; i < children.length; i++) {
        const cur = children[i];
        if (cur.type === "element" && cur.tagName === "h2") {
          let j = i + 1;
          while (j < children.length && children[j].type !== "element") j++;
          const next = children[j];
          if (isFullyBold(next)) {
            next.properties = next.properties || {};
            const cls = next.properties.className;
            next.properties.className = Array.isArray(cls)
              ? [...cls, "answer-callout"]
              : cls
              ? [cls, "answer-callout"]
              : ["answer-callout"];
          }
        }
        walk(cur);
      }
    };
    walk(tree);
  };
}

// --- Helfer, um aus dem hast-Baum Text und Links zu ziehen ---
function nodeText(node: any): string {
  if (!node) return "";
  if (node.type === "text") return node.value;
  return (node.children || []).map(nodeText).join("");
}

function collectLinks(
  node: any,
  acc: { href: string; label: string }[] = []
): { href: string; label: string }[] {
  if (!node) return acc;
  if (node.type === "element" && node.tagName === "a") {
    acc.push({
      href: String(node.properties?.href || "#"),
      label: nodeText(node).replace(/→/g, "").trim(),
    });
  }
  (node.children || []).forEach((c: any) => collectLinks(c, acc));
  return acc;
}

const components = {
  // Blockquotes mit CTA-Link(s) → auffällige, aber dezente Buttons im cta-primary-Stil.
  blockquote({ node, children }: any) {
    const links = collectLinks(node);
    if (links.length > 0) {
      let lead = nodeText(node);
      for (const l of links) lead = lead.replace(l.label, "");
      lead = lead.replace(/→/g, "").replace(/\s+/g, " ").trim();
      return (
        <div className="blog-cta">
          {lead && <p className="blog-cta-lead">{lead}</p>}
          <div className="blog-cta-actions">
            {links.map((l, i) => (
              <Link key={i} href={l.href} className="cta-primary blog-cta-btn">
                {l.label}
                <span aria-hidden="true"> →</span>
              </Link>
            ))}
          </div>
        </div>
      );
    }
    return <blockquote>{children}</blockquote>;
  },
};

export default function BlogArticleBody({ content }: { content: string }) {
  return (
    <div className="blog-content">
      <ReactMarkdown
        rehypePlugins={[rehypeAnswerCallouts]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
