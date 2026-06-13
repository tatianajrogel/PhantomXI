import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B21B6",
        "primary-lit": "#7C3AED",
        gold: "#F59E0B",
        "gold-light": "#FCD34D",
        pitch: "#16A34A",
        "pitch-dark": "#15803D",
        "surface-0": "#09090B",
        "surface-1": "#111113",
        "surface-2": "#1C1C1F",
        "surface-3": "#28282C",
        "text-primary": "#F8FAFC",
        "text-muted": "#A1A1AA",
        danger: "#EF4444",
        warning: "#EAB308",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Geist", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #5B21B6 0%, #1E1B4B 60%, #0F172A 100%)",
        "gold-gradient": "linear-gradient(90deg, #F59E0B, #FCD34D)",
      },
    },
  },
  plugins: [],
};

export default config;
