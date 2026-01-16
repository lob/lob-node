'use strict';

const Chai = require('chai');

// Integration tests require a test API key (not live key)
const testApiKey = process.env.TEST_API_KEY;
const liveApiKey = process.env.LIVE_API_KEY;

if (!testApiKey) {
  /* eslint-disable no-console */
  console.error('\n⚠️  Integration tests require a test API key.');
  console.error('Set TEST_API_KEY environment variable.\n');
  console.error('Example: TEST_API_KEY=test_xxx npm run test:integration\n');
  /* eslint-enable no-console */
  process.exit(1);
}

global.expect = Chai.expect;
global.Lob = require('../../lib/index.js')(testApiKey);

// Live key client for endpoints that require it
if (liveApiKey) {
  global.LiveLob = require('../../lib/index.js')(liveApiKey);
}
global.HAS_LIVE_KEY = Boolean(liveApiKey);

// Longer timeout for real API calls
global.INTEGRATION_TIMEOUT = 30000;
