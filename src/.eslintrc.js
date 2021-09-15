module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:import/typescript'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'import', 'cypress'],
  globals: {
    $nuxt: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'max-len': 0,
    'import/extensions': 'off',
  },
};
