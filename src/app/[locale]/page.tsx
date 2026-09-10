import Link from "next/link";
import { db } from "@/lib/db";
import { buttonClasses } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;

  const [hasProjects, profile, settings] = await Promise.all([
    db.project.count().then((c: number) => c > 0),
    db.profile.findFirst(),
    db.siteSettings.findUnique({ where: { id: "singleton" } }),
  ]);

  return (
    <section className="flex flex-col items-center gap-6 py-20 text-center">
      <span className="rounded-full border border-border bg-surface px-4 py-1 text-xs text-text-muted">
        {profile?.title ?? t.home.subtitle}
      </span>

      <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
        {profile?.displayName ?? t.home.title}
      </h1>

      {profile?.shortBio && (
        <p className="max-w-xl text-text-muted">{profile.shortBio}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {hasProjects && (
          <Link href={`/${locale}/projects`} className={buttonClasses("primary")}>
            {t.home.exploreWork}
          </Link>
        )}
        <Link href={`/${locale}/blog`} className={buttonClasses("secondary")}>
          {t.home.readBlog}
        </Link>
        <Link href={`/${locale}/contact`} className={buttonClasses("ghost")}>
          {t.home.contactMe}
        </Link>
        {settings?.cvUrl && (
          <a href={settings.cvUrl} className="text-sm text-accent underline">
            {t.common.downloadCv}
          </a>
        )}
      </div>
    </section>
  );
}
