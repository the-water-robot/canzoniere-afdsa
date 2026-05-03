import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral:     "#FF6B6B",
        mango:     "#FFD166",
        teal:      "#4ECDC4",
        ocean:     "#45B7D1",
        lime:      "#9DCE56",
        sand:      "#FEF3E2",
        ink:       "#1a1d24",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        body:    ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "tropical": `
          radial-gradient(ellipse 80% 50% at 20% -10%, rgba(255,107,107,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 85% 10%,  rgba(69,183,209,0.18)  0%, transparent 55%),
          radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,209,102,0.15) 0%, transparent 60%)
        `,
      },
    },
  },
  plugins: [],
};

export default config;
