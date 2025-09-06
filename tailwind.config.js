/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#252525",
        primary: "#22AF98",
        secondary: "#F45C2C",
      },
      
    },
  },
  plugins: [],
};
