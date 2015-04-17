'use strict';

var resources     = require('./resources');
var clientVersion = require('../package.json').version;

var LOB_HOST      = 'https://api.lob.com/v1/';
var LOB_USERAGENT = 'Lob/v1 NodeBindings/' + clientVersion;

var Lob = function(apiKey, options) {

  if(!(this instanceof Lob)) {
    return new Lob(apiKey, options);
  }

  this.resourceBase = require('./resources/resourceBase');

  if(apiKey && typeof apiKey === 'object') {
    options = apiKey;
    apiKey = null;
  }

  this.options = {
    apiKey:    apiKey,
    host:      LOB_HOST,
    userAgent: LOB_USERAGENT,
    headers: { 'user-agent' : LOB_USERAGENT }
  };

  if(options && typeof options === 'object') {

    if(options.hasOwnProperty('apiVersion')) {
      this.options.headers['Lob-Version'] = options.apiVersion;
    }

    var opts = {}, key;
    for(key in this.options) { opts[key] = this.options[key]; }
    for(key in options)      { opts[key] = options[key];      }

    this.options = opts;
  }

  this._initResources();
};

(function() {

  this._initResources = function() {
    var services = Object.keys(resources);
    var i = 0, l = services.length, service;

    for(; i < l; i++) {
      service = services[i];
      this[service] = new resources[service](this);
    }
  };

}).call(Lob.prototype);

module.exports = Lob;
