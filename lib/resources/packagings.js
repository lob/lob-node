'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Packagings = function (config) {
  ResourceBase.call(this, 'packagings', config);
};

util.inherits(Packagings, ResourceBase);

(function () {

  this.list = function (callback) {
    return this._transmit('GET', null, null, null, callback);
  };

  this.retrieve = function (id, callback) {
    return this._transmit('GET', id, null, null, callback);
  };

}).call(Packagings.prototype);

module.exports = Packagings;
