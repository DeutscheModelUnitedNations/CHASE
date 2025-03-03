import { LanguageProvider } from "@inlang/paraglide-next";
import { languageTag } from "@/paraglide/runtime.js";
import { type Metadata } from "next";
import { Inter, Vollkorn, Noto_Sans_Mono } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import "./tailwind.css";
import "./globals.scss";
import "@/styles/theme_light.scss";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import type { ReactNode } from "react";
import "@/styles/fontawesome/css/fontawesome.css";
import "@/styles/fontawesome/css/solid.css";
import { ToastProvider } from "@/lib/contexts/toast";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const serif = Vollkorn({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const mono = Noto_Sans_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CHASE",
  description: "Conference management software by DMUN e.V.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <LanguageProvider>
      <PrimeReactProvider>
        <html lang={languageTag()}>
          <ToastProvider>
            <body
              className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}
            >
              <main className="flex min-h-screen w-screen justify-center">
                {children}
              </main>
              {/* <Footer /> */}
              {/* <CookieConsent /> */}
            </body>
          </ToastProvider>
        </html>
      </PrimeReactProvider>
    </LanguageProvider>
  );
}
