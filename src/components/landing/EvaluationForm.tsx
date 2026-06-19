"use client";

import { useEvaluationForm } from "./EvaluationFormProvider";
import { FormEvent, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function EvaluationForm() {
  const { closeForm } = useEvaluationForm();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [wantsUpdates, setWantsUpdates] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!acceptedTerms) return;
    // Placeholder — wire to backend when available
  };

  return (
    <form
      className="flex flex-col gap-[1.15rem] rounded-[1.35rem] bg-card p-[1.35rem] pb-[1.25rem] text-card-foreground shadow-[0_28px_56px_rgba(17,8,32,0.22),0_0_0_1px_rgba(85,44,133,0.06)] sm:p-6 sm:pb-[1.35rem]"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-[1.35rem] font-bold leading-tight tracking-[-0.02em] text-primary">
          Book evaluation
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={closeForm}
          aria-label="Close form"
          className="text-muted-foreground hover:text-primary"
        >
          <X className="size-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-[1.1rem] sm:grid-cols-2">
        <div className="flex flex-col gap-[0.35rem]">
          <Label htmlFor="eval-full-name" className="text-[0.8125rem] font-semibold text-foreground">
            Full name
          </Label>
          <Input
            id="eval-full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="As shown on ID"
            required
            className="h-auto rounded-[0.65rem] border-[1.5px] bg-elevated px-3 py-[0.6rem] text-[0.9375rem] font-medium"
          />
        </div>

        <div className="flex flex-col gap-[0.35rem]">
          <Label htmlFor="eval-email" className="text-[0.8125rem] font-semibold text-foreground">
            Email
          </Label>
          <Input
            id="eval-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            required
            className="h-auto rounded-[0.65rem] border-[1.5px] bg-elevated px-3 py-[0.6rem] text-[0.9375rem] font-medium"
          />
        </div>

        <div className="flex flex-col gap-[0.35rem] sm:col-span-2">
          <Label htmlFor="eval-phone" className="text-[0.8125rem] font-semibold text-foreground">
            Phone number
          </Label>
          <Input
            id="eval-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="For appointment confirmation"
            required
            className="h-auto rounded-[0.65rem] border-[1.5px] bg-elevated px-3 py-[0.6rem] text-[0.9375rem] font-medium"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-[0.15rem]">
        <div className="flex items-center gap-2">
          <Checkbox
            id="eval-terms"
            name="terms"
            checked={acceptedTerms}
            onCheckedChange={setAcceptedTerms}
            required
            className="border-[1.5px]"
          />
          <Label htmlFor="eval-terms" className="text-[0.8125rem] font-normal text-foreground">
            I accept the{" "}
            <a href="#terms" className="font-semibold text-secondary hover:underline">
              Terms &amp; Conditions
            </a>
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="eval-updates"
            name="updatesOptIn"
            checked={wantsUpdates}
            onCheckedChange={setWantsUpdates}
            className="border-[1.5px]"
          />
          <Label htmlFor="eval-updates" className="text-[0.8125rem] font-normal text-foreground">
            Send me helpful updates (optional)
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        className="h-auto w-full gap-2 rounded-[0.85rem] bg-marydoc-green px-4 py-[0.9rem] text-[0.9375rem] font-semibold text-white hover:bg-[#157a3c]"
      >
        Continue
        <ArrowRight className="size-[1.1rem]" />
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Evaluation from <strong className="font-bold text-secondary">$55</strong> · HIPAA
        compliant
      </p>
    </form>
  );
}
