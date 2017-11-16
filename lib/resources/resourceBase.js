'use strict';

const Bluebird  = require('bluebird');
const Request   = require('request');
const Stream    = require('stream');

class ResourceBase {

  constructor(endpoint, config) {
    this.uri    = `${config.options.host}${endpoint}`;
    this.config = config.options;
  }

  _transmit (method, uri, qs, form, headers, callback) {
    if (typeof headers === 'function') {
      callback = headers;
      headers = {};
    }
    else {
      headers = headers || {};
    }

    for (let headerKey in headers) {
      this.config.headers[headerKey] = headers[headerKey];
    }

    const opts = {
      url: `${this.uri}${uri ? `/${uri}` : ''}`,
      method: method,
      auth: { user: this.config.apiKey, password: '' },
      headers: this.config.headers,
      json: true
    };

    let isMultiPartForm = false;

    for (let key in form) {
      if (form[key] === true || form[key] === false) {
        form[key] = form[key].toString();
      }
    }

    for (let param in form) {
      const val = form[param];

      if (val instanceof Stream.Stream) {
        isMultiPartForm = true;
        break;
      }

      if (val !== undefined && val !== null && Object.prototype.hasOwnProperty.call(val, 'value')) {
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

    return new Bluebird (function (resolve, reject) {
      Request(opts, function (err, resp, body) {

        /* istanbul ignore next */
        if (err) {
          return reject(err);
        }

        if (body && body.error) {
          const error = new Error(body.error.message);
          error.status_code = body.error.status_code;
          error._response = resp;
          return reject(error);
        }

        if (resp && resp.statusCode >= 500) {
          const error = new Error(resp.statusMessage);
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
  }

};

module.exports = ResourceBase;
