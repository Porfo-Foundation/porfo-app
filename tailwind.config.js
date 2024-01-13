const colors = require('./config/colors.js');
const fonts = require('./config/fonts.js');
/** @type {import('tailwindcss').Config} */
// import colors from './src/config/colors';
// import fonts from './src/config/fonts';

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: colors,
    fontFamily: fonts,
    extend: {},
  },
  plugins: [],
};
