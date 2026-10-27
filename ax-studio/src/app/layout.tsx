import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Kroje pisma marki AX Studio.
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin", "latin-ext"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin", "latin-ext"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "AX Studio",
  description: "Klienci, faktury i pieniądze w jednym, prostym miejscu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body className={`${bricolage.variable} ${geist.variable} ${jetbrains.variable} antialiased`}>{children}</body>
    </html>
  );
}
