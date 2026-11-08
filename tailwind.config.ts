import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F5EBDD",
          50: "#FAF5EE",
          100: "#F5EBDD",
          200: "#EAD7BF",
          300: "#DEC2A1",
        },
        terracotta: {
          DEFAULT: "#B66B48",
          50: "#F7ECE7",
          100: "#ECD1C5",
          200: "#DE9F84",
          300: "#D07F5B",
          hover: "#A05A38",
          dark: "#8D4D2E",
        },
        olive: {
          DEFAULT: "#65734C",
          50: "#F2F4EE",
          100: "#DFE5D4",
          200: "#BAC6A3",
          300: "#91A273",
          hover: "#535E3E",
          dark: "#424B31",
        },
        darkbrown: {
          DEFAULT: "#33251F",
          light: "#4E3A32",
          dark: "#201713",
        },
        border: "#EAD7BF",
        input: "#EAD7BF",
        ring: "#B66B48",
        background: "#FFFFFF",
        foreground: "#33251F",
        primary: {
          DEFAULT: "#B66B48",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F5EBDD",
          foreground: "#33251F",
        },
        muted: {
          DEFAULT: "#F5EBDD",
          foreground: "#65734C",
        },
        accent: {
          DEFAULT: "#65734C",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

