'use strict';

const Chai = require('chai');
const nock = require('nock');

// Disable all real HTTP requests - tests must use mocks
nock.disableNetConnect();

// Use a fake API key since we're mocking all requests
const apiKey = 'test_fake_api_key_for_mocking';

global.expect = Chai.expect;
global.API_KEY = apiKey;
global.Lob = require('../lib/index.js')(apiKey);

// Export mocks for use in test files
global.mocks = require('./mocks');

// Root hooks for Mocha - clean up nock after each test
exports.mochaHooks = {
  afterEach: function () {
    nock.cleanAll();
  }
};
