import globals from 'globals';
import pluginJs from '@eslint/js';

export default [

  {
    files: [
      '**/*.js'
    ],
    languageOptions: {
      globals: globals.browser,
      sourceType: 'module'
    },
    rules: {
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }]
    }
  },
  pluginJs.configs.recommended,
];
