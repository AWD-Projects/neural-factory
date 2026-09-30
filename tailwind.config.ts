import type { Config } from "tailwindcss";

/**
 * Paleta de marca (intocable): #1a1a1a, #F5F5F5 y #FFC300.
 * El resto son derivados de la tinta para superficies y líneas.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1a1a1a",
          deep: "#111111",
          raised: "#222222",
          line: "#303030",
        },
        paper: "#F5F5F5",
        signal: "#FFC300",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "1440px",
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
    },
  },
  plugins: [],
};
export default config;
