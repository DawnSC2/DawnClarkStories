import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-var': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'max-len': ['error', { 'code': 100 }],
      'complexity': ['error', 10],
      'no-use-before-define': ['error', { 'functions': false, 'classes': true, 'variables': true }],
      'eqeqeq': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }]
    },
    env: {
      browser: true,
      es6: true,
      node: true,
      jest: true
    }
  }
];
