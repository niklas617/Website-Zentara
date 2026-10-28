import React from "react";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RealEstateChatbot from "../../components/RealEstateChatbot";
import { getAllPosts } from "../../lib/blog";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <NavBar />
      <RealEstateChatbot />

      <main className="blog-index">
        <header className="blog-index-head">
          <span className="section-eyebrow">Zentara Blog</span>
          <h1 className="section-title">
            Digital-Wissen <span className="highlight">fürs Handwerk</span>
          </h1>
          <p className="section-lead">
            Klartext statt Fachchinesisch: praxisnahe Artikel zu E-Rechnung, Schnittstellen,
            Website-Kosten und Fachkräftegewinnung – geschrieben für Handwerksbetriebe und KMU.
          </p>
        </header>

        <div className="blog-grid">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card blog-card"
              aria-label={post.frontmatter.title}
            >
              <span className="blog-card-accent" aria-hidden="true" />
              <span className="blog-card-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="blog-card-kicker">{post.category}</span>
              <h2 className="blog-card-title">{post.frontmatter.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-foot">
                <span className="blog-card-meta">{post.readingMinutes} Min. Lesezeit</span>
                <span className="blog-card-more">
                  Weiterlesen<span aria-hidden="true"> →</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
