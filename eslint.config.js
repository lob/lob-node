'use strict';

const lobConfig = require('eslint-config-lob');

module.exports = [
  ...lobConfig,
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        API_KEY: false,
        expect: false,
        HAS_LIVE_KEY: false,
        INTEGRATION_TIMEOUT: false,
        LiveLob: false,
        Lob: false,
        mocks: false
      }
    }
  },
  {
    files: ['examples/**/*.js'],
    rules: {
      'no-console': 0
    }
  },
  {
    ignores: ['coverage/**']
  }
];
