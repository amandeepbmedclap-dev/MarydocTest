"use client";

import { Classic } from "@theme-toggles/react";
import "@theme-toggles/react/styles/classic.css";
import { toggleThemeWithTransition } from "@/lib/toggle-theme-with-transition";
import { useTheme } from "next-themes";
import { useEffect, useState, type MouseEvent } from "react";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`h-9 w-9 shrink-0 rounded-full border border-marydoc-purple/30 bg-white shadow-sm ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";
    const rect = event.currentTarget.getBoundingClientRect();

    toggleThemeWithTransition({
      nextTheme,
      setTheme,
      origin: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      },
    });
  };

  return (
    <Classic
      duration={450}
      data-theme={isDark ? "dark" : "light"}
      className={[
        "theme-toggle-classic inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[1.35rem] leading-none",
        "transition-all duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marydoc-green",
        className,
      ].join(" ")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleToggle}
    />
  );
}
