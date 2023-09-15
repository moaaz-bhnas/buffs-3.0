/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        load: {
          "50%": { backgroundColor: "#eee" },
        },
        pop: {
          "50%": { transform: "scale(1.3)" },
        },
      },
      animation: {
        load: "load 2s linear infinite",
        pop: "pop 0.3s",
      },
      fontFamily: {
        open: ["var(--font-open-sans)"],
      },
    },
  },
  plugins: [],
};
