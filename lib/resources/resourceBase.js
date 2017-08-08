'use strict';

var stream    = require('stream');
var request   = require('request');
var BBPromise = require('bluebird');

var ResourceBase = function (endpoint, config) {
  this.uri    = config.options.host + endpoint;
  this.config = config.options;
};

(function () {

  this._transmit = function (method, uri, qs, form, headers, callback) {

    if (typeof headers === "function") {
      callback = headers;
      headers = {};
    }
    else {
      headers = headers || {};
    }

    for (var headerKey in headers) {
      this.config.headers[headerKey] = headers[headerKey];
    }

    var opts = {
      url: this.uri + (uri ? '/' + uri : ''),
      method: method,
      auth: { user: this.config.apiKey, password: '' },
      headers: this.config.headers,
      json: true
    };

    var isMultiPartForm = false;

    for (var key in form) {
      if (form[key] === true || form[key] === false) {
        form[key] = form[key].toString();
      }
    }

    for (var param in form) {
      var val = form[param];

      if (val instanceof stream.Stream) {
        isMultiPartForm = true;
        break;
      }

      if (val !== undefined && val !== null && val.hasOwnProperty('value')) {
        isMultiPartForm = true;
        break;
      }
    }

    if (qs) {
      opts.qs = qs;
    }

    if (form) {
      if (isMultiPartForm) {
        opts.formData = form;
      } else {
        opts.form = form;
      }
    }

    return new BBPromise(function (resolve, reject) {
      request(opts, function (err, resp, body) {

        /* istanbul ignore next */
        if (err) {
          return reject(err);
        }

        if (body && body.error) {
          var error = new Error(body.error.message);
          error.status_code = body.error.status_code;
          error._response = resp;
          return reject(error);
        }

        if (resp && resp.statusCode >= 500) {
          var error = new Error(resp.statusMessage);
          error.status_code = resp.statusCode;
          error._response = resp;
          return reject(error);
        }

        Object.defineProperty(body, '_response', {
          enumerable: false,
          writable: false,
          value: resp
        });

        return resolve(body);
      });
    }).nodeify(callback);
  };

}).call(ResourceBase.prototype);

module.exports = ResourceBase;
