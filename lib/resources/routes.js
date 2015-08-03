'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Routes = function (config) {
  ResourceBase.call(this, 'routes', config);
};

util.inherits(Routes, ResourceBase);

(function () {

  this.list = function (params, callback) {
    return this._transmit('GET', null, params, null, callback);
  };

  this.retrieve = function (id, callback) {
    return this._transmit('GET', id, null, null, callback);
  };

}).call(Routes.prototype);

module.exports = Routes;
