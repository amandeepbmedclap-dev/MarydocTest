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
    <>
      <Header />
      <main id="main-content" className="relative overflow-x-clip">
        <div className="relative min-h-[calc(100dvh-60px)] overflow-visible sm:min-h-[calc(100dvh-68px)] lg:min-h-[calc(100vh-80px)]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: heroGradient }}
            aria-hidden="true"
          />
          <Hero />
        </div>
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
