// tailwind.config.js
module.exports = {
    darkMode: "class", // enable dark mode using a class
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [require("@tailwindcss/line-clamp")],
  }
  