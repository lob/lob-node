'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Checks = function(config) {
  ResourceBase.call(this, 'checks', config);
};

util.inherits(Checks, ResourceBase);

(function() {

  this.list = function(options, callback) {

    if(typeof options === 'function') {
      callback = options;
      options  = {};
    }

    options = {
      count:  options.count  || 10,
      offset: options.offset || 0
    };

    return this._transmit('GET', null, options, null, null, callback);
  };

  this.retrieve = function(id, callback) {
    return this._transmit('GET', id, null, null, null, callback);
  };

  this.create = function(params, callback) {
    return this._transmit('POST', null, null, params, null, callback);
  };

}).call(Checks.prototype);

module.exports = Checks;
