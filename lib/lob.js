'use strict';
// var Lob = {};
// Lob.DEFAULT_HOST = 'api.Lob.com';
// Lob.DEFAULT_PORT = '443';
// Lob.DEFAULT_BASE_PATH = '/v1/';
// Lob.DEFAULT_API_VERSION = null;

var jobs = require('./resources/jobs');
var addresses = require('./resources/addresses');
var verification = require('./resources/verification');
var countries = require('./resources/countries');
var states = require('./resources/states');
var objects = require('./resources/objects');
var settings = require('./resources/settings');
var services = require('./resources/services');
// var postcards = require('./postcards');
var checks = require('./resources/checks');
var bankAccounts = require('./resources/bankAccounts');
var request = require('request');
var USER_AGENT = 'Lob/node.js wrapper/1.0.0';

var Lob = function (apiKey) {
  if (typeof apiKey === 'string') {
    this.endpoint = 'https://api.lob.com/v1/';
    this.apiKey = apiKey;
  } else {
    throw new Error('API Key must be set');
  }
  this.jobs = new jobs(this);
  this.addresses = new addresses(this);
  this.verification = new verification(this);
  this.states = new states(this);
  this.countries = new countries(this);
  this.objects = new objects(this);
  this.settings = new settings(this);
  this.services = new services(this);
  // this.postcards = new postcards(this);
  this.checks = new checks(this);
  this.bankAccounts = new bankAccounts(this);
};

Lob.prototype.request = function(method, path, data, callback) {
    var form, r, requestObject;
    method = method.toUpperCase();
    requestObject = {
      method: method.split('_')[0],
      uri: '' + this.config.endpoint + path,
      headers: {
        'Accept': 'application/json',
        'Connection': 'close',
        'User-Agent': USER_AGENT
      },
      json: true,
      auth: {
        user: this.config.key,
        pass: ':'
      }
    };
    if (typeof data === 'function') {
      callback = data;
    } else if (method === 'GET') {
      requestObject.qs = data;
    } else if (method === 'POST') {
      requestObject.form = data;
    }
    r = request(requestObject, function(err, res, body) {
      body = JSON.parse(body);
      if ((body.errors !== null) && err === null) {
        err = body.errors;
        delete body.errors;
      }
      callback(err, body);
      return this;
    });
    if (method === 'POST_FORM') {
      form = r.form();
      Object.keys(data).forEach(function(_k) {
        if(data[_k] instanceof Object && _k !== 'front' && _k !== 'back') {
          Object.keys(data[_k]).forEach(function (key) {
            form.append(_k + '[' + key + ']', data[_k][key]);
          });
        } else if (data[_k] instanceof Buffer) {
          var options = {
            filename: _k + '.pdf'
          };
          form.append(_k, data[_k], options);
        } else {
          form.append(_k, data[_k]);
        }
      });
      return this;
    }
  };


module.exports = Lob;
