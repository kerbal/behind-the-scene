const { colors: defaultColors } = require('tailwindcss/defaultTheme');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        MyFont: ['Open Sans'],
      },
    },
    colors: {
      ...defaultColors,
      ...{
        primary: '#214D71',
        secondary: '#E5E5E5',
        bgcode: '#282A36',
        hover: '#4E7693',
        primarytext: '#FFFFFF',
        primarydivide: '#E5E5E5',
        secondarytext: '#E5E5E5',
        placeholdertext: '#4E7693',
        error: '#C81D25',
        success: '#55A630',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
