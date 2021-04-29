'use strict';

const ResourceBase = require('./resourceBase');

class SelfMailers extends ResourceBase {

  constructor (config) {
    super('self_mailers', config);
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

    if (params.outside) {
      isBuffer = Buffer.isBuffer(params.outside);

      if (isBuffer) {
        params.outside = {
          value: params.outside,
          options: { filename: 'outside.pdf' }
        };
      }
    }

    if (params.inside) {
      isBuffer = Buffer.isBuffer(params.inside);

      if (isBuffer) {
        params.inside = {
          value: params.inside,
          options: { filename: 'inside.pdf' }
        };
      }
    }

    for (const p in params) {

      if (p === 'merge_variables' && params[p] instanceof Object) {
        params[p] = JSON.stringify(params[p]);
      }

      if (p === 'outside' || p === 'inside' || !(params[p] instanceof Object)) {
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

module.exports = SelfMailers;
