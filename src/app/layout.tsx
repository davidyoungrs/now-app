import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Now - Minimal Living Companion",
  description: "Your daily companion for a minimal and organized life.",
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
      <body className={`${inter.className} bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pb-24`}>
        <main className="max-w-md mx-auto min-h-screen relative">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}
