/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{njk,html,md,js}",
    "./_site/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary palette (dark + mint + gold)
          ink:    "#0B1220",   // primary dark bg
          mint:   "#00D9A3",   // primary accent
          gold:   "#C9A84A",   // secondary accent
          off:    "#F7F8FA",   // off-white text
          body:   "#15181D",   // body text on light
          muted:  "#6B7280",   // secondary text
          line:   "rgba(255,255,255,0.08)", // subtle borders on dark
        }
      },
      fontFamily: {
        // Arabic display + body
        arabic:  ["Tajawal", "system-ui", "sans-serif"],
        // English display + body
        sans:    ["Inter", "system-ui", "sans-serif"],
        // Display (tight headings)
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        "glow-mint": "0 0 0 1px rgba(0,217,163,.15), 0 10px 30px -10px rgba(0,217,163,.45)",
        "card":      "0 8px 30px rgba(0,0,0,.25)"
      },
      borderRadius: {
        "xl2": "1.25rem"
      },
      backgroundImage: {
        "grid-fade": "radial-gradient(ellipse at top, rgba(0,217,163,.12), transparent 60%)"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
