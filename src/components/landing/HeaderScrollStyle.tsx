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
      className={`site-header sticky top-0 z-[100] w-full border-0 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        scrolled
          ? "border-b border-marydoc-green/20 bg-white/95 shadow-sm"
          : "bg-transparent"
      }`}
    >
      {children}
    </header>
  );
}
