import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/providers/MotionProvider";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#552c85] antialiased">
      <body className="bg-[#552c85]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
