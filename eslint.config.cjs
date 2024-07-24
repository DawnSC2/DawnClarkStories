const eslint = require('@eslint/js');
const prettier = require('eslint-config-prettier');
const eslintPluginPrettier = require('eslint-plugin-prettier');

module.exports = [
  eslint.configs.recommended,
  prettier,
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        test: 'readonly',
        expect: 'readonly',
      },
    },
  },
  {
    files: ['gulpfile.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        exports: 'writable',
      },
    },
  },
];
