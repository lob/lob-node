'use strict';

const ResourceBase = require('./resourceBase');

class Template extends ResourceBase {
  constructor (config) {
      super('templates', config);
  }

  list (options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    return this._transmit('GET', null, options, null, callback);
  }

  create (options, callback) {
    return this._transmit('POST', null, null, options, callback);
  }

  retrieve (id, callback) {
    return this._transmit('GET', id, null, null, callback);
  }

  delete (id, callback) {
    return this._transmit('DELETE', id, null, null, callback);
  }
}

module.exports = Template;