"use client";
import "./globals.scss";
import { Inter, Vollkorn, Noto_Sans_Mono } from "next/font/google"; // Even though Google Fonts are used – no requests are sent to Google (see NEXT.JS docs)
//theme
import "@/themes/theme_light.scss";
import "@/themes/theme_dark.scss";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";

import {
  detectLocale,
  navigatorDetector,
  localStorageDetector,
} from "typesafe-i18n/detectors";
import { loadLocale } from "@/i18n/i18n-util.sync";
import { baseLocale, locales } from "@/i18n/i18n-util";
import TypesafeI18n from "@/i18n/i18n-react";
import { ToastProvider } from "@/contexts/toast";
import { Backend } from "@/contexts/backend";
import { BackendTime } from "@/contexts/backendTime";
import CookieBanner from "@/components/cookie_banner";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isBrowser = typeof window !== "undefined";
  let locale = baseLocale;

  if (isBrowser) {
    // Only run this code in a browser context.
    locale = detectLocale(
      baseLocale,
      locales,
      localStorageDetector,
      navigatorDetector,
    );
  }

  loadLocale(locale);

  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        {/* <script defer src="/fontawesome/js/fontawesome.min.js" />
        <script defer src="/fontawesome/js/brands.min.js" />
        <script defer src="/fontawesome/js/solid.min.js" />
        <script defer src="/fontawesome/js/regular.min.js" /> */}
        {/* <script defer src="/fontawesome/js/light.min.js" />
        <script defer src="/fontawesome/js/thin.min.js" /> */}
        {/* <script defer src="/fontawesome/js/duotone.min.js" /> */}
        {/* <script defer src="/fontawesome/js/sharp-solid.min.js" />
        <script defer src="/fontawesome/js/sharp-regular.min.js" />
        <script defer src="/fontawesome/js/sharp-light.min.js" />
        <script defer src="/fontawesome/js/sharp-thin.min.js" /> */}
        <link href="/fontawesome/css/fontawesome.css" rel="stylesheet" />
        <link href="/fontawesome/css/brands.css" rel="stylesheet" />
        <link href="/fontawesome/css/solid.css" rel="stylesheet" />
      </head>

      {/* <Head>
        <title>Chase</title> 
        <PublicEnvScript />
      </Head>
     */}

      <body>
        {/* <PrimeReactProvider value={{ pt: Tailwind }}> */}
        <TypesafeI18n locale={locale}>
          <ToastProvider>
            <Backend>
              <BackendTime>
                <CookieBanner />
                {children}
              </BackendTime>
            </Backend>
          </ToastProvider>
        </TypesafeI18n>
        {/* </PrimeReactProvider> */}
      </body>
    </html>
  );
}
