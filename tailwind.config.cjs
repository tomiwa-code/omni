/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#5333ed",
      secondary: "#202020",
      gray: "#6a6a6a",
      white: "#f6f6f6",
    },
    extend: {
      fontFamily: {
        raleway: ["raleway"],
      },
      boxShadow: {
        "3xl": "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      },
    },
  },
  plugins: [],
};
