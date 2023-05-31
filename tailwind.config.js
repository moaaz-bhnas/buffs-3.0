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
      },
      animation: {
        load: "load 2s linear infinite",
      },
      fontFamily: {
        open: ["var(--font-open-sans)"],
      },
    },
  },
  plugins: [],
};
