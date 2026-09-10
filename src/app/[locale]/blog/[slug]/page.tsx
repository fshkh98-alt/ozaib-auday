import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? undefined,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
    include: { category: true, tags: true },
  });

  if (!post || post.status !== "PUBLISHED") notFound();

  return (
    <article className="prose prose-invert mx-auto max-w-2xl">
      <h1>{post.title}</h1>
      <div className="not-prose mb-6 flex flex-wrap gap-2 text-xs text-text-muted">
        {post.category && <span>{post.category.name}</span>}
        {post.tags.map((tag: (typeof post.tags)[number]) => (
          <span key={tag.id} className="rounded-md bg-surface-2 px-2 py-1">
            #{tag.name}
          </span>
        ))}
      </div>
      {/* NOTE: Phase 4 will replace this with a proper MDX/rich-text
         renderer (headings, code blocks with syntax highlighting, tables,
         images) as described in the Blog editor requirements. */}
      <div>{post.content}</div>
    </article>
  );
}
