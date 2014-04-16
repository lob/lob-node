'use strict';
// var Lob = {};
// Lob.DEFAULT_HOST = 'api.Lob.com';
// Lob.DEFAULT_PORT = '443';
// Lob.DEFAULT_BASE_PATH = '/v1/';
// Lob.DEFAULT_API_VERSION = null;
//var USER_AGENT = 'Lob/node.js wrapper/1.0.0';


var jobs = require('./resources/jobs');
var addresses = require('./resources/addresses');
var verification = require('./resources/verification');
var countries = require('./resources/countries');
var states = require('./resources/states');
var objects = require('./resources/objects');
var settings = require('./resources/settings');
var services = require('./resources/services');
var postcards = require('./resources/postcards');
var checks = require('./resources/checks');
var bankAccounts = require('./resources/bankAccounts');


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
  this.postcards = new postcards(this);
  this.checks = new checks(this);
  this.bankAccounts = new bankAccounts(this);
};



module.exports = Lob;
