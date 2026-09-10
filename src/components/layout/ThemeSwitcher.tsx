"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme | null) ?? "system";
    setTheme(stored);
    applyTheme(stored);
  }, []);

  function applyTheme(value: Theme) {
    const root = document.documentElement;
    const resolved =
      value === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : value;
    root.setAttribute("data-theme", resolved);
  }

  function handleChange(value: Theme) {
    setTheme(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
  }

  return (
    <div className="flex items-center gap-1 rounded-md border border-border p-1 text-xs">
      {(["dark", "light", "system"] as Theme[]).map((t) => (
        <button
          key={t}
          onClick={() => handleChange(t)}
          aria-pressed={theme === t}
          className={`rounded px-2 py-1 transition-colors ${
            theme === t ? "bg-accent text-bg" : "text-text-muted hover:text-text"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
