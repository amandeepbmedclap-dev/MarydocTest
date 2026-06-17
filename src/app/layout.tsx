import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { InitialLoadScreen } from "@/components/landing/InitialLoadScreen";
import { StaticLoadFallback } from "@/components/landing/StaticLoadFallback";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marydoc — Optimize Your Health Care",
  description:
    "Easily order prescription medications with our user-friendly pharmacy platform.",
};

export const viewport: Viewport = {
  themeColor: "#552c85",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const LOADER_BOOT_CSS = `
html:not([data-app-ready="true"]) .app-content{display:none!important}
html:not([data-app-ready="true"]){overflow:hidden!important;background:#fff!important}
html:not([data-app-ready="true"]) body{background:#fff!important;overflow:hidden!important}
#initial-load-screen{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#fff}
`.replace(/\s+/g, " ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#552c85] antialiased" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: LOADER_BOOT_CSS }} />
        <script
          dangerouslySetInnerHTML={{
            __html: "window.__MARYDOC_LOADER_START__=Date.now();",
          }}
        />
      </head>
      <body className="bg-[#552c85]">
        <div
          id="initial-load-screen"
          className="initial-load-screen"
          role="status"
          aria-live="polite"
          aria-label="Loading Marydoc"
        >
          <StaticLoadFallback />
        </div>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="app-content">
          <MotionProvider>
            <InitialLoadScreen />
            {children}
          </MotionProvider>
        </div>
      </body>
    </html>
  );
}
