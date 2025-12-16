import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-open-sans)",
          "Open Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      fontSize: {
        // Scale all font sizes by 87.5% (14px base instead of 16px)
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.8125rem", { lineHeight: "1.25rem" }], // 13px
        base: ["0.875rem", { lineHeight: "1.5rem" }], // 14px (was 16px)
        lg: ["1rem", { lineHeight: "1.75rem" }], // 16px (was 18px)
        xl: ["1.125rem", { lineHeight: "1.75rem" }], // 18px (was 20px)
        "2xl": ["1.25rem", { lineHeight: "2rem" }], // 20px (was 24px)
        "3xl": ["1.5rem", { lineHeight: "2.25rem" }], // 24px (was 30px)
        "4xl": ["1.875rem", { lineHeight: "2.5rem" }], // 30px (was 36px)
        "5xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px (was 48px)
        "6xl": ["3rem", { lineHeight: "1" }], // 48px (was 60px)
        "7xl": ["3.75rem", { lineHeight: "1" }], // 60px (was 72px)
        "8xl": ["4.5rem", { lineHeight: "1" }], // 72px (was 96px)
        "9xl": ["6rem", { lineHeight: "1" }], // 96px (was 128px)
      },
    },
  },
};

export default config;
