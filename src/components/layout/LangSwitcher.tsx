"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(locale: Locale) {
    const rest = pathname.split("/").slice(2).join("/");
    router.push(`/${locale}/${rest}`);
  }

  return (
    <div className="flex items-center gap-1 rounded-md border border-border p-1 text-xs">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-pressed={current === l}
          className={`rounded px-2 py-1 transition-colors ${
            current === l ? "bg-accent text-bg" : "text-text-muted hover:text-text"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
