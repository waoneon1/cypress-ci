/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const { colors } = require('tailwindcss/defaultTheme');

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
      // custom position (used in circle bg headings & circle bg on hero image)
      // <10 = kelipatan 8
      // kelipatan 10 = persentase
      inset: {
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        5: '40px',
        6: '48px',
        7: '56px',
        8: '64px',
        9: '72px',
        '-1': '-8px',
        '-2': '-16px',
        '-3': '-24px',
        '-4': '-32px',
        '-5': '-40px',
        '-6': '-48px',
        '-7': '-56px',
        '-8': '-64px',
        '-9': '72px',
        '-10': '-10%',
        '-20': '-20%',
      },
      // custom width & height (used in hero images)
      width: {
        72: '18rem',
        700: '700px',
        350: '350px',
      },
      height: {
        700: '700px',
      },
      // list type
      listStyleType: {
        'low-alpha': 'lower-alpha',
        'upper-alpha': 'upper-alpha',
      },
    },
    fontFamily: {
      mulish: ['Mulish', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
  },
  variants: {
    borderWidth: ['responsive', 'last'],
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
