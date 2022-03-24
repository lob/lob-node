'use strict';

const ResourceBase = require('./resourceBase');

class USAutocompletions extends ResourceBase {

  constructor (config) {
    super('us_autocompletions', config);
  }

  autocomplete (params, query_param, callback) {
    if (typeof query_param === 'function') {
      callback = query_param;
      query_param = {};
    }
    return this._transmit('POST', null, query_param, params, null, callback);
  }

}

module.exports = USAutocompletions;
