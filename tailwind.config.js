/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      colors: {
        coral: {
          50: "#fff5f5",
          100: "#ffe0e0",
          400: "#ff8e72",
          500: "#ff6b4a",
          600: "#f04e2e",
        },
        ocean: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          900: "#0c1a2e",
        },
        sand: {
          50: "#fffbf5",
          100: "#fef3e2",
          200: "#fde8c0",
          300: "#fbd08a",
        },
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #0c1a2e 0%, #0f3460 50%, #1a5276 100%)",
        "coral-gradient":
          "linear-gradient(135deg, #ff6b4a 0%, #ff8e53 100%)",
        "ocean-gradient":
          "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
        "summer-gradient":
          "linear-gradient(135deg, #ff9a3c 0%, #ff6b4a 50%, #c0392b 100%)",
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "slide-up": "slideUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
