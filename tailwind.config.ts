import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        panel: "var(--color-panel)",
        line: "var(--color-line)",
        ink: "var(--color-ink)",
        mute: "var(--color-mute)",
        accent: {
          DEFAULT: "var(--color-accent)",
          dim: "var(--color-accent-dim)",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
      },
    },
  },
  plugins: [],
};

export default config;
