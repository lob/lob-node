'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Objects = function (config) {
  ResourceBase.call(this, 'objects', config);
};

util.inherits(Objects, ResourceBase);

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
    var isBuffer;

    for (var p in params) {

      if (p !== 'file') {
        continue;
      }

      isBuffer = Buffer.isBuffer(params[p]);

      if (isBuffer) {
        params[p] = { value: params[p], options: { filename: 'file.pdf' } };
      }
    }

    return this._transmit('POST', null, null, params, callback);
  };

}).call(Objects.prototype);

module.exports = Objects;
