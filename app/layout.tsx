import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { profile } from "@/src/data/profile";
import { ThemeInitScript } from "@/src/components/ThemeInitScript";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.role}`,
  description: profile.headline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <ThemeInitScript />
      </head>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
