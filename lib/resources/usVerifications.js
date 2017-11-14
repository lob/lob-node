'use strict';

const ResourceBase = require('./resourceBase');

module.exports = class USVerifications extends ResourceBase {

  constructor (config) {
    super('us_verifications', config);
  }

  verify (params, callback) {
    return this._transmit('POST', null, null, params, callback);
  };

};
