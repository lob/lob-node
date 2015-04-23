'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Countries = function (config) {
  ResourceBase.call(this, 'countries', config);
};

util.inherits(Countries, ResourceBase);

(function () {

  this.list = function (callback) {
    return this._transmit('GET', null, null, null, callback);
  };

}).call(Countries.prototype);

module.exports = Countries;
