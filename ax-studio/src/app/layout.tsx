import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

// Krój pisma zaprojektowany dla osób słabiej widzących.
const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "AX Studio",
  description: "Klienci, faktury i pieniądze w jednym, prostym miejscu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body className={`${atkinson.variable} antialiased`}>{children}</body>
    </html>
  );
}
