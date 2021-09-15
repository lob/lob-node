'use strict';

const ResourceBase = require('./resourceBase');

class USReverseGeocodeLookups extends ResourceBase {

  constructor (config) {
    super('us_reverse_geocode_lookups', config);
  }

  lookup (params, callback) {
    return this._transmit('POST', null, null, params, callback);
  }

}

module.exports = USReverseGeocodeLookups;