"use client";

import { scrollToHeroSection } from "@/lib/scroll-to-hero";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

type EvaluationFormContextValue = {
  isFormOpen: boolean;
  isTransitioning: boolean;
  openForm: () => void;
  closeForm: () => void;
};

const EvaluationFormContext = createContext<EvaluationFormContextValue | null>(null);

export function useEvaluationForm() {
  const context = useContext(EvaluationFormContext);
  if (!context) {
    throw new Error("useEvaluationForm must be used within EvaluationFormProvider");
  }
  return context;
}

export function EvaluationFormProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const openForm = useCallback(async () => {
    setIsTransitioning(true);
    setIsFormOpen(false);

    try {
      await scrollToHeroSection(Boolean(prefersReducedMotion));
      setIsFormOpen(true);
    } finally {
      setIsTransitioning(false);
    }
  }, [prefersReducedMotion]);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setIsTransitioning(false);
  }, []);

  const value = useMemo(
    () => ({ isFormOpen, isTransitioning, openForm, closeForm }),
    [isFormOpen, isTransitioning, openForm, closeForm],
  );

  return (
    <EvaluationFormContext.Provider value={value}>{children}</EvaluationFormContext.Provider>
  );
}
