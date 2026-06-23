"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const MARK_VIEWBOX = "0 0 192 192";

const FIGURE_PATHS = [
  {
    d: "M100.57,79.73c-1.44-1.15-3-2.15-4.68-3.02-5.34-2.78-11.87-4.16-19.59-4.16-.99,0-1.96.02-2.91.08-3.98.19-7.64.8-10.95,1.84-3.89,1.2-7.32,2.97-10.29,5.32-6.12,4.83-9.19,12.23-9.19,22.2v58.89h10.95v-57.79c0-8.78,2.84-14.83,8.53-18.15,2.91-1.69,6.56-2.68,10.95-2.95.82-.05,1.67-.07,2.54-.07,4.4,0,8.17.6,11.3,1.8,3.76,1.42,6.6,3.72,8.5,6.87,1.91-3.27,4.78-5.61,8.62-7.02-1.09-1.43-2.35-2.71-3.78-3.84Z",
    delay: 0.75,
  },
  {
    d: "M109.64,101.99v47.31c0,6.03-4.93,11.21-10.95,11.5h0c-.95.06-1.92.08-2.91.08s-1.96-.02-2.91-.08h0c-6.13-.28-10.95-5.33-10.95-11.47v-47.34c0-.99.03-1.96.1-2.9.39-6.25,2.13-11.37,5.21-15.37,3.76,1.42,6.6,3.72,8.5,6.87-1.91,3.25-2.86,7.42-2.86,12.5v45.85c0,1.41,1.13,2.55,2.53,2.57.24,0,.49,0,.74,0h0c1.4,0,2.55-1.15,2.55-2.55v-45.87c0-5.08-.98-9.25-2.96-12.5,1.91-3.27,4.78-5.61,8.62-7.02,3.07,4.01,4.8,9.19,5.19,15.52.07.94.1,1.91.1,2.9Z",
    delay: 0.95,
  },
  {
    d: "M139.53,79.73c-6.05-4.79-14.14-7.18-24.28-7.18-7.56,0-14.01,1.39-19.36,4.16-1.71.88-3.3,1.91-4.79,3.08-1.47,1.16-2.76,2.47-3.87,3.93,3.76,1.42,6.6,3.72,8.5,6.87,1.91-3.27,4.78-5.61,8.62-7.02,2.95-1.1,6.46-1.65,10.54-1.65,1.13,0,2.22.04,3.27.12,3.93.29,7.26,1.14,10,2.55,6.32,3.22,9.48,9.39,9.48,18.5v57.79h10.95v-58.89c0-10.05-3.02-17.48-9.06-22.26Z",
    delay: 1.15,
  },
];

const SPARKLES = [
  { left: 36, drift: -36, delay: 0 },
  { left: 64, drift: 36, delay: 0.4 },
  { left: 50, drift: -48, delay: 0.8 },
];

type LoadingAnimationProps = {
  className?: string;
  compact?: boolean;
  onVisible?: () => void;
};

export function LoadingAnimation({ className = "", compact = false, onVisible }: LoadingAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const canvas = compact ? "h-24 w-24" : "h-32 w-32 sm:h-36 sm:w-36";
  const logoClass = compact ? "h-7" : "h-8 sm:h-9";
  const drawDuration = prefersReducedMotion ? 0.01 : 2;
  const drawEase = prefersReducedMotion ? "linear" : "easeInOut";

  useEffect(() => {
    onVisible?.();
  }, [onVisible]);

  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Marydoc"
    >
      <div className={`flex flex-col items-center ${compact ? "gap-4" : "gap-6 sm:gap-7"}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 1, ease: EASE }}
          className={`relative ${canvas}`}
        >
          <svg viewBox={MARK_VIEWBOX} className="h-full w-full" fill="none" aria-hidden="true">
            <motion.circle
              cx="95.77"
              cy="95.77"
              r="92"
              stroke="#3a7057"
              strokeWidth="2.2"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: drawDuration, ease: drawEase }}
            />

            <motion.circle
              cx="76.3"
              cy="47.3"
              r="14"
              stroke="#58af91"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1.5,
                delay: prefersReducedMotion ? 0 : 0.45,
                ease: drawEase,
              }}
            />
            <motion.circle
              cx="117.91"
              cy="47.3"
              r="14"
              stroke="#58af91"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1.5,
                delay: prefersReducedMotion ? 0 : 0.55,
                ease: drawEase,
              }}
            />

            {FIGURE_PATHS.map((path) => (
              <motion.path
                key={path.d.slice(0, 24)}
                d={path.d}
                stroke="#3a7057"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 1.8,
                  delay: prefersReducedMotion ? 0 : path.delay,
                  ease: drawEase,
                }}
              />
            ))}
          </svg>

          {SPARKLES.map((sparkle, index) => (
            <motion.div
              key={index}
              className="absolute h-1 w-1 rounded-full bg-[#58af91]"
              style={{ left: `${sparkle.left}%`, top: "18%" }}
              animate={
                prefersReducedMotion
                  ? { opacity: 0.35 }
                  : {
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.85, 0],
                      x: [0, sparkle.drift * 0.65, sparkle.drift],
                      y: [0, -36, -72],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : {
                      duration: 2,
                      repeat: Infinity,
                      delay: sparkle.delay,
                      ease: "easeOut",
                    }
              }
              aria-hidden="true"
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 1,
            delay: prefersReducedMotion ? 0 : 1,
          }}
        >
          <Image
            src="/marydoc.svg"
            alt="Marydoc"
            width={168}
            height={38}
            className={`${logoClass} w-auto opacity-80`}
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
