"use client";

import { useEffect, useState } from "react";

export function HeaderScrollStyle({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={[
        "group/site-header site-header sticky top-0 z-[100] w-full border-0 pt-[env(safe-area-inset-top)]",
        "transition-all duration-300 ease-out",
        scrolled
          ? "border-b border-border/70 bg-white/90 shadow-sm shadow-marydoc-purple/5 backdrop-blur-xl dark:border-white/10 dark:bg-surface/90 dark:shadow-black/25"
          : "bg-transparent shadow-none",
      ].join(" ")}
    >
      {children}
    </header>
  );
}
