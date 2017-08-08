'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Checks = function (config) {
  ResourceBase.call(this, 'checks', config);
};

util.inherits(Checks, ResourceBase);

(function () {

  this.list = function (options, callback) {

    if (typeof options === 'function') {
      callback = options;
      options  = {};
    }

    return this._transmit('GET', null, options, null, callback);
  };

  this.delete = function (id, callback) {
    return this._transmit('DELETE', id, null, null, callback);
  };

  this.retrieve = function (id, callback) {
    return this._transmit('GET', id, null, null, callback);
  };

  this.create = function (params, headers, callback) {
    return this._transmit('POST', null, null, params, headers, callback);
  };

}).call(Checks.prototype);

module.exports = Checks;
