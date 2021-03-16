module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['vue', 'jest'],
  globals: {
    $nuxt: true,
  },
  rules: {
    'max-len': 0,
    'no-underscore-dangle': ['error', { allow: ['_chart'] }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './'],
          ['~', './'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
      },
    },
  },
};
