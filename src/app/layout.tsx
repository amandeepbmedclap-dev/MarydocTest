import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeColorSync } from "@/components/providers/ThemeColorSync";
import { InitialLoadScreen } from "@/components/landing/InitialLoadScreen";
import { StaticLoadFallback } from "@/components/landing/StaticLoadFallback";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marydoc — Optimize Your Health Care",
  description:
    "Easily order prescription medications with our user-friendly pharmacy platform.",
};

export const viewport: Viewport = {
  themeColor: "#3a7057",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: LOADER_BOOT_CSS }} />
        <script
          dangerouslySetInnerHTML={{
            __html: "window.__MARYDOC_LOADER_START__=Date.now();",
          }}
        />
      </head>
      <body className="min-h-full overflow-x-clip bg-background font-sans text-foreground antialiased transition-colors duration-300">
        <ThemeProvider>
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
              <ThemeColorSync />
              <InitialLoadScreen />
              {children}
            </MotionProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
