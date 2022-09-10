/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "BG" : "#E5E5E5",
        "dropdown-bg": "#C4C4C4",
        "nav-bg":"#000000",
        "timer": "#EFCECE",
        "timer-bg": "#C4C4C44F",
        "border-bg": "#EBCDCD",
        "btn-bg":"#3330B7",
        "pay-bg":"#F2F1F8",
        "dark-bg": "#000000e1",
      },
      
      fontFamily: {
        inter:[" 'Inter' ", 'sans-serif'],
      }
    },
  },
  plugins: [],
}
