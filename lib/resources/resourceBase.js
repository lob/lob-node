'use strict';

var request = require('request');
var Promise = require('bluebird');

var ResourceBase = function(endpoint, config) {
  this.uri    = config.options.baseURI + endpoint;
  this.config = config.options;
};

(function() {

  this._transmit = function(method, uri, options, callback) {
    var opts = {
      url:     this.uri + (uri ? '/' + uri : ''),
      method:  method,
      auth:    { user: this.config.apiKey, password: '' },
      headers: this.config.headers,
      json:    true,
      qs:      options
    };

    return new Promise(function(resolve, reject) {
      request(opts, function(err, resp, body) {
        if(err) return reject(err);
        if(body && body.errors) return reject(body.errors);
        return resolve(body);
      });
    }).nodeify(callback);
  };

}).call(ResourceBase.prototype);

module.exports = ResourceBase;
