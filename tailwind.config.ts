import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette ispirato alla band: cielo acceso, flamingo, arancio, giallo solare, violetto
        sky:      "#29C5EE",
        flamingo: "#FF5F8F",
        solar:    "#FFD000",
        tangerine:"#FF7B29",
        violet:   "#9B59E8",
        lime:     "#7ED93A",
        coral:    "#FF4757",
        // Neutri
        sand:     "#FFFBF2",
        ink:      "#0E1420",
        // Dark mode surfaces
        "dark-bg":   "#0B1120",
        "dark-card": "#141C2E",
        "dark-border":"#1E2D45",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        body:    ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      keyframes: {
        "orb-drift": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%":     { transform: "translate(20px,-18px) scale(1.05)" },
          "66%":     { transform: "translate(-14px,12px) scale(0.97)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "gradient-x": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%":     { backgroundPosition: "100% 50%" },
        },
        "pulse-scale": {
          "0%,100%": { transform: "scale(1)"    },
          "50%":     { transform: "scale(1.04)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "orb-a":    "orb-drift 9s  ease-in-out infinite",
        "orb-b":    "orb-drift 12s ease-in-out infinite reverse",
        "orb-c":    "orb-drift 15s ease-in-out infinite 3s",
        "spin-slow":"spin-slow 30s linear infinite",
        "gradient": "gradient-x 6s ease infinite",
        "pulse-s":  "pulse-scale 4s ease-in-out infinite",
        "slide-down":"slide-down 0.25s ease",
      },
    },
  },
  plugins: [],
};

export default config;
