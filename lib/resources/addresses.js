'use strict';

const ResourceBase = require('./resourceBase');

class Addresses extends ResourceBase {

  constructor (config) {
    super('addresses', config);
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

  create (params, callback) {
    return this._transmit('POST', null, null, params, callback);
  }

}

module.exports = Addresses;
