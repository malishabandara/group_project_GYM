/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "@/app/index.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "@/components/**/*.{js,jsx,ts,tsx}",
    "@/components/FormField.jsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        text: ["Poppins-Regular"],
        title1: ["Poppins-Bold"],
        title2: ["Poppins-Medium"],
      },
    },
    colors: {
      primary: "#C7F03C",
      secondary: "#5E9387",
      third: "#f7fde4",
      red: "#F00A1F",
      white: "#FFFFFF",
      black: "#000000",
      middle: "#656565",
      buttonSecondary: "#E5E5E5",
      text: "#F3F2F2",
      transparent: "transparent",
      blue: "#0000ff",
    },
  },
  plugins: [],
};
