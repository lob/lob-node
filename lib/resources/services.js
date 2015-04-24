'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Services = function (config) {
  ResourceBase.call(this, 'services', config);
};

util.inherits(Services, ResourceBase);

(function () {

  this.list = function (callback) {
    return this._transmit('GET', null, null, null, callback);
  };

  this.retrieve = function (id, callback) {
    return this._transmit('GET', id, null, null, callback);
  };

}).call(Services.prototype);

module.exports = Services;
