import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        valict: {
          navy: "#1e3a8a",
          cyan: "#22d3ee",
          dark: "#0f172a",
          light: "#f8fafc",
        },
      },
      boxShadow: {
        premium: "0 20px 50px -12px rgba(30, 58, 138, 0.1)",
        "inner-soft": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "var(--font-cairo)", "sans-serif"],
        cairo: ["var(--font-cairo)", "Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
