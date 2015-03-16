'use strict';
// var Lob = {};
// Lob.DEFAULT_HOST = 'api.Lob.com';
// Lob.DEFAULT_PORT = '443';
// Lob.DEFAULT_BASE_PATH = '/v1/';
// Lob.DEFAULT_API_VERSION = null;

var Promise = require('bluebird');
var clientVersion = require('../../package.json').version;
var userAgent = 'Lob/v1 NodeBindings/' + clientVersion;

var initResources = function () {
  var i = 0, l = this.resources.length, resource;

  for(; i < l; i++) {
    resource = this.resources[i];
    this[resource] = require('./' + resource);
    this[resource] = new this[resource](this);
  }
};

var Lob = function (apiKey) {
  /* istanbul ignore next */
  if (this === undefined) {
    return new Lob(apiKey);
  }
  if (typeof apiKey === 'string') {
    this.endpoint = 'https://api.lob.com/v1/';
    this.apiKey = apiKey;
    this.userAgent = userAgent;
  } else {
    throw new Error('API Key must be set');
  }

  this.headers = {
    'user-agent': this.userAgent
  };

  this.resources = [
    'jobs',
    'addresses',
    'verification',
    'countries',
    'states',
    'objects',
    'settings',
    'services',
    'packagings',
    'postcards',
    'checks',
    'bankAccounts',
    'areas',
    'routes'
  ];

  initResources.call(this);
};

Lob.prototype.setHost = function (host) {
  this.endpoint = host;
  initResources.call(this);
};

Lob.prototype.setVersion = function (version) {
  this.apiVersion = version;
  this.headers['Lob-Version'] = this.apiVersion;
  initResources.call(this);
};

Lob.prototype.promisify = function () {
  var self = Promise.promisifyAll(this);

  self.resources.forEach(function (resource) {
    self[resource] = Promise.promisifyAll(self[resource]);
  });

  return self;
};

module.exports = Lob;
