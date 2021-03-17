module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'max-len': 0,
    'no-underscore-dangle': ['error'],
    'no-useless-rename': ['error', {
      ignoreDestructuring: true,
      ignoreImport: true,
      ignoreExport: true,
    }],
  },
};
