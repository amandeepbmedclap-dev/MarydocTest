import dynamic from "next/dynamic";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Footer } from "@/components/landing/Footer";
import { HeroWaveDivider } from "@/components/landing/HeroWaveDivider";
import { PromoPopup } from "@/components/landing/PromoPopup";
import { LoadingAnimation } from "@/components/landing/LoadingAnimation";
import { EvaluationFormProvider } from "@/components/landing/EvaluationFormProvider";
import { PreFooterFormCTA } from "@/components/landing/PreFooterFormCTA";

const Testimonials = dynamic(
  () => import("@/components/landing/Testimonials").then((mod) => mod.Testimonials),
  {
    loading: () => (
      <section aria-label="Loading testimonials" className="min-h-[60vh] bg-surface">
        <LoadingAnimation className="min-h-[60vh] w-full" compact />
      </section>
    ),
  },
);

export default function Home() {
  return (
    <EvaluationFormProvider>
      <main id="main-content" className="relative overflow-x-clip">
        <div className="relative overflow-visible">
          <div
            className="pointer-events-none absolute inset-0 bg-hero"
            aria-hidden="true"
          />
          <Header />
          <Hero />
          <HeroWaveDivider />
        </div>
        <Testimonials />
        <PreFooterFormCTA />
        <Footer />
        <PromoPopup />
      </main>
    </EvaluationFormProvider>
  );
}
