'use strict';

const axios = require('axios');
const FormDataLib = require('form-data');
const Stream = require('stream');

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

    const config = {
      url: `${this.uri}${uri ? `/${uri}` : ''}`,
      method,
      auth: { username: this.config.apiKey, password: '' },
      headers: allHeaders,
      validateStatus: () => true
    };

    if (this.config.agent) {
      const isHttps = this.uri.startsWith('https');
      if (isHttps) {
        config.httpsAgent = this.config.agent;
      } else {
        config.httpAgent = this.config.agent;
      }
    }

    let isMultiPartForm = false;

    for (const key in form) {
      if (form[key] === undefined) {
        Reflect.deleteProperty(form, key);
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

      if (val !== undefined && val !== null && Reflect.apply(Object.prototype.hasOwnProperty, val, ['value'])) {
        isMultiPartForm = true;
        break;
      }
    }

    if (qs) {
      config.params = qs;
    }

    if (form) {
      if (isMultiPartForm) {
        const formData = new FormDataLib();

        for (const key in form) {
          const val = form[key];

          if (val instanceof Stream.Stream) {
            formData.append(key, val);
          } else if (val !== undefined && val !== null && Reflect.apply(Object.prototype.hasOwnProperty, val, ['value'])) {
            formData.append(key, val.value, val.options);
          } else if (val !== undefined && val !== null) {
            formData.append(key, val);
          }
        }

        config.data = formData;
        config.headers = Object.assign({}, config.headers, formData.getHeaders());
      } else {
        const params = new URLSearchParams();
        for (const key in form) {
          const val = form[key];
          if (val !== undefined && val !== null) {
            if (Array.isArray(val)) {
              // Handle arrays: amounts[0]=23&amounts[1]=34
              val.forEach((item, index) => {
                params.append(`${key}[${index}]`, item);
              });
            } else {
              params.append(key, val);
            }
          }
        }
        config.data = params;
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      }
    }

    const promise = axios(config)
      .then((resp) => {
        /* istanbul ignore next */
        const body = resp.data || {};

        if (body && body.error) {
          const error = new Error(body.error.message);
          error.status_code = body.error.status_code;
          error._response = Object.assign({}, resp, {
            statusCode: resp.status,
            statusMessage: resp.statusText
          });
          throw error;
        }

        if (resp.status >= 500) {
          const error = new Error(resp.statusText);
          error.status_code = resp.status;
          error._response = Object.assign({}, resp, {
            statusCode: resp.status,
            statusMessage: resp.statusText
          });
          throw error;
        }

        const compatResponse = Object.assign({}, resp, {
          statusCode: resp.status,
          statusMessage: resp.statusText
        });

        Reflect.defineProperty(body, '_response', {
          enumerable: false,
          writable: false,
          value: compatResponse
        });

        return body;
      })
      .catch((err) => {
        /* istanbul ignore next */
        if (err._response) {
          throw err;
        }

        /* istanbul ignore next */
        if (err.response) {
          const body = err.response.data || {};

          if (body && body.error) {
            const apiError = new Error(body.error.message);
            apiError.status_code = body.error.status_code;
            apiError._response = Object.assign({}, err.response, {
              statusCode: err.response.status,
              statusMessage: err.response.statusText
            });
            throw apiError;
          }

          const networkError = new Error(err.message);
          networkError.status_code = err.response.status;
          networkError._response = Object.assign({}, err.response, {
            statusCode: err.response.status,
            statusMessage: err.response.statusText
          });
          throw networkError;
        }

        throw err;
      });

    if (callback) {
      promise.then((body) => callback(null, body), (err) => callback(err));
    }

    return promise;
  }

}

module.exports = ResourceBase;
