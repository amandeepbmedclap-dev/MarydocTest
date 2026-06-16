"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;
const scrollViewportTight = { once: true, margin: "0px 0px -40px 0px" as const, amount: 0.1 };

const footerLinksLeft = [
  { label: "About", href: "#about" },
  { label: "Devices", href: "#devices" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Support", href: "#support" },
];

const footerLinksRight = [
  { label: "Contact", href: "#contact" },
  { label: "Get Started", href: "#get-started" },
  { label: "Marydoc App", href: "#get-started" },
];

const columnVariants: Variants = {
  rest: { opacity: 1 },
  inView: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const linkItemVariants: Variants = {
  rest: { opacity: 1, y: 12 },
  inView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

function FooterLinkColumn({
  links,
  align = "left",
}: {
  links: { label: string; href: string }[];
  align?: "left" | "right";
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.ul
      className="space-y-2.5 sm:space-y-3.5"
      initial="rest"
      whileInView="inView"
      viewport={scrollViewportTight}
      variants={columnVariants}
    >
      {links.map((link) => (
        <motion.li key={link.label} variants={linkItemVariants}>
          <motion.a
            href={link.href}
            className="inline-block text-[13px] font-medium text-white/90 sm:text-[14px]"
            whileHover={
              prefersReducedMotion
                ? { color: "#d4f5de" }
                : { x: align === "right" ? -4 : 4, color: "#d4f5de" }
            }
            transition={{ duration: 0.25, ease: EASE }}
          >
            {link.label}
          </motion.a>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function AppStoreBadge() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href="#get-started"
      aria-label="Download on the App Store"
      className="inline-flex w-fit shrink-0"
      initial={{ opacity: 1, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={scrollViewportTight}
      transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.04,
              boxShadow: "0 8px 24px rgba(24,138,68,0.2)",
            }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
    >
      <svg viewBox="0 0 135 40" className="h-10 w-auto sm:h-11" aria-hidden="true">
        <rect width="135" height="40" rx="6" fill="#000" />
        <path
          fill="#fff"
          d="M24.8 20.3c0-2.4 1.3-4.5 3.4-5.7-.9-1.3-2.3-2.1-3.9-2.1-1.6 0-3.1.8-4 2.1-1-.3-2-.5-3.1-.5-2.4 0-4.6 1.4-5.7 3.6-2.4 4.2-.6 10.4 1.7 13.8 1.1 1.6 2.4 3.4 4.1 3.3 1.3 0 1.8-.8 3.4-.8s2 .8 3.3.8c1.7 0 2.8-1.5 3.9-3.1 1.2-1.8 1.7-3.5 1.7-3.6-.1 0-3.4-1.3-3.4-5.2zm-2.9-8.5c.9-1.1 1.5-2.6 1.3-4.1-1.3.1-2.8.8-3.7 1.9-.8.9-1.5 2.4-1.3 3.8 1.4.1 2.9-.7 3.7-1.6z"
        />
        <text x="44" y="15" fill="#fff" fontSize="8" fontFamily="system-ui, sans-serif">
          Download on the
        </text>
        <text x="44" y="28" fill="#fff" fontSize="13" fontWeight="600" fontFamily="system-ui, sans-serif">
          App Store
        </text>
      </svg>
    </motion.a>
  );
}

function GooglePlayBadge() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href="#get-started"
      aria-label="Get it on Google Play"
      className="inline-flex w-fit shrink-0"
      initial={{ opacity: 1, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={scrollViewportTight}
      transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.04,
              boxShadow: "0 8px 24px rgba(24,138,68,0.2)",
            }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
    >
      <svg viewBox="0 0 135 40" className="h-10 w-auto sm:h-11" aria-hidden="true">
        <rect width="135" height="40" rx="6" fill="#000" />
        <path fill="#34A853" d="M9 8.5 22.5 20 9 31.5z" />
        <path fill="#FBBC04" d="M9 8.5 22.5 20 9 20z" />
        <path fill="#4285F4" d="M9 31.5 22.5 20 9 20z" />
        <path fill="#EA4335" d="M22.5 20 9 8.5 22.5 14z" />
        <text x="44" y="15" fill="#fff" fontSize="8" fontFamily="system-ui, sans-serif">
          GET IT ON
        </text>
        <text x="44" y="28" fill="#fff" fontSize="13" fontWeight="600" fontFamily="system-ui, sans-serif">
          Google Play
        </text>
      </svg>
    </motion.a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative z-20 bg-white pt-4 sm:pt-10">
      <motion.footer
        className="relative overflow-hidden rounded-t-[2rem] border border-b-0 border-white/10 sm:rounded-t-[3rem] md:rounded-t-[3.5rem]"
        style={{ background: "var(--marydoc-gradient-deep)" }}
        initial={{ opacity: 1, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -20px 0px", amount: 0.05 }}
        transition={{ duration: 0.95, ease: EASE }}
      >
        <motion.div
          className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(24,138,68,0.55) 0%, transparent 70%)" }}
          animate={prefersReducedMotion ? undefined : { x: [0, 24, 0], y: [0, -18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute -left-20 bottom-24 h-72 w-72 rounded-full opacity-20 sm:bottom-32"
          style={{ background: "radial-gradient(circle, rgba(85,44,133,0.65) 0%, transparent 70%)" }}
          animate={prefersReducedMotion ? undefined : { x: [0, -20, 0], y: [0, 22, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <div id="devices" className="scroll-mt-24" aria-hidden="true" />
        <div id="support" className="scroll-mt-24" aria-hidden="true" />
        <div id="contact" className="scroll-mt-24" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-16 md:pt-20 lg:px-8">
          <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <motion.a
              href="/"
              className="inline-block shrink-0"
              initial={{ opacity: 1, y: 16, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={scrollViewportTight}
              transition={{ duration: 0.8, ease: EASE }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            >
              <Image
                src="/marydoc.svg"
                alt="Marydoc"
                width={160}
                height={36}
                className="h-8 w-auto sm:h-9"
              />
            </motion.a>

            <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-2 sm:max-w-md sm:gap-x-8 lg:mx-auto lg:max-w-none lg:justify-center">
              <FooterLinkColumn links={footerLinksLeft} align="left" />
              <FooterLinkColumn links={footerLinksRight} align="right" />
            </div>

            <motion.div
              className="shrink-0 lg:text-right"
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewportTight}
              transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            >
              <motion.p
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-marydoc-mint sm:text-[12px]"
                initial={{ opacity: 1, letterSpacing: "0.12em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.18em" }}
                viewport={scrollViewportTight}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              >
                Download App
              </motion.p>
              <div className="mt-3 flex flex-row flex-wrap items-center gap-2.5 sm:mt-4 sm:gap-3 lg:flex-col lg:items-end">
                <AppStoreBadge />
                <GooglePlayBadge />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-10 border-t border-white/10 pt-6 sm:mt-14 sm:pt-8"
            initial={{ opacity: 1, scaleX: 0.85 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={scrollViewportTight}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            style={{ transformOrigin: "center" }}
          >
            <motion.p
              className="text-center text-[12px] text-white/85 sm:text-[13px]"
              initial={{ opacity: 1, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewportTight}
              transition={{ duration: 0.75, ease: EASE, delay: 0.22 }}
            >
              <span className="font-semibold text-marydoc-mint">Marydoc</span> App {year}. All Rights
              Reserved.
            </motion.p>
          </motion.div>

          <motion.div
            className="pointer-events-none mt-8 flex justify-center sm:mt-10"
            initial={{ opacity: 1, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewportTight}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            aria-hidden="true"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-[min(100%,680px)] opacity-70 saturate-[1.15] brightness-110 contrast-110 drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)] sm:max-w-[720px] sm:opacity-75 md:opacity-80"
            >
              <Image
                src="/marydoc.svg"
                alt=""
                width={1200}
                height={272}
                className="h-auto w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
