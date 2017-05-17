'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var IntlVerifications = function (config) {
  ResourceBase.call(this, 'intl_verifications', config);
};

util.inherits(IntlVerifications, ResourceBase);

(function () {

  this.verify = function (params, callback) {
    return this._transmit('POST', null, null, params, callback);
  };

}).call(IntlVerifications.prototype);

module.exports = IntlVerifications;
