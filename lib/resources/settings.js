'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Settings = function (config) {
  ResourceBase.call(this, 'settings', config);
};

util.inherits(Settings, ResourceBase);

(function () {

  this.list = function (options, callback) {

    if (typeof options === 'function') {
      callback = options;
      options  = null;
    }

    return this._transmit('GET', null, options, null, callback);
  };

  this.retrieve = function (id, callback) {
    return this._transmit('GET', id, null, null, callback);
  };

}).call(Settings.prototype);

module.exports = Settings;
