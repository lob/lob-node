'use strict';

const ResourceBase = require('./resourceBase');

module.exports = class Addresses extends ResourceBase {

  constructor (config) {
    super('addresses', config);

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
      return this._transmit('POST', null, null, params, callback);
    };
  }
};
