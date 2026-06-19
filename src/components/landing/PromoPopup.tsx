"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

const SHOW_DELAY_AFTER_READY_MS = 2000;

function schedulePromoAfterAppReady(onReady: () => void) {
  let popupTimer: number | undefined;
  let fallbackTimer: number | undefined;
  let observer: MutationObserver | undefined;

  const startDelay = () => {
    popupTimer = window.setTimeout(onReady, SHOW_DELAY_AFTER_READY_MS);
  };

  if (document.documentElement.dataset.appReady === "true") {
    startDelay();
  } else {
    observer = new MutationObserver(() => {
      if (document.documentElement.dataset.appReady !== "true") return;
      observer?.disconnect();
      startDelay();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-app-ready"],
    });

    fallbackTimer = window.setTimeout(() => {
      observer?.disconnect();
      if (popupTimer) return;
      startDelay();
    }, 12000);
  }

  return () => {
    observer?.disconnect();
    if (fallbackTimer) window.clearTimeout(fallbackTimer);
    if (popupTimer) window.clearTimeout(popupTimer);
  };
}

export function PromoPopup() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dismiss = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    return schedulePromoAfterAppReady(() => setOpen(true));
  }, [mounted]);

  useEffect(() => {
    const onCloseScrollLock = () => dismiss();
    window.addEventListener("marydoc:close-scroll-lock", onCloseScrollLock);
    return () => window.removeEventListener("marydoc:close-scroll-lock", onCloseScrollLock);
  }, [dismiss]);

  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        aria-labelledby="promo-heading"
        aria-describedby="promo-description"
        className="max-w-[min(100%,860px)] gap-0 overflow-hidden rounded-none border border-border bg-elevated p-0 ring-0 duration-300 sm:max-w-[min(100%,860px)] data-open:slide-in-from-bottom-6 data-closed:slide-out-to-bottom-4 dark:shadow-black/40"
      >
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon"
              className="promo-popup-close absolute right-3 top-3 z-30 h-10 w-10 rounded-none border border-marydoc-purple/25 bg-white shadow-md hover:border-marydoc-purple/45 hover:shadow-lg sm:right-4 sm:top-4 dark:border-white/20 dark:bg-surface/95 dark:hover:border-white/35"
              aria-label="Close offer"
            />
          }
        >
          <X className="size-4 text-marydoc-purple dark:text-marydoc-mint" />
        </DialogClose>

        <div className="flex min-h-[360px] flex-col sm:min-h-[340px] sm:flex-row md:min-h-[380px]">
          <div className="relative z-20 flex flex-1 flex-col justify-center px-7 py-9 sm:px-10 sm:py-11 md:px-12">
            <Image
              src="/marydoc.svg"
              alt="Marydoc"
              width={160}
              height={36}
              priority
              className="h-8 w-auto sm:h-9"
            />
            <p className="mt-6 text-[14px] font-medium text-muted-foreground sm:mt-7 sm:text-[15px]">
              Your healthcare, simplified
            </p>
            <h2
              id="promo-heading"
              className="mt-2 max-w-[18ch] text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-surface-foreground sm:text-[2rem] md:text-[2.125rem]"
            >
              Order prescriptions with ease today
            </h2>
            <p id="promo-description" className="sr-only">
              Download the Marydoc app to manage your medications and health routine in
              one place.
            </p>
            <Button
              render={<a href="#get-started" onClick={dismiss} />}
              className="mt-7 h-auto w-fit rounded-full bg-marydoc-green px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_28px_rgba(24,138,68,0.35)] hover:bg-[#157a3c] sm:mt-9 sm:px-9 sm:text-[15px]"
            >
              Get Started
            </Button>
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
      </DialogContent>
    </Dialog>
  );
}
