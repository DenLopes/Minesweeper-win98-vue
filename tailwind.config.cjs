/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '37': '147px',
        '54.5': '217px'
      },
      height: {
        '37': '148px',
        '54.5': '218px'
      },
      scale: {
        '175': '1.75',
      },
      boxShadow: {
        'in': '-1px -1px #818181, -1px 0 #818181, 0 -1px #818181, 1px 1px white, 0 1px white, 1px 0 white,  1px -1px white, -1px 1px white',
        'window': '-1px -1px white, -1px 0 white, 0 -1px white, -2px -2px #c3c3c3, -2px 0 #c3c3c3, 0 -2px #c3c3c3, 1px 1px #818181, 0 1px #818181, 1px 0 #818181,  1px -1px #818181, -1px 1px #818181, -2px 1px #c3c3c3, -2px 2px black, 2px 2px black, 2px 0 black, 0 2px black, 1px -2px #c3c3c3, 2px -2px black',
      },
      colors: {
        'gray-win': '#c3c3c3',
        'dark-gray-win': '#818181',
        'blue-win': '#010081',
        'win-bg': '#008080',
      },
      fontFamily: {
        retrobold: ["Retro-win-bold", "sans-serif"],
        retro: ["Retro-win", "sans-serif"],
      },
      fontSize: {
        smallest: ['11px', '16px'],
      },
      backgroundImage: {
        'display' : "url('../src/assets/img/display.png')"
      },
    },
  },
  plugins: [],
}