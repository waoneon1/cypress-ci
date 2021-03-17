module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:import/typescript'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'import'],
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

    // '@typescript-eslint/no-unused-vars': 'error',
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    // semi: 'off',
    // '@typescript-eslint/semi': 'error',
    // 'no-underscore-dangle': ['error'],
    // 'no-useless-rename': ['error', {
    //   ignoreDestructuring: true,
    //   ignoreImport: true,
    //   ignoreExport: true,
    // }],
  },
};
