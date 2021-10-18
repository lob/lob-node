'use strict';

const ResourceBase = require('./resourceBase');

class Cards extends ResourceBase {

  constructor (config) {
    super('cards', config);
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

  update (id, params, callback) {
    return this._transmit('POST', id, null, params, callback);
  }

  delete (id, callback) {
    return this._transmit('DELETE', id, null, null, callback);
  }

  create (params, headers, callback) {
    let isBuffer;

    if (params.front) {
      isBuffer = Buffer.isBuffer(params.front);

      if (isBuffer) {
        params.front = {
          value: params.front,
          options: { filename: 'front.pdf' }
        };
      }
    }

    if (params.back) {
      isBuffer = Buffer.isBuffer(params.back);

      if (isBuffer) {
        params.back = {
          value: params.back,
          options: { filename: 'back.pdf' }
        };
      }
    }

    for (const p in params) {

      if (p === 'merge_variables' && params[p] instanceof Object) {
        params[p] = JSON.stringify(params[p]);
      }

      if (p === 'front' || p === 'back' || !(params[p] instanceof Object)) {
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

module.exports = Cards;
