'use strict';

var resources     = require('./resources');
var clientVersion = require('../package.json').version;

var LOB_ENDPOINT  = 'https://api.lob.com/v1/';
var LOB_USERAGENT = 'Lob/v1 NodeBindings/' + clientVersion;

var Lob = function(apiKey, apiVersion, options) {

  if(!(this instanceof Lob)) {
    return new Lob(apiKey, apiVersion, options);
  }

  this.options = {
    apiKey:    apiKey,
    baseURI:   LOB_ENDPOINT,
    userAgent: LOB_USERAGENT,
    headers: { 'user-agent' : LOB_USERAGENT }
  };

  if(apiVersion) {
    this.options.headers['Lob-Version'] = apiVersion;
  }

  if(options && typeof options == 'object') {
    var opts = {};
    for(var key in this.options) { opts[key] = this.options[key]; }
    for(var key in options)      { opts[key] = options[key];      }

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
