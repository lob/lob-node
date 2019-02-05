'use strict';

const ResourceBase = require('./resourceBase');

class USZipLookups extends ResourceBase {

  constructor (config) {
    super('us_zip_lookups', config);
  }

  lookup (params, callback) {
    return this._transmit('POST', null, null, params, callback);
  }

}

module.exports = USZipLookups;
