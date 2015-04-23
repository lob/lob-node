'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Addresses = function (config) {
  ResourceBase.call(this, 'addresses', config);
};

util.inherits(Addresses, ResourceBase);

(function () {

  this.list = function (options, callback) {

    if (typeof options === 'function') {
      callback = options;
      options  = {};
    }

    return this._transmit('GET', null, options, null, callback);
  };

  this.retrieve = function (id, callback) {
    return this._transmit('GET', id, null, null, callback);
  };

  this.delete = function (id, callback) {
    return this._transmit('DELETE', id, null, null, callback);
  };

  this.create = function (params, callback) {
    return this._transmit('POST', null, null, params, callback);
  };

}).call(Addresses.prototype);

module.exports = Addresses;
