/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
// const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#19345E',
        secondary: '#F47522',
        danger: '#E43C25',
        success: '#62E7C8',
      },
      // custom z-index (used in headings)
      zIndex: {
        '-10': '-10',
      },
    },
    fontFamily: {
      mulish: ['Mulish', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      backgroundColor: ['even', 'odd'],
    },
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
};
