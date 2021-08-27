'use strict';

const ResourceBase = require('./resourceBase');

class BulkIntlVerifications extends ResourceBase {

  constructor (config) {
    super('bulk/intl_verifications', config);
  }

  verify (params, callback) {
    return this._transmit('POST', null, null, params, callback);
  }

}

module.exports = BulkIntlVerifications;
