import { GlassPill } from "./GlassPill";
import { Button } from "@/components/ui/button";

const headlineLines = [
  { text: "Optimize Your Health", accent: false },
  { text: "Care: Easily Order", accent: false },
  { text: "Prescription", accent: false },
  { text: "Medications!", accent: true },
];

export function Hero() {
  return (
    <section
      id="about"
      aria-labelledby="hero-heading"
      className="relative min-h-[calc(100dvh-60px)] overflow-visible scroll-mt-24 sm:min-h-[calc(100dvh-68px)] lg:min-h-[calc(100vh-80px)]"
    >
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(24,138,68,0.45) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-1/4 h-80 w-80 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(85,44,133,0.5) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(100dvh-60px)] w-full min-w-0 max-w-[1440px] flex-col px-4 pb-16 pt-6 sm:min-h-[calc(100dvh-68px)] sm:px-6 sm:pb-[4.5rem] sm:pt-8 md:px-8 lg:min-h-[calc(100vh-80px)] lg:flex-row lg:items-center lg:px-10 lg:pb-8 lg:pt-10 xl:px-14 2xl:px-16">
        <div className="flex w-full min-w-0 max-w-full flex-col justify-center pt-2 sm:pt-4 md:max-w-[560px] lg:order-1 lg:w-[54%] lg:max-w-[54%] lg:shrink-0 lg:py-0 lg:pr-4 xl:pr-6">
          <div className="w-full overflow-x-visible overflow-y-clip md:w-auto">
            <h1
              id="hero-heading"
              className="w-full text-[clamp(1.625rem,8.5vw,2.125rem)] font-normal leading-[1.08] tracking-[-0.025em] md:w-auto md:text-[38px] lg:text-[48px] xl:text-[64px] 2xl:text-[72px]"
            >
              {headlineLines.map((line, index) => (
                <span key={line.text} className="block overflow-hidden">
                  <span
                    className={`hero-line block xl:whitespace-nowrap ${
                      line.accent ? "text-[#d4f5de]" : "text-white"
                    }`}
                    style={{ animationDelay: `${0.15 + index * 0.1}s` }}
                  >
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <p className="hero-fade-in mt-6 w-full max-w-none text-[12px] leading-[1.7] text-white sm:mt-8 sm:text-[13px] md:mt-10 md:max-w-[520px] md:text-[14px] lg:mt-12 xl:mt-16 xl:text-[15px]">
            Our user-friendly platform empowers you to streamline your{" "}
            <span className="font-semibold text-[#d4f5de]">healthcare</span> routine,
            providing a convenient way to access the medications you need. Take control
            of your health journey with ease and precision – because your well-being
            deserves the <span className="font-semibold text-[#d4f5de]">best</span>.
          </p>

          <Button
            render={<a href="#get-started" id="get-started" />}
            className="hero-fade-in hero-cta mt-6 h-auto w-fit rounded-full bg-[#157a3c] px-8 py-3 text-[13px] font-semibold text-white shadow-[0_10px_28px_rgba(24,138,68,0.35)] hover:bg-[#136b34] hover:shadow-[0_14px_32px_rgba(24,138,68,0.45)] sm:mt-7 sm:px-10 sm:py-3.5 sm:text-[14px] lg:mt-9"
          >
            Let&apos;s start
          </Button>
        </div>

        <div className="relative mt-6 flex w-full items-center justify-center overflow-visible sm:mt-8 lg:order-2 lg:mt-0 lg:w-[46%] lg:max-w-[46%] lg:shrink-0 lg:justify-end">
          <GlassPill />
        </div>
      </div>
    </section>
  );
}
