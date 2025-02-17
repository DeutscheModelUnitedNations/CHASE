"use client";
import React, { useEffect, useState } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import Link from "next/link";
import Image from "next/image";
import FAIcon from "../font_awesome_icon";

export default function Footer() {
  const { LL } = useI18nContext();
  const [language, setLanguage] = useState<"system" | "de" | "en">("system");

  useEffect(() => {
    if (window) {
      const lang = localStorage.getItem("lang");
      if (lang === "de") {
        setLanguage("de");
      } else if (lang === "en") {
        setLanguage("en");
      } else {
        setLanguage("system");
      }
    }
  }, []);

  useEffect(() => {
    if (language === "system") {
      localStorage.removeItem("lang");
    } else if (language === "de") {
      localStorage.setItem("lang", "de");
    } else if (language === "en") {
      localStorage.setItem("lang", "en");
    } else {
      console.error(`Invalid language: ${language}`);
      return;
    }
  }, [language]);

  return (
    <footer className="bg-primary-300 text-white py-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sitemap */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {LL.home.footer.sitemap.TITEL()}
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:underline">
                  {LL.home.footer.sitemap.HOME()}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  {LL.home.footer.sitemap.FAQ()}
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:underline">
                  {LL.home.footer.sitemap.DOCS()}
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  {LL.home.footer.sitemap.LOGIN()}
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.dmun.de/impressum/"
                  className="hover:underline"
                >
                  {LL.home.footer.sitemap.PRIVACY()}
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <FAIcon icon="globe" />
            </h3>
            <ul className="space-y-1">
              <li
                onClick={() => {
                  setLanguage("system");
                  if (window) window.location.reload();
                }}
                onKeyDown={() => {
                  setLanguage("system");
                  if (window) window.location.reload();
                }}
                className={`hover:underline hover:decoration-white ${
                  language === "system" && "underline decoration-slate-400"
                } cursor-pointer`}
              >
                System
              </li>
              <li
                onClick={() => {
                  setLanguage("en");
                  if (window) window.location.reload();
                }}
                onKeyDown={() => {
                  setLanguage("en");
                  if (window) window.location.reload();
                }}
                className={`hover:underline hover:decoration-white ${
                  language === "en" && "underline decoration-slate-400"
                } cursor-pointer`}
              >
                English (EN)
              </li>
              <li
                onClick={() => {
                  setLanguage("de");
                  if (window) window.location.reload();
                }}
                onKeyDown={() => {
                  setLanguage("de");
                  if (window) window.location.reload();
                }}
                className={`hover:underline hover:decoration-white ${
                  language === "de" && "underline decoration-slate-400"
                } cursor-pointer`}
              >
                Deutsch (DE)
              </li>
            </ul>
          </div>

          {/* Impressum */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {LL.home.footer.imprint.TITEL()}
            </h3>
            <p>{LL.home.footer.imprint.ORGANISATION()}</p>
            <p>{LL.home.footer.imprint.ADDRESS()}</p>
            <p>
              <Link href="mailto:vorstand@dmun.de">
                {LL.home.footer.imprint.EMAIL()}
              </Link>
            </p>
            <p>
              <Link href="https://www.dmun.de">
                {LL.home.footer.imprint.WEBSITE()}
              </Link>
            </p>
            <Image
              src={"/dmunlogo/logo-weiss.png"}
              alt="Logo"
              width={128}
              height={128}
              className="my-2"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
