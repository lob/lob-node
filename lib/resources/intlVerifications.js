'use strict';

const ResourceBase = require('./resourceBase');

class IntlVerifications extends ResourceBase {

  constructor (config) {
    super('intl_verifications', config);
  }

  verify (params, callback) {
    return this._transmit('POST', null, null, params, callback);
  }

}

module.exports = IntlVerifications;
