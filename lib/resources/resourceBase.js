'use strict';

var request   = require('request');
var BBPromise = require('bluebird');

var ResourceBase = function(endpoint, config) {
  this.uri    = config.options.host + endpoint;
  this.config = config.options;
};

(function() {

  this._transmit = function(method, uri, qs, form, formData, callback) {

    var opts = {
      url:     this.uri + (uri ? '/' + uri : ''),
      method:  method,
      auth:    { user: this.config.apiKey, password: '' },
      headers: this.config.headers,
      json:    true
    };

    if(qs)       { opts.qs = qs;             }
    if(form)     { opts.form = form;         }
    if(formData) { opts.formData = formData; }

    return new BBPromise(function(resolve, reject) {
      request(opts, function(err, resp, body) {

        if(err) {
          return reject(err);
        }

        if(body && body.errors) {
          return reject(body.errors);
        }

        return resolve(body);
      });
    }).nodeify(callback);
  };

}).call(ResourceBase.prototype);

module.exports = ResourceBase;
