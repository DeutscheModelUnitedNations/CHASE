"use client";
import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";
import FAIcon from "@/lib/components/FAIcon";
import * as m from "@/paraglide/messages";
import { SmallFlag } from "@/lib/components/Flag";

interface ColormodeOption {
  name: string;
  icon: string;
  value: string;
}

interface SettingsSidebarProps {
  settingsSidebarVisible: boolean;
  setSettingsSidebarVisible: (visible: boolean) => void;
}

/**
 * This Component is the sidebar that is displayed when the user clicks on the settings icon in the navbar.
 * It displays the settings of the user, which are:
 * - Colortheme
 * - Language
 */

export default function NavbarSettingsSidebar({
  settingsSidebarVisible,
  setSettingsSidebarVisible,
}: SettingsSidebarProps) {
  const colortheme_items: ColormodeOption[] = [
    {
      name: m.system(),
      icon: "display",
      value: "system",
    },
    {
      name: m.light(),
      icon: "sun",
      value: "light",
    },
    {
      name: m.dark(),
      icon: "moon",
      value: "dark",
    },
    {
      name: m.contrast(),
      icon: "diamond-half-stroke",
      value: "contrast",
    },
  ];

  const [colortheme, setColortheme] = useState(
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") ?? "system")
      : "system",
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [language, setLanguage] = useState(
    typeof window !== "undefined"
      ? (localStorage.getItem("lang") ?? "system")
      : "system",
  );

  useEffect(() => {
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);

    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener("change", handleChange);
    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);

  const colorModeTemplate = (option: ColormodeOption) => {
    return (
      <>
        <FAIcon icon={option.icon} className="mr-2" />
        <span className="p-ml-2 ml-2">{option.name}</span>
      </>
    );
  };

  useEffect(() => {
    if (colortheme === "system") {
      document.documentElement.classList.remove("contrast");
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else if (colortheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("contrast");
    } else if (colortheme === "contrast") {
      document.documentElement.classList.add("contrast");
      document.documentElement.classList.remove("dark");
    } else if (colortheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("contrast");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("contrast");
      console.error(`Invalid colortheme: ${colortheme}`);
    }

    localStorage.setItem("theme", colortheme);
  }, [colortheme, isDarkMode]);

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
    <Sidebar
      visible={settingsSidebarVisible}
      onHide={() => setSettingsSidebarVisible(false)}
      position="top"
    >
      {/* TODO Settings */}
      <div className="flex w-full items-center justify-center gap-2 pt-2">
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">{m.theme()}</div>
          <SelectButton
            value={colortheme}
            onChange={(e) => {
              setColortheme(e.value);
            }}
            itemTemplate={colorModeTemplate}
            optionLabel={m.theme()}
            options={colortheme_items}
            unselectable={false}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">{m.language()}</div>
          <Dropdown
            value={language}
            options={[
              {
                flag: "uno",
                label: m.system(),
                value: "system",
              },
              {
                flag: "deu",
                label: m.german(),
                value: "de",
              },
              {
                flag: "usa",
                label: m.english(),
                value: "en",
              },
            ]}
            itemTemplate={(option) => (
              <div className="flex items-center">
                <SmallFlag countryCode={option.flag} />
                <span className="ml-4">{option.label}</span>
              </div>
            )}
            onChange={(e) => {
              setLanguage(e.value);
              if (window) window.location.reload();
            }}
          />
        </div>
      </div>
    </Sidebar>
  );
}
