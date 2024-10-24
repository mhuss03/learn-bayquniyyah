/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        scheherazade: ['"Scheherazade New"', "serif"],
        kitab: ["kitab", "serif"],
      },
    },
  },
  plugins: [],
};
