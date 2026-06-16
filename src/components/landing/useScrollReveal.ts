"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type ScrollRevealOptions = {
  margin?: string;
  amount?: number;
};

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: (options.margin ?? "-40px") as `${number}px`,
    amount: options.amount ?? 0.15,
  });
  const [cycle, setCycle] = useState(0);
  const wasInView = useRef(false);

  useEffect(() => {
    if (isInView && !wasInView.current) {
      setCycle((current) => current + 1);
    }
    wasInView.current = isInView;
  }, [isInView]);

  return { ref, cycle, isInView, isActive: cycle > 0 };
}
