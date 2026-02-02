import type { Metadata } from "next";
import { Syncopate, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/Navigation";

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poxmon | Pokemon Database",
  description: "A modern, comprehensive Pokemon encyclopedia.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={syncopate.variable} data-scroll-behavior="smooth">
      <body
        className={cn(
          spaceGrotesk.className,
          "antialiased bg-bg-primary text-text-primary overflow-x-hidden"
        )}
      >
        <Navigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
