'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var USVerifications = function (config) {
  ResourceBase.call(this, 'us_verifications', config);
};

util.inherits(USVerifications, ResourceBase);

(function () {

  this.verify = function (params, callback) {
    return this._transmit('POST', null, null, params, callback);
  };

}).call(USVerifications.prototype);

module.exports = USVerifications;
