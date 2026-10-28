import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "../../../components/NavBar";
import RealEstateChatbot from "../../../components/RealEstateChatbot";
import BlogArticleBody from "../../../components/BlogArticleBody";
import BlogHero from "../../../components/blog/BlogHero";
import { getPostBySlug, POST_ORDER } from "../../../lib/blog";

const SITE_URL = "https://zentara-solutions.de";

export function generateStaticParams() {
  return POST_ORDER.map((slug) => ({ slug }));
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = post.related
    .map((s) => getPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const publishedLabel = new Date(post.datePublished).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.meta_description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: "de-DE",
    author: { "@type": "Person", name: "Niklas Smit" },
    publisher: {
      "@type": "Organization",
      name: "Zentara Solutions",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/images/favicon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <NavBar />
      <RealEstateChatbot />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="blog-article">
        <div className="blog-article-inner">
          <Link href="/blog" className="blog-back">
            <span aria-hidden="true">←</span> Alle Artikel
          </Link>

          <span className="blog-eyebrow">{post.category}</span>
          <h1 className="blog-article-title">{post.frontmatter.title}</h1>

          <div className="blog-article-meta">
            <span>Niklas Smit</span>
            <span className="blog-meta-dot" aria-hidden="true">
              ·
            </span>
            <span>{publishedLabel}</span>
            <span className="blog-meta-dot" aria-hidden="true">
              ·
            </span>
            <span>{post.readingMinutes} Min. Lesezeit</span>
          </div>

          <BlogHero design={post.design} />

          <BlogArticleBody content={post.content} />

          {related.length > 0 && (
            <aside className="blog-related">
              <h2 className="blog-related-title">Das könnte dich auch interessieren</h2>
              <div className="blog-related-grid">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="card blog-related-card"
                  >
                    <span className="blog-card-kicker">{r.category}</span>
                    <h3 className="blog-related-card-title">{r.frontmatter.title}</h3>
                    <span className="blog-card-more">
                      Weiterlesen<span aria-hidden="true"> →</span>
                    </span>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </div>
      </article>
    </>
  );
}
