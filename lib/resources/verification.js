'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Verification = function (config) {
  ResourceBase.call(this, 'verify', config);
};

util.inherits(Verification, ResourceBase);

(function () {

  this.verify = function (params, callback) {
    return this._transmit('POST', null, null, params, callback);
  };

}).call(Verification.prototype);

module.exports = Verification;
