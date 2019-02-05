'use strict';

const ResourceBase = require('./resourceBase');

class Letters extends ResourceBase {

  constructor (config) {
    super('letters', config);
  }

  list (options, callback) {

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    return this._transmit('GET', null, options, null, callback);
  }

  retrieve (id, callback) {
    return this._transmit('GET', id, null, null, callback);
  }

  delete (id, callback) {
    return this._transmit('DELETE', id, null, null, callback);
  }

  create (params, headers, callback) {

    let isBuffer;

    if (params.file) {
      isBuffer = Buffer.isBuffer(params.file);

      if (isBuffer) {
        params.file = {
          value: params.file,
          options: { filename: 'file.pdf' }
        };
      }
    }

    for (const p in params) {

      if (p === 'file' || !(params[p] instanceof Object)) {
        continue;
      }

      for (const key in params[p]) {
        params[`${p}[${key}]`] = params[p][key];
      }

      delete params[p];
    }

    return this._transmit('POST', null, null, params, headers, callback);
  }

}

module.exports = Letters;
