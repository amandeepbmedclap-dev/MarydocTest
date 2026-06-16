"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

const SPRING = { type: "spring" as const, stiffness: 220, damping: 28, mass: 0.85 };

type AnimatedPlayButtonProps = {
  onClick?: () => void;
  ariaLabel?: string;
  size?: "md" | "lg";
  asButton?: boolean;
};

export function AnimatedPlayButton({
  onClick,
  ariaLabel,
  size = "md",
  asButton = false,
}: AnimatedPlayButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const ringPathId = useId().replace(/:/g, "");
  const ringText = "PLAY • PLAY • PLAY • ";

  const shellClass =
    size === "lg"
      ? "relative z-10 flex h-[64px] w-[64px] items-center justify-center sm:h-[80px] sm:w-[80px] md:h-[96px] md:w-[96px] lg:h-[112px] lg:w-[112px]"
      : "relative z-10 flex h-[56px] w-[56px] items-center justify-center sm:h-[68px] sm:w-[68px] md:h-[80px] md:w-[80px] lg:h-[96px] lg:w-[96px]";

  const innerClass =
    size === "lg"
      ? "relative flex h-11 w-11 items-center justify-center rounded-full shadow-[0_10px_32px_rgba(24,138,68,0.5)] ring-2 ring-white/30 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
      : "relative flex h-9 w-9 items-center justify-center rounded-full shadow-[0_8px_24px_rgba(24,138,68,0.45)] ring-2 ring-white/25 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14";

  const content = (
    <>
      <motion.span
        className="pointer-events-none absolute inset-1 rounded-full border border-marydoc-green/55"
        animate={
          prefersReducedMotion ? undefined : { scale: [1, 1.18, 1], opacity: [0.55, 0, 0.55] }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full border border-marydoc-purple/35"
        animate={
          prefersReducedMotion ? undefined : { scale: [1, 1.32, 1], opacity: [0.45, 0, 0.45] }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full bg-white/10"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <defs>
            <path
              id={ringPathId}
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            />
          </defs>
          <text
            fill="white"
            fontSize="8.25"
            fontWeight="700"
            letterSpacing="2.8"
            style={{ textTransform: "uppercase" }}
          >
            <textPath href={`#${ringPathId}`} startOffset="0%">
              {ringText}
              {ringText}
            </textPath>
          </text>
        </svg>
      </motion.div>
      <motion.div
        className={innerClass}
        style={{ background: "linear-gradient(145deg, #188a44 0%, #157a3c 55%, #552c85 100%)" }}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
        transition={SPRING}
      >
        <svg
          className={size === "lg" ? "h-[22px] w-[22px]" : "h-4 w-4 sm:h-[18px] sm:w-[18px]"}
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden="true"
        >
          <path d="M8 5.5L17 11L8 16.5V5.5Z" fill="white" />
        </svg>
      </motion.div>
    </>
  );

  if (asButton) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        className={`${shellClass} cursor-pointer`}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
        transition={SPRING}
        aria-label={ariaLabel}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.div
      className={shellClass}
      aria-hidden="true"
      whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
      transition={SPRING}
    >
      {content}
    </motion.div>
  );
}
