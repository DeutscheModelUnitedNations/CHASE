//TODO
// @ts-nocheck

import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const dmunColors = {
  100: "#0c192a",
  200: "#183254",
  300: "#254b7e",
  400: "#3164a8",
  500: "#3d7dd2", // DMUN Blue
  600: "#6497db",
  700: "#8bb1e4",
  800: "#b1cbed",
  900: "#d8e5f6",
  950: "#ecf2fb",
};

const secondaryColors = {
  100: "#332700",
  200: "#664e00",
  300: "#997400",
  400: "#cc9b00",
  500: "#ffc200", // Secondary Orange
  600: "#ffce33",
  700: "#ffda66",
  800: "#ffe799",
  900: "#fff3cc",
};

export default {
  content: [
    "./(pages)/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: [
        "var(--font-sans)",
        "Helvetica",
        "Arial",
        ...defaultTheme.fontFamily.sans,
      ],
      serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
      mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: { ...dmunColors, DEFAULT: dmunColors[500] },
        secondary: { ...secondaryColors, DEFAULT: secondaryColors[500] },
        highlight: {
          light: "#DFF4F4",
          dark: "#254b7e",
        },
        gray: {
          light: "#EEEEEE",
          icon: "rgb(156 163 175)",
          text: "rgb(75 85 99)",
        },
        voting: {
          for: "#188a42",
          against: "#ff3d32",
          abstain: "#3d7dd2",
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant("contrast", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.contrast .${e(`contrast${separator}${className}`)}`;
        });
      });
    }),
    plugin(({ addUtilities, e }) => {
      const newUtilities = {};

      newUtilities[`.${e("pophover")}`] = {
        "@apply hover:-translate-y-[4px]": {},
        "@apply hover:-translate-x-[1px]": {},
        "@apply hover:shadow-lg": {},
        "@apply transition-all": {},
        "@apply duration-300": {},
        "@apply ease-in-out": {},
      };

      addUtilities(newUtilities, [
        "responsive",
        "hover",
        "focus",
        "group-hover",
      ]);
    }),
    require("@tailwindcss/typography"),
  ],
  variants: {
    extend: {
      backgroundColor: ["contrast"],
      borderColor: ["contrast"],
      textColor: ["contrast"],
      opacity: ["contrast"],
      display: ["contrast"],
      visibility: ["contrast"],
      boxShadow: ["contrast"],
      fontWeight: ["contrast"],
      fontSize: ["contrast"],
      lineHeight: ["contrast"],
      padding: ["contrast"],
      margin: ["contrast"],
      width: ["contrast"],
      height: ["contrast"],
      maxWidth: ["contrast"],
      maxHeight: ["contrast"],
      minWidth: ["contrast"],
      minHeight: ["contrast"],
      zIndex: ["contrast"],
      inset: ["contrast"],
      borderWidth: ["contrast"],
      borderRadius: ["contrast"],
    },
  },
} satisfies Config;
