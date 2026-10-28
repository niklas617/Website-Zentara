import type { Metadata } from "next";
import { getPostBySlug } from "../../../lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Artikel nicht gefunden" };
  }

  return {
    // absolute, damit der Marken-Suffix zuverlässig dranhängt (das geerbte
    // Template greift bei dynamischen Segmenten unter blog/layout nicht sicher).
    title: { absolute: `${post.frontmatter.title} | Zentara Solutions` },
    description: post.frontmatter.meta_description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.meta_description,
      url: `/blog/${post.slug}`,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
  };
}

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
