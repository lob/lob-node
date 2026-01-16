'use strict';

const nock = require('nock');
const fixtures = require('./fixtures');

const API_HOST = 'https://api.lob.com';

/**
 * Create a nock scope for the Lob API
 * @returns {nock.Scope}
 */
function mockLob () {
  return nock(API_HOST);
}

/**
 * Mock a list endpoint
 * @param {string} endpoint - API endpoint (e.g., '/v1/addresses')
 * @param {Array} items - Array of items to return
 * @param {Object} query - Optional query parameters to match
 * @returns {nock.Scope}
 */
function mockList (endpoint, items, query) {
  let scope = mockLob().get(endpoint);
  if (query) {
    scope = scope.query(query);
  } else {
    scope = scope.query(true); // Match any query
  }
  return scope.reply(200, fixtures.list(items, items.length));
}

/**
 * Mock a create endpoint
 * @param {string} endpoint - API endpoint (e.g., '/v1/addresses')
 * @param {Object} response - Response object to return
 * @returns {nock.Scope}
 */
function mockCreate (endpoint, response) {
  return mockLob()
    .post(endpoint)
    .reply(200, response);
}

/**
 * Mock a retrieve endpoint
 * @param {string} endpoint - API endpoint (e.g., '/v1/addresses')
 * @param {string} id - Resource ID
 * @param {Object} response - Response object to return
 * @returns {nock.Scope}
 */
function mockRetrieve (endpoint, id, response) {
  return mockLob()
    .get(`${endpoint  }/${  id}`)
    .reply(200, response);
}

/**
 * Mock a delete endpoint
 * @param {string} endpoint - API endpoint (e.g., '/v1/addresses')
 * @param {string} id - Resource ID
 * @returns {nock.Scope}
 */
function mockDelete (endpoint, id) {
  return mockLob()
    .delete(`${endpoint  }/${  id}`)
    .reply(200, fixtures.deleted(id));
}

/**
 * Mock an error response
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @returns {nock.Scope}
 */
function mockError (method, endpoint, statusCode, message) {
  const scope = mockLob();
  const errorResponse = fixtures.error(message, statusCode);

  switch (method.toUpperCase()) {
    case 'GET':
      return scope.get(endpoint).query(true).reply(statusCode, errorResponse);
    case 'POST':
      return scope.post(endpoint).reply(statusCode, errorResponse);
    case 'DELETE':
      return scope.delete(endpoint).reply(statusCode, errorResponse);
    default:
      return scope.get(endpoint).reply(statusCode, errorResponse);
  }
}

/**
 * Mock a 500 error
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint
 * @returns {nock.Scope}
 */
function mock500 (method, endpoint) {
  return mockError(method, endpoint, 500, 'Internal Server Error');
}

/**
 * Mock a 404 error
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint
 * @returns {nock.Scope}
 */
function mock404 (method, endpoint) {
  return mockError(method, endpoint, 404, 'Not Found');
}

/**
 * Mock a 401 error
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint
 * @returns {nock.Scope}
 */
function mock401 (method, endpoint) {
  return mockError(method, endpoint, 401, 'Invalid API Key');
}

module.exports = {
  mockLob,
  mockList,
  mockCreate,
  mockRetrieve,
  mockDelete,
  mockError,
  mock500,
  mock404,
  mock401,
  fixtures,
  API_HOST
};
