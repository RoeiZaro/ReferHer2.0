// import UserProvider from "./src/context/userContext"
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      blue: "#1fb6ff",
      purple: "#9b51e0",
      darkpurple: "#15172C",
      pink: "#f78da7",
      orange: "#EF9A53",
      green: "#13ce66",
      transparent: "transparent",
      current: "currentColor",
      referblue: "#15172C",
      referpink: "#F90377",
      referorange: "#EF9A53",
      referwhite: "#DDDAEF",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      purple: colors.purple,
      pink: colors.pink,
      greens: colors.green,
      blues: colors.blue,
      slate: colors.slate,
      violet: colors.violet,
    },
    extend: {},
  },
  plugins: [],
};
