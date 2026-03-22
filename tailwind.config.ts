import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        bg:      "var(--bg)",
        card:    "var(--bg-card)",
        cardalt: "var(--bg-card-alt)",
        subtle:  "var(--bg-subtle)",
        border:  "var(--border)",
        accent:  "var(--accent)",
        accent2: "var(--accent-2)",
      },
      animation: {
        float:     "float 7s ease-in-out infinite",
        "float-2": "float 9s ease-in-out infinite 2s",
        "float-3": "float 6s ease-in-out infinite 1s",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        shimmer:   "shimmer 3s linear infinite",
        marquee:   "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
