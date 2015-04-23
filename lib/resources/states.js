'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var States = function (config) {
  ResourceBase.call(this, 'states', config);
};

util.inherits(States, ResourceBase);

(function () {

  this.list = function (callback) {
    return this._transmit('GET', null, null, null, callback);
  };

}).call(States.prototype);

module.exports = States;
