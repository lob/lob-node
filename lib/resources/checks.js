'use strict';

const ResourceBase = require('./resourceBase');

class Checks extends ResourceBase {

  constructor (config) {
    super('checks', config);
  }

  list (options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    return this._transmit('GET', null, options, null, callback);
  }

  delete (id, callback) {
    return this._transmit('DELETE', id, null, null, callback);
  }

  retrieve (id, callback) {
    return this._transmit('GET', id, null, null, callback);
  }

  create (params, headers, callback) {
    return this._transmit('POST', null, null, params, headers, callback);
  }

}

module.exports = Checks;
