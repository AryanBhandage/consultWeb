/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        ink: {
          0: "#050505",
          50: "#0A0A0C",
          100: "#121214",
          200: "#1A1A1E",
          300: "#27272A",
          400: "#3F3F46",
          500: "#52525B",
          600: "#71717A",
          700: "#A1A1AA",
        },
        volt: {
          DEFAULT: "#CCFF00",
          hover: "#B3E600",
          soft: "rgba(204,255,0,0.12)",
        },
        amber: { accent: "#FF9900" },
        danger: "#FF3366",
      },
      fontFamily: {
        display: ["Outfit", "system-ui", "sans-serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 50% -20%, rgba(204,255,0,0.18) 0%, rgba(5,5,5,1) 60%)",
        grid: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        pulseDot: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.3" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
        slideUp: "slideUp 0.6s ease-out both",
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [],
};
