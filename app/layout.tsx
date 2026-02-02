import type { Metadata } from "next";
import { Inter, Syncopate, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          syncopate.variable,
          spaceGrotesk.variable,
          "font-sans antialiased bg-bg-primary text-text-primary overflow-x-hidden"
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
