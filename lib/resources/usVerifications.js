'use strict';

const ResourceBase = require('./resourceBase');

class USVerifications extends ResourceBase {

  constructor (config) {
    super('us_verifications', config);
  }

  verify (params, qs, callback) {
    if (typeof qs === 'function') {
      callback = qs;
      qs = {};
    }

    return this._transmit('POST', null, qs, params, null, callback);
  }

}

module.exports = USVerifications;
