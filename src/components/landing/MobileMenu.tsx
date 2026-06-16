"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

const THEME_GRADIENT = "linear-gradient(160deg, #552c85 0%, #4d2878 42%, #188a44 100%)";

type NavLink = { label: string; href: string };

function useFocusTrap(active: boolean, containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusable.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, [active, containerRef]);
}

export function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  useFocusTrap(menuOpen, drawerRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const menuPortal =
    mounted && menuOpen
      ? createPortal(
          <>
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[200] cursor-pointer bg-[#552c85]/55 touch-manipulation lg:hidden"
              onClick={closeMenu}
            />

            <aside
              ref={drawerRef}
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="drawer-slide-in fixed inset-y-0 right-0 z-[210] flex w-[min(75vw,360px)] touch-manipulation flex-col rounded-l-2xl shadow-[-12px_0_48px_rgba(24,138,68,0.25)] lg:hidden"
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
                <button
                  type="button"
                  aria-label="Close menu"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
                  onClick={closeMenu}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M5 5L15 15M15 5L5 15"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-6 sm:px-6" aria-label="Mobile navigation">
                <ul className="flex flex-col">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="block cursor-pointer border-b border-white/12 py-4 text-[16px] font-medium text-white transition-colors hover:text-[#d4f5de]"
                        onClick={closeMenu}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-white/15 px-5 py-5 sm:px-6">
                <a
                  href="#get-started"
                  onClick={closeMenu}
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-marydoc-green px-5 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#157a3c]"
                >
                  Get Started
                </a>
              </div>
            </aside>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="relative z-[110] flex shrink-0 items-center lg:hidden">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          className="mobile-menu-trigger relative z-[110] flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-lg"
          onClick={toggleMenu}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path
                d="M5 5L17 17M17 5L5 17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <>
                <path d="M3 6H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M3 11H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M3 16H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuPortal}
    </>
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
