'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var BankAccounts = function (config) {
  ResourceBase.call(this, 'bank_accounts', config);
};

util.inherits(BankAccounts, ResourceBase);

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
    return this._transmit('POST', null, null, params, callback);
  };

  this.verify = function (id, params, callback) {
    return this._transmit('POST', id + '/verify', null, params, callback);
  };

}).call(BankAccounts.prototype);

module.exports = BankAccounts;
