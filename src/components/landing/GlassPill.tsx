"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;
const scrollViewport = { once: false, margin: "-40px" as const };

const CAPTION_PURPLE = "#552c85";
const CAPTION_GREEN = "#188a44";
const CAPTION_MINT = "#d4f5de";

const cardVariants = {
  rest: { opacity: 1, y: 28, scale: 0.96 },
  inView: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE, staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const imageVariants = {
  rest: { opacity: 1, scale: 1.05 },
  inView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

const captionVariants = {
  rest: { opacity: 1, y: 16 },
  inView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function GlassPill() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex w-full shrink-0 items-center justify-center">
      <motion.div
        className="relative w-full"
        initial="rest"
        whileInView="inView"
        viewport={scrollViewport}
        variants={cardVariants}
      >
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[95%] w-full -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem]"
          style={{ background: "rgba(24,138,68,0.25)" }}
          variants={{
            rest: { opacity: 0.6, scale: 0.98 },
            inView: {
              opacity: 0.6,
              scale: 1,
              transition: { duration: 1, ease: EASE },
            },
          }}
          aria-hidden="true"
        />

        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="relative mx-auto w-full max-w-[min(96vw,620px)] overflow-hidden rounded-2xl border border-[#188a44]/30 bg-[#1a0f2e] shadow-[0_28px_56px_rgba(85,44,133,0.35)] sm:max-w-[580px] lg:max-w-[540px] xl:max-w-[580px] sm:rounded-[1.35rem]"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(212,245,222,0.2) 50%, transparent 65%)",
              }}
              variants={{
                rest: { opacity: 0, x: "-120%" },
                inView: {
                  opacity: [0, 0.45, 0],
                  x: ["-120%", "220%"],
                  transition: { duration: 1.05, ease: EASE, delay: 0.12 },
                },
              }}
              aria-hidden="true"
            />
            <motion.div
              className="relative h-[300px] w-full overflow-hidden bg-[#12091f] sm:h-[340px] lg:h-[380px] xl:h-[400px]"
              variants={imageVariants}
            >
              <Image
                src="/mymmjdr.webp"
                alt="Medical professional holding a patient identification card"
                fill
                className="object-contain object-center p-1 sm:p-2"
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 92vw, 580px"
                priority
                fetchPriority="high"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12091f]/40 via-transparent to-white/5"
                aria-hidden="true"
              />
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-b-2xl border-t border-[#188a44]/40 sm:rounded-b-[1.35rem]"
              style={{ backgroundColor: CAPTION_PURPLE }}
              variants={captionVariants}
            >
              <div className="relative flex gap-3 px-4 py-3 sm:gap-3.5 sm:px-5 sm:py-3.5">
                <motion.div
                  className="w-[3px] shrink-0 self-stretch rounded-full"
                  style={{
                    background: `linear-gradient(180deg, ${CAPTION_MINT} 0%, ${CAPTION_GREEN} 100%)`,
                  }}
                  variants={{
                    rest: { opacity: 1, scaleY: 0.85 },
                    inView: {
                      opacity: 1,
                      scaleY: 1,
                      transition: { duration: 0.55, ease: EASE, delay: 0.05 },
                    },
                  }}
                  aria-hidden="true"
                />

                <div className="min-w-0 flex-1">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]"
                    style={{ color: CAPTION_MINT }}
                  >
                    Trusted Care
                  </p>
                  <p className="mt-1 text-[12px] font-semibold leading-snug text-white sm:mt-1.5 sm:text-[13px]">
                    Licensed professionals at{" "}
                    <span style={{ color: CAPTION_MINT }}>your service</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
