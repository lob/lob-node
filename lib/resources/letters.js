'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Letters = function (config) {
  ResourceBase.call(this, 'letters', config);
};

util.inherits(Letters, ResourceBase);

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

  this.create = function (params, callback) {

    var isBuffer;

    if (params.file) {
      isBuffer = Buffer.isBuffer(params.file);

      if (isBuffer) {
        params.file = {
          value: params.file,
          options: { filename: 'file.pdf' }
        };
      }
    }

    for (var p in params) {

      if (p === 'file' || !(params[p] instanceof Object)) {
        continue;
      }

      for (var key in params[p]) {
        params[p + '[' + key + ']'] = params[p][key];
      }

      delete params[p];
    }

    return this._transmit('POST', null, null, params, callback);
  };

}).call(Letters.prototype);

module.exports = Letters;
