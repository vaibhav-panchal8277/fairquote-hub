import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "./custom.css";
import { AuthProvider } from "@/context/auth-context";
import { DataProvider } from "@/context/data-context";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FairQuote Hub — Know the Fair Price Before You Call",
  description:
    "Transparent home service pricing powered by community data. Compare verified quotes, find vetted contractors, and never overpay again.",
  keywords: ["home services", "fair pricing", "contractor quotes", "plumbing", "electrical", "HVAC", "verified contractors"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <AuthProvider>
          <DataProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
