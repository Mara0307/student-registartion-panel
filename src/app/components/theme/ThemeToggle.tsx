"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const systemTheme = getSystemTheme();

    const initial: Theme =
      stored === "light" || stored === "dark" ? stored : systemTheme;

    document.documentElement.dataset.theme = initial;
    // Defer state update to avoid eslint "setState in effect" rule.
    window.requestAnimationFrame(() => setTheme(initial));
  }, []);

  const handleToggle = () => {
    if (!theme) return;
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.dataset.theme = next;
  };

  if (!theme) {
    return (
      <div className="fixed right-4 top-4 z-50">
        <button
          disabled
          className="rounded-xl border border-[var(--border-color)] bg-[var(--button-bg)] px-4 py-2 text-[var(--button-fg)] opacity-60"
        >
          Theme
        </button>
      </div>
    );
  }

  return (
    <div className="fixed right-4 top-4 z-50">
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={theme === "dark"}
        className="rounded-xl border border-[var(--border-color)] bg-[var(--button-bg)] px-4 py-2 text-[var(--button-fg)]"
      >
        Switch to {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}

