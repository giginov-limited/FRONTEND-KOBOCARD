/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "nav-bg":"#000000",
        "timer": "#EFCECE",
        "timer-bg": "#C4C4C44F"
      },
      
      fontFamily: {
        inter:[" 'Inter' ", 'sans-serif'],
      }
    },
  },
  plugins: [],
}
