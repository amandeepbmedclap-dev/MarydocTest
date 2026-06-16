import dynamic from "next/dynamic";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Footer } from "@/components/landing/Footer";

const Testimonials = dynamic(
  () => import("@/components/landing/Testimonials").then((mod) => mod.Testimonials),
  {
    loading: () => <section aria-hidden className="min-h-[60vh] bg-white" />,
  },
);

export const heroGradient = "var(--marydoc-gradient)";

export default function Home() {
  return (
    <main id="main-content" className="relative overflow-x-clip">
      <div className="relative min-h-[100dvh] overflow-visible">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              "linear-gradient(180deg, #552c85 0px, #552c85 80px, transparent 160px)",
              heroGradient,
            ].join(", "),
          }}
          aria-hidden="true"
        />
        <Header />
        <Hero />
      </div>
      <Testimonials />
      <Footer />
    </main>
  );
}
