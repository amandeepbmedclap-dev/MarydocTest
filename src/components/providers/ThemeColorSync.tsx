"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const LIGHT_THEME_COLOR = "#3a7057";
const DARK_THEME_COLOR = "#0b1812";

export function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;

    meta.setAttribute(
      "content",
      resolvedTheme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR,
    );
  }, [resolvedTheme]);

  return null;
}
