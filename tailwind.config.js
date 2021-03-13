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
        terter: '#51ad00',
        gray: {
          ...colors.gray,
          100: '#f7fafc',
          // 200: "#edf2f7",
          200: '#F2F2F5',
          // 300: "#e2e8f0",
          300: '#E8E8EC',
          // 400: "#cbd5e0",
          400: '#AAAAB0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          // 900: "#1a202c",
          900: '#363636',
        },
        blue: {
          ...colors.blue,
          100: '#F4F7FC',
          200: '#EDF6FF',
        },
        orange: {
          ...colors.orange,
          100: '#fffaf0',
          // 200: '#feebc8',
          200: '#FDECC9',
          300: '#fbd38d',
          // 400: '#f6ad55',
          400: '#F5AD55',
          500: '#ed8936',
          600: '#dd6b20',
          700: '#c05621',
          800: '#9c4221',
          900: '#7b341e',
        },
        teal: {
          ...colors.teal,
          100: '#e6fffa',
          // 200: "#b2f5ea",
          200: '#E6FEFA',
          300: '#81e6d9',
          // 400: "#4fd1c5",
          400: '#4CB2AD',
          500: '#38b2ac',
          600: '#319795',
          700: '#2c7a7b',
          800: '#285e61',
          900: '#234e52',
        },
        green: {
          ...colors.green,
          400: '#03D91C',
        },
        red: {
          ...colors.red,
          400: '#FF5D83',
        },
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
