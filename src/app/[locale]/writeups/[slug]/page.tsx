import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import type { Locale } from "@/i18n/config";

export default async function WriteupDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { slug } = await params;
  const writeup = await db.writeup.findUnique({
    where: { slug },
    include: { tags: true },
  });

  if (!writeup || writeup.status !== "PUBLISHED") notFound();

  return (
    <article className="prose prose-invert mx-auto max-w-2xl">
      <h1>{writeup.title}</h1>
      <div className="not-prose mb-6 flex flex-wrap gap-2 text-xs text-text-muted">
        <span>{writeup.type.replace("_", " ")}</span>
        {writeup.tags.map((tag: (typeof writeup.tags)[number]) => (
          <span key={tag.id} className="rounded-md bg-surface-2 px-2 py-1">
            #{tag.name}
          </span>
        ))}
      </div>
      {/* Phase 4 will render this via the same rich-text renderer as Blog. */}
      <div>{writeup.content}</div>
    </article>
  );
}
