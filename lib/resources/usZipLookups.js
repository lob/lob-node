'use strict';

const util         = require('util');
const ResourceBase = require('./resourceBase');

const USZipLookups = function (config) {
  ResourceBase.call(this, 'us_zip_lookups', config);
};

util.inherits(USZipLookups, ResourceBase);

(function () {

  this.lookup = function (params, callback) {
    return this._transmit('POST', null, null, params, callback);
  };

}).call(USZipLookups.prototype);

module.exports = USZipLookups;
