import Image from "next/image";
import { HeaderNavLinks, MobileMenu } from "./MobileMenu";
import { HeaderScrollStyle } from "./HeaderScrollStyle";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Devices", href: "#devices" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Support", href: "#support" },
  { label: "Contact", href: "#contact" },
];

function GetStartedButton({ className = "" }: { className?: string }) {
  return (
    <Button
      render={<a href="#get-started" />}
      nativeButton={false}
      className={`h-auto rounded-full bg-marydoc-green px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#157a3c] hover:shadow-[0_8px_24px_rgba(24,138,68,0.35)] sm:px-6 sm:text-[13px] ${className}`}
    >
      Get Started
    </Button>
  );
}

export function Header() {
  return (
    <HeaderScrollStyle>
      <div className="relative mx-auto flex h-[60px] min-w-0 max-w-[1440px] items-center justify-between gap-3 px-4 sm:h-[68px] sm:px-6 md:h-[72px] lg:h-[80px] lg:px-10 xl:px-14 2xl:px-16">
        <a href="/" className="relative z-[110] min-w-0 shrink-0 cursor-pointer">
          <Image
            src="/marydoc.svg"
            alt="Marydoc"
            width={160}
            height={36}
            className="h-7 w-auto sm:h-8 md:h-9"
            loading="eager"
            fetchPriority="low"
          />
        </a>

        <div className="relative z-10 hidden min-w-0 items-center gap-2 lg:flex xl:gap-3">
          <HeaderNavLinks navLinks={navLinks} />
          <ThemeToggle />
          <GetStartedButton className="shrink-0 px-4 py-2 text-[11px] xl:px-6 xl:py-2.5 xl:text-[13px]" />
        </div>

        <div className="relative z-[110] flex shrink-0 items-center gap-1 sm:gap-2 lg:hidden">
          <ThemeToggle />
          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </HeaderScrollStyle>
  );
}
