'use strict';

const Bluebird = require('bluebird');
const Request  = require('request');
const Stream   = require('stream');

class ResourceBase {

  constructor (endpoint, config) {
    this.uri = `${config.options.host}${endpoint}`;
    this.config = config.options;
  }

  _transmit (method, uri, qs, form, headers, callback) {
    if (typeof headers === 'function') {
      callback = headers;
      headers = {};
    } else {
      headers = headers || {};
    }

    const allHeaders = Object.assign({}, this.config.headers, headers);

    const opts = {
      url: `${this.uri}${uri ? `/${uri}` : ''}`,
      method,
      auth: { user: this.config.apiKey, password: '' },
      headers: allHeaders,
      json: true
    };

    let isMultiPartForm = false;

    for (const key in form) {
      if (form[key] === undefined) {
        delete form[key];
      }
      if (form[key] === true || form[key] === false) {
        form[key] = form[key].toString();
      }
    }

    for (const param in form) {
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

    return new Bluebird((resolve, reject) => {
      Request(opts, (err, resp, body) => {
        body = body || {};

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

}

module.exports = ResourceBase;
