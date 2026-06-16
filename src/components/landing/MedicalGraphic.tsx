"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const TILT = -14;

export function MedicalGraphic() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative flex w-full items-center justify-center lg:-mr-2 lg:translate-y-2 xl:-mr-4 xl:translate-y-4"
      style={{ rotate: TILT }}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, x: 60, scale: 0.9, rotate: -4, filter: "blur(8px)" }
      }
      animate={{ opacity: 1, x: 0, scale: 1, rotate: TILT, filter: "blur(0px)" }}
      transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
      aria-hidden="true"
    >
      <motion.div
        className="relative"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -10, 0], rotate: [TILT, TILT - 1.5, TILT] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div
          className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px] md:blur-[60px] xl:blur-[70px]"
          style={{ background: "rgba(24,138,68,0.32)" }}
        />

        <svg
          viewBox="0 0 420 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative h-[200px] w-[190px] sm:h-[240px] sm:w-[228px] md:h-[300px] md:w-[285px] lg:h-[320px] lg:w-[304px] xl:h-[420px] xl:w-[400px]"
        >
          <defs>
            <linearGradient id="tabletFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="45%" stopColor="rgba(210,190,230,0.9)" />
              <stop offset="100%" stopColor="rgba(160,210,180,0.88)" />
            </linearGradient>
            <linearGradient id="tabletEdge" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="rgba(85,44,133,0.55)" />
              <stop offset="100%" stopColor="rgba(24,138,68,0.45)" />
            </linearGradient>
            <linearGradient id="barrelGlass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
              <stop offset="35%" stopColor="rgba(200,220,255,0.35)" />
              <stop offset="100%" stopColor="rgba(85,44,133,0.25)" />
            </linearGradient>
            <linearGradient id="liquidFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(85,44,133,0.75)" />
              <stop offset="55%" stopColor="rgba(24,138,68,0.85)" />
              <stop offset="100%" stopColor="rgba(120,210,150,0.9)" />
            </linearGradient>
            <linearGradient id="plungerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="100%" stopColor="rgba(220,220,230,0.85)" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="rgba(40,20,60,0.35)" />
            </filter>
          </defs>

          {/* Medicine tablet */}
          <g filter="url(#softShadow)" transform="translate(18 248) rotate(-18)">
            <ellipse cx="92" cy="78" rx="88" ry="34" fill="url(#tabletEdge)" />
            <ellipse cx="92" cy="72" rx="88" ry="34" fill="url(#tabletFace)" />
            <ellipse
              cx="72"
              cy="58"
              rx="42"
              ry="14"
              fill="rgba(255,255,255,0.55)"
            />
            <line
              x1="92"
              y1="52"
              x2="92"
              y2="92"
              stroke="rgba(85,44,133,0.35)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="52"
              y1="72"
              x2="132"
              y2="72"
              stroke="rgba(85,44,133,0.28)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Syringe */}
          <g filter="url(#softShadow)" transform="translate(88 36) rotate(32)">
            {/* Plunger rod */}
            <rect x="8" y="58" width="118" height="10" rx="5" fill="url(#plungerGrad)" />
            <rect x="118" y="52" width="28" height="22" rx="6" fill="rgba(240,240,245,0.95)" />
            <rect x="124" y="56" width="16" height="14" rx="4" fill="rgba(85,44,133,0.2)" />

            {/* Barrel */}
            <rect x="136" y="48" width="148" height="30" rx="8" fill="url(#barrelGlass)" />
            <rect
              x="142"
              y="54"
              width="118"
              height="18"
              rx="6"
              fill="url(#liquidFill)"
            />
            <rect
              x="142"
              y="54"
              width="48"
              height="8"
              rx="4"
              fill="rgba(255,255,255,0.35)"
            />

            {/* Finger grips */}
            <rect x="176" y="78" width="18" height="10" rx="3" fill="rgba(255,255,255,0.7)" />
            <rect x="208" y="78" width="18" height="10" rx="3" fill="rgba(255,255,255,0.7)" />

            {/* Needle hub & needle */}
            <rect x="280" y="58" width="22" height="12" rx="4" fill="rgba(210,210,220,0.95)" />
            <rect x="300" y="62" width="72" height="4" rx="2" fill="rgba(200,205,215,0.95)" />
            <rect x="368" y="61" width="14" height="6" rx="1.5" fill="rgba(180,185,195,0.9)" />

            {/* Barrel highlights */}
            <rect x="140" y="50" width="90" height="6" rx="3" fill="rgba(255,255,255,0.45)" />
            <rect x="250" y="50" width="28" height="26" rx="6" fill="rgba(255,255,255,0.12)" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}
