'use strict';

const ClientVersion = require('../package.json').version;
const Resources     = require('./resources');

const LOB_HOST = process.env.LOB_HOST || 'https://api.lob.com/v1/';
const LOB_USERAGENT = `Lob/v1 NodeBindings/${ClientVersion}`;

const LobClient = function (apiKey, options) {

  if (!(this instanceof LobClient)) {
    return new LobClient(apiKey, options);
  }

  this.resourceBase = require('./resources/resourceBase');

  if (apiKey && typeof apiKey === 'object') {
    options = apiKey;
    apiKey = null;
  }

  this.options = {
    apiKey,
    host: LOB_HOST,
    userAgent: LOB_USERAGENT,
    headers: { 'user-agent': LOB_USERAGENT }
  };

  if (options && typeof options === 'object') {

    if (Reflect.apply(Object.prototype.hasOwnProperty, options, ['apiVersion'])) {
      this.options.headers['Lob-Version'] = options.apiVersion;
    }

    for (const key in options) {
      this.options[key] = options[key];
    }

  }

  this._initResources();
};

Reflect.apply(function () {

  this._initResources = function () {
    const services = Object.keys(Resources);

    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      this[service] = new Resources[service](this);
    }
  };

}, LobClient.prototype, []);

module.exports = LobClient;
