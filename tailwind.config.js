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
        "nav-bg":"#373737",
        "timer": "#EFCECE",
        "timer-bg": "#C4C4C44F",
        "border-bg": "#EBCDCD",
        "btn-bg":"#3330B7",
        "pay-bg":"#F2F1F8",
        "dark-bg": "#000000e1",
        "btn-bg": "#EAC95F",
        "btn-bg2": "#F1B151",
        "btn-bg3": "#008092",
        "input-bd":"#F1C36C",
        "register-btn": "#008092 ",
        "Choose-btn":"#F1B151",
        "Buy-btn":"#51AEF1",
        "Win-btn":"#00D615",
        "home-text": "#FFDA79",
        "homeGames-bg":  "#ECC55D",
        "play-btn":"#05C718",
      },
      
      fontFamily: {
        inter:[" 'Inter' ", 'sans-serif'],
        lato:[" 'Lato' ", 'sans-serif']
      }
    },
  },
  plugins: [],
}
