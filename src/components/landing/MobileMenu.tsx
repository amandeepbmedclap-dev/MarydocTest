"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const THEME_GRADIENT = "linear-gradient(160deg, #0f5132 0%, #0b3d26 42%, #3aa17e 100%)";

type NavLink = { label: string; href: string };

export function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu-trigger relative z-[110] h-11 w-11 rounded-lg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          />
        }
      >
        {open ? <X className="size-[22px]" /> : <Menu className="size-[22px]" />}
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        aria-label="Mobile navigation"
        className="w-[min(75vw,360px)] gap-0 rounded-l-2xl border-0 p-0 shadow-[-12px_0_48px_rgba(58,161,126,0.25)] sm:max-w-none"
        style={{
          background: THEME_GRADIENT,
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="flex items-center justify-between border-b border-white/15 px-5 py-4 sm:px-6">
          <Image
            src="/marydoc.svg"
            alt="Marydoc"
            width={160}
            height={36}
            className="h-7 w-auto sm:h-8 md:h-9"
          />
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-lg text-white hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              />
            }
          >
            <X className="size-5" />
          </SheetClose>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6 sm:px-6" aria-label="Mobile navigation">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block cursor-pointer border-b border-white/12 py-4 text-[16px] font-medium text-white transition-colors hover:text-[#cfeae0]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/15 px-5 py-5 sm:px-6">
          <Button
            render={<a href="#get-started" onClick={() => setOpen(false)} />}
            className="h-auto w-full rounded-full bg-marydoc-green px-5 py-3 text-[14px] font-semibold text-white hover:bg-[#2f8867]"
          >
            Get Started
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function HeaderNavLinks({ navLinks }: { navLinks: NavLink[] }) {
  return (
    <nav
      className="header-nav flex min-w-0 flex-wrap items-center justify-end lg:gap-0 xl:gap-1"
      aria-label="Main navigation"
    >
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="header-nav-link relative cursor-pointer whitespace-nowrap px-2 py-2 text-[11px] font-normal transition-colors duration-300 after:absolute after:bottom-0.5 after:left-2 after:h-[2px] after:w-0 after:rounded-full after:bg-marydoc-green after:transition-all after:duration-300 hover:after:w-[calc(100%-1rem)] xl:px-4 xl:text-[13px]"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
