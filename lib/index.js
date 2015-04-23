'use strict';

var resources     = require('./resources');
var clientVersion = require('../package.json').version;

var LOB_HOST      = 'https://api.lob.com/v1/';
var LOB_USERAGENT = 'Lob/v1 NodeBindings/' + clientVersion;

var Lob = function (apiKey, options) {

  if (!(this instanceof Lob)) {
    return new Lob(apiKey, options);
  }

  this.resourceBase = require('./resources/resourceBase');

  if (apiKey && typeof apiKey === 'object') {
    options = apiKey;
    apiKey = null;
  }

  this.options = {
    apiKey:    apiKey,
    host:      LOB_HOST,
    userAgent: LOB_USERAGENT,
    headers: { 'user-agent': LOB_USERAGENT }
  };

  if (options && typeof options === 'object') {

    if (options.hasOwnProperty('apiVersion')) {
      this.options.headers['Lob-Version'] = options.apiVersion;
    }

    for (var key in options)      {
      this.options[key] = options[key];
    }

  }

  this._initResources();
};

(function () {

  this._initResources = function () {
    var services = Object.keys(resources);

    for (var i = 0; i < services.length; i++) {
      var service = services[i];
      this[service] = new resources[service](this);
    }
  };

}).call(Lob.prototype);

module.exports = Lob;
