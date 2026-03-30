import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono } from 'next/font/google';
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  variable: '--font-serif',
});

const dmMono = DM_Mono({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Stefania Sgreva | Full Stack & AI Engineer",
  description: "Portfolio di Stefania Sgreva - Full Stack Developer, AI Engineer, VFX background.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
