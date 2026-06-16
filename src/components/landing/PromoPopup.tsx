"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const EASE = [0.22, 1, 0.36, 1] as const;
const SHOW_DELAY_MS = 2600;

export function PromoPopup() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const dismiss = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [mounted]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, dismiss]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="promo-backdrop"
          className="fixed inset-0 z-[220] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: EASE }}
          onClick={dismiss}
          aria-hidden={!open}
        >
          <div
            className="absolute inset-0 bg-[#552c85]/55 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-heading"
            aria-describedby="promo-description"
            className="promo-popup-card relative z-10 w-full max-w-[min(100%,860px)] overflow-hidden border border-[#552c85]/10 bg-[#faf8fc] shadow-[0_24px_64px_rgba(85,44,133,0.28)]"
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.94 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.55, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 z-30 flex h-10 w-10 cursor-pointer items-center justify-center bg-white/90 text-[#552c85] shadow-sm transition-colors hover:bg-white sm:right-4 sm:top-4"
              aria-label="Close offer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 4L12 12M12 4L4 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="flex min-h-[360px] flex-col sm:min-h-[340px] sm:flex-row md:min-h-[380px]">
              <div className="relative z-20 flex flex-1 flex-col justify-center px-7 py-9 sm:px-10 sm:py-11 md:px-12">
                <Image
                  src="/marydoc.svg"
                  alt="Marydoc"
                  width={160}
                  height={36}
                  className="h-8 w-auto sm:h-9"
                />
                <p className="mt-6 text-[14px] font-medium text-[#552c85]/80 sm:mt-7 sm:text-[15px]">
                  Your healthcare, simplified
                </p>
                <h2
                  id="promo-heading"
                  className="mt-2 max-w-[18ch] text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#552c85] sm:text-[2rem] md:text-[2.125rem]"
                >
                  Order prescriptions with ease today
                </h2>
                <p id="promo-description" className="sr-only">
                  Download the Marydoc app to manage your medications and health routine in
                  one place.
                </p>
                <a
                  href="#get-started"
                  onClick={dismiss}
                  className="mt-7 inline-flex w-fit cursor-pointer items-center justify-center rounded-full bg-marydoc-green px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_28px_rgba(24,138,68,0.35)] transition-all duration-300 hover:bg-[#157a3c] sm:mt-9 sm:px-9 sm:text-[15px]"
                >
                  Get Started
                </a>
              </div>

              <div className="promo-popup-visual relative min-h-[220px] flex-1 sm:min-h-0 sm:max-w-[48%]">
                <div
                  className="promo-popup-pills pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 sm:block"
                  aria-hidden="true"
                >
                  <span className="promo-popup-pill promo-popup-pill--1" />
                  <span className="promo-popup-pill promo-popup-pill--2" />
                  <span className="promo-popup-pill promo-popup-pill--3" />
                </div>

                <div className="promo-popup-image-mask absolute inset-0 overflow-hidden">
                  <Image
                    src="/mymmjdr.webp"
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 380px"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#552c85]/25 via-transparent to-[#188a44]/30"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
