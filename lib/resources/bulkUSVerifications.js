'use strict';

const ResourceBase = require('./resourceBase');

class BulkUSVerifications extends ResourceBase {

  constructor (config) {
    super('bulk/us_verifications', config);
  }

  verify (params, qs, callback) {
    if (typeof qs === 'function') {
      callback = qs;
      qs = {};
    }

    return this._transmit('POST', null, qs, params, null, callback);
  }

}

module.exports = BulkUSVerifications;
