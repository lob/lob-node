'use strict';

const axios = require('axios');
const FormDataLib = require('form-data');
const Stream = require('stream');

// Helper to create a compatibility response object from axios response
const createCompatResponse = (axiosResp) => Object.assign({}, axiosResp, {
  statusCode: axiosResp.status,
  statusMessage: axiosResp.statusText
});

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

    // Encode URI to prevent path traversal, but only for simple IDs
    // Composite paths (containing /) should be encoded by the caller
    const encodedUri = uri && !uri.includes('/') ? encodeURIComponent(uri) : uri;

    const config = {
      url: `${this.uri}${encodedUri ? `/${encodedUri}` : ''}`,
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
    let requiresJson = false;

    Object.keys(form || {}).forEach((key) => {
      if (form[key] === undefined) {
        Reflect.deleteProperty(form, key);
      }
      if (form[key] === true || form[key] === false) {
        form[key] = form[key].toString();
      }
    });

    Object.keys(form || {}).forEach((param) => {
      const val = form[param];

      if (val instanceof Stream.Stream) {
        isMultiPartForm = true;
      }

      if (val !== undefined && val !== null && Reflect.apply(Object.prototype.hasOwnProperty, val, ['value'])) {
        isMultiPartForm = true;
      }

      // Check if array contains objects (requires JSON encoding)
      if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object') {
        requiresJson = true;
      }
    });

    if (qs) {
      config.params = qs;
    }

    if (form) {
      if (isMultiPartForm) {
        const formData = new FormDataLib();

        Object.keys(form).forEach((key) => {
          const val = form[key];

          if (val instanceof Stream.Stream) {
            formData.append(key, val);
          } else if (val !== undefined && val !== null && Reflect.apply(Object.prototype.hasOwnProperty, val, ['value'])) {
            formData.append(key, val.value, val.options);
          } else if (val !== undefined && val !== null) {
            formData.append(key, val);
          }
        });

        config.data = formData;
        config.headers = Object.assign({}, config.headers, formData.getHeaders());
      } else if (requiresJson) {
        // Use JSON for requests with nested objects (e.g., bulk verifications)
        config.data = form;
        config.headers['Content-Type'] = 'application/json';
      } else {
        const params = new URLSearchParams();
        Object.keys(form).forEach((key) => {
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
        });
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
          error._response = createCompatResponse(resp);
          throw error;
        }

        if (resp.status >= 500) {
          const error = new Error(resp.statusText);
          error.status_code = resp.status;
          error._response = createCompatResponse(resp);
          throw error;
        }

        const compatResponse = createCompatResponse(resp);

        Reflect.defineProperty(body, '_response', {
          enumerable: false,
          writable: false,
          value: compatResponse
        });

        return body;
      })
      .catch((err) => {
        // Re-throw errors that were already processed in .then() block
        // (they have _response attached)
        /* istanbul ignore next */
        if (err._response) {
          throw err;
        }

        // Network errors (no response from server) - just re-throw
        // Note: HTTP status errors are handled in .then() since validateStatus: () => true
        throw err;
      });

    if (callback) {
      promise.then((body) => callback(null, body), (err) => callback(err));
    }

    return promise;
  }

}

module.exports = ResourceBase;
