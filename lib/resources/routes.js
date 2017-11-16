'use strict';

const ResourceBase = require('./resourceBase');

class Routes extends ResourceBase {

  constructor (config) {
    super('routes', config);
  }

  list (params, callback) {
    return this._transmit('GET', null, params, null, callback);
  };

  retrieve (id, callback) {
    return this._transmit('GET', id, null, null, callback);
  };

};

module.exports = Routes;
