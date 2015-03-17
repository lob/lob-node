'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Settings = function(config) {
  ResourceBase.call(this, 'settings', config);
};

util.inherits(Settings, ResourceBase);

(function() {

  this.list = function(options, callback) {
    return this._transmit('GET', null, options, callback);
  };

  this.retrieve = function(id, callback) {
    return this._transmit('GET', id, null, callback);
  };

}).call(Settings.prototype);

module.exports = Settings;
