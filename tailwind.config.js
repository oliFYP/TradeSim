/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js, ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlueStart: "#25466E",
        customBlueEnd: "#4787D4",
      },
    },
  },
  plugins: [],
};
