/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-500": "#877EFF",
        "primary-600": "#5D5FEF",
        "primary-700": "#0A1E2B",
        "secondary-500": "#ffb620",
        "off-white": "#DODFFF",
        "dark-1": "#000000",
        "dark-2": "#09090A",
        "dark-3": "#101012",
        "dark-4": "#1f1f22",
        "light-1": "#ffffff",
        "light-2": "#efefef",
        "light-3": "#7878A3",
        "light-4": "#5C5C7B"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
