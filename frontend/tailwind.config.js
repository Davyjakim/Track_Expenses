/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-25%)" },
        },
      },
      animation: {
        "bounce-slow": "bounce 1.5s infinite",
        "bounce-slow-1": "bounce 1.5s infinite 0.4s",
        "bounce-slow-2": "bounce 1.5s infinite 0.6s",
        "bounce-slow-3": "bounce 1.5s infinite 0.8s",
      },
    },
    screens: {
      ss: "120px",
      sm: "440px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
