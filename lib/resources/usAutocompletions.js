'use strict';

const ResourceBase = require('./resourceBase');

class USAutocompletions extends ResourceBase {

  constructor (config) {
    super('us_autocompletions', config);
  }

  autocomplete (params, callback) {
    return this._transmit('POST', null, null, params, null, callback);
  }

}

module.exports = USAutocompletions;
