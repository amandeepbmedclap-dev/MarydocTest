"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { LoadingAnimation } from "./LoadingAnimation";

declare global {
  interface Window {
    __MARYDOC_LOADER_START__?: number;
  }
}

const LOADER_TOTAL_MS = 3600;
const FADE_MS = 500;
const LOADER_ID = "initial-load-screen";

function getLoaderStartMs() {
  if (typeof window === "undefined") return Date.now();
  return window.__MARYDOC_LOADER_START__ ?? Date.now();
}

export function InitialLoadScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [enhancedVisible, setEnhancedVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const overlay = document.getElementById(LOADER_ID);

    if (prefersReducedMotion) {
      document.documentElement.dataset.appReady = "true";
      overlay?.remove();
      setRemoved(true);
      return;
    }

    const startedAt = getLoaderStartMs();
    let hideTimer: number | undefined;
    let revealTimer: number | undefined;

    const finish = () => {
      setFadeOut(true);
      revealTimer = window.setTimeout(() => {
        document.documentElement.dataset.appReady = "true";
        overlay?.remove();
        setRemoved(true);
      }, FADE_MS);
    };

    const elapsed = Date.now() - startedAt;
    const wait = Math.max(0, LOADER_TOTAL_MS - elapsed);
    hideTimer = window.setTimeout(finish, wait);

    const fallbackTimer = window.setTimeout(finish, LOADER_TOTAL_MS + 2000);

    return () => {
      if (hideTimer) window.clearTimeout(hideTimer);
      if (revealTimer) window.clearTimeout(revealTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [mounted, prefersReducedMotion]);

  useEffect(() => {
    if (!mounted || !enhancedVisible) return;

    const overlay = document.getElementById(LOADER_ID);
    const fallback = overlay?.querySelector(".initial-load-fallback");
    fallback?.classList.add("initial-load-fallback--hidden");
  }, [mounted, enhancedVisible]);

  if (!mounted || removed) return null;

  const overlay = document.getElementById(LOADER_ID);
  if (!overlay) return null;

  return createPortal(
    <div
      className={`initial-load-enhanced absolute inset-0 flex items-center justify-center bg-white transition-opacity duration-500 ease-out ${
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={fadeOut}
    >
      <LoadingAnimation onVisible={() => setEnhancedVisible(true)} />
    </div>,
    overlay,
  );
}
