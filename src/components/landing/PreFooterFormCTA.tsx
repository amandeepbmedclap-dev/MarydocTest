"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, CircleDollarSign, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEvaluationForm } from "./EvaluationFormProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

const features = [
  { label: "Licensed physicians", Icon: CheckCircle2 },
  { label: "HIPAA secure", Icon: ShieldCheck },
  { label: "Starts at $55", Icon: CircleDollarSign },
];

export function PreFooterFormCTA() {
  const { openForm, isTransitioning } = useEvaluationForm();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="book-evaluation"
      aria-labelledby="book-evaluation-heading"
      className="book-evaluation-cta relative z-10 scroll-mt-24"
    >
      <div className="book-evaluation-cta__ambient pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[920px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          className="book-evaluation-cta__panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="book-evaluation-cta__accent" aria-hidden="true" />

          <div className="book-evaluation-cta__content">
            <p className="book-evaluation-cta__eyebrow">Secure online evaluation</p>

            <h2 id="book-evaluation-heading" className="book-evaluation-cta__title">
              Ready to get your{" "}
              <span className="book-evaluation-cta__title-accent">medical card?</span>
            </h2>

            <p className="book-evaluation-cta__description">
              Complete a quick evaluation with licensed providers and take the next step toward
              your Texas MMJ card — simple, private, and guided.
            </p>

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-[0.65rem] p-0">
              {features.map(({ label, Icon }, index) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.08 + index * 0.06 }}
                >
                  <Badge
                    variant="outline"
                    className="h-auto gap-[0.45rem] rounded-full border-border bg-elevated px-[0.85rem] py-[0.45rem] text-xs font-semibold text-surface-foreground"
                  >
                    <Icon
                      aria-hidden="true"
                      className="!size-4 text-marydoc-green dark:text-marydoc-mint"
                    />
                    {label}
                  </Badge>
                </motion.li>
              ))}
            </ul>

            <motion.button
              type="button"
              onClick={openForm}
              disabled={isTransitioning}
              className={cn(
                buttonVariants(),
                "mt-6 h-auto gap-[0.55rem] rounded-full bg-gradient-to-br from-marydoc-green to-[#4b957b] px-7 py-[0.9rem] text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white hover:shadow-[0_14px_32px_rgba(88,175,145,0.36)] disabled:cursor-wait disabled:opacity-75",
              )}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -1 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {isTransitioning ? "Opening form…" : "Fill the form"}
              {!isTransitioning && (
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 11H3a1 1 0 1 1 0-2h11.586l-4.293-4.293a1 1 0 0 1 0-1.414Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
