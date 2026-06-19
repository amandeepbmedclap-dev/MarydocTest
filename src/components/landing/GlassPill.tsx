"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { EvaluationForm } from "./EvaluationForm";
import { useEvaluationForm } from "./EvaluationFormProvider";

const EASE = [0.22, 1, 0.36, 1] as const;
const scrollViewport = { once: true, margin: "-40px" as const };

const cardVariants = {
  rest: { opacity: 0.92, y: 32, rotateY: -14, rotateX: 8, scale: 0.94 },
  inView: {
    opacity: 1,
    y: 0,
    rotateY: -6,
    rotateX: 4,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

export function GlassPill() {
  const prefersReducedMotion = useReducedMotion();
  const { isFormOpen } = useEvaluationForm();

  return (
    <div
      id="hero-evaluation"
      className="hero-card-showcase relative flex w-full shrink-0 flex-col items-center justify-center scroll-mt-28"
    >
      <AnimatePresence>
        {!isFormOpen && (
          <motion.div
            className="hero-card-showcase__glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(72vw,420px)] w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isFormOpen && (
          <motion.div
            className="hero-card-showcase__ring pointer-events-none absolute left-1/2 top-[46%] -z-10 h-[min(78vw,440px)] w-[min(96vw,580px)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem]"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: EASE }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="hero-card-showcase__stage relative w-full"
        style={{ perspective: "1400px" }}
        initial="rest"
        whileInView="inView"
        viewport={scrollViewport}
        variants={cardVariants}
        animate={{
          maxWidth: isFormOpen ? "min(96vw, 480px)" : "min(96vw, 640px)",
        }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <motion.div
          animate={
            prefersReducedMotion || isFormOpen
              ? { y: 0 }
              : { y: [0, -12, 0] }
          }
          transition={{ duration: 5, repeat: isFormOpen ? 0 : Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="hero-card-showcase__card relative mx-auto w-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              rotateY: isFormOpen ? 0 : prefersReducedMotion ? 0 : -6,
              rotateX: isFormOpen ? 0 : prefersReducedMotion ? 0 : 4,
            }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <motion.div
              className="hero-card-showcase__flip relative w-full"
              style={{ transformStyle: "preserve-3d" }}
              animate={{
                minHeight: isFormOpen ? 460 : prefersReducedMotion ? 280 : 300,
              }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {!isFormOpen ? (
                  <motion.div
                    key="hero-card"
                    className="hero-card-showcase__face hero-card-showcase__face--card"
                    initial={{ rotateY: 0, opacity: 1 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{
                      rotateY: prefersReducedMotion ? 0 : 90,
                      opacity: 0,
                      scale: prefersReducedMotion ? 1 : 0.92,
                    }}
                    transition={{ duration: prefersReducedMotion ? 0.2 : 0.65, ease: EASE }}
                  >
                    <div className="hero-card-showcase__image-wrap relative aspect-[1764/1142] w-full">
                      <Image
                        src="/image.png"
                        alt="Texas medical marijuana card for Suzanne Joseph with issue, expiry, and date of birth"
                        fill
                        sizes="(max-width: 1024px) 92vw, 640px"
                        className="hero-card-showcase__image object-contain"
                        priority
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="hero-form"
                    className="hero-card-showcase__face hero-card-showcase__face--form"
                    initial={{
                      rotateY: prefersReducedMotion ? 0 : -90,
                      opacity: 0,
                      scale: prefersReducedMotion ? 1 : 0.92,
                    }}
                    animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                    exit={{
                      rotateY: prefersReducedMotion ? 0 : -90,
                      opacity: 0,
                    }}
                    transition={{ duration: prefersReducedMotion ? 0.2 : 0.65, ease: EASE }}
                  >
                    <EvaluationForm />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {!isFormOpen && (
              <motion.div
                className="hero-card-showcase__reflection"
                aria-hidden="true"
                initial={{ opacity: 0.85 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {!isFormOpen && (
          <motion.ul
            className="hero-card-showcase__meta mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mt-8 sm:gap-x-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {["Licensed providers", "Fast approval", "Secure & compliant"].map((item) => (
              <li key={item} className="hero-card-showcase__meta-item">
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
