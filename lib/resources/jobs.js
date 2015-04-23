'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Jobs = function (config) {
  ResourceBase.call(this, 'jobs', config);
};

util.inherits(Jobs, ResourceBase);

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

    var objects = params.objects;

    if (objects instanceof Array) {
      for (var i = 0; i < objects.length; i++) {

        var obj      = objects[i];
        var objCount = 'object' + (i + 1).toString();

        params[objCount] = obj;

        if (!obj.hasOwnProperty('file')) {
          continue;
        }

        var isBuffer = Buffer.isBuffer(obj.file);

        if (isBuffer) {
          params[objCount].file = {
            value: obj.file,
            options: { filename: 'file' + i + '.pdf' }
          };
        }
      }

      delete params.objects;
    } else {
      params.object1 = objects;
      delete params.objects;
    }

    for (var p in params) {
      if (!(params[p] instanceof Object)) {
        continue;
      }

      for (var key in params[p]) {
        params[p + '[' + key + ']'] = params[p][key];
      }

      delete params[p];
    }

    return this._transmit('POST', null, null, params, callback);
  };

}).call(Jobs.prototype);

module.exports = Jobs;
