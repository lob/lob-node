'use strict';
// var Lob = {};
// Lob.DEFAULT_HOST = 'api.Lob.com';
// Lob.DEFAULT_PORT = '443';
// Lob.DEFAULT_BASE_PATH = '/v1/';
// Lob.DEFAULT_API_VERSION = null;
//var USER_AGENT = 'Lob/node.js wrapper/1.0.0';

var Jobs = require('./resources/jobs');
var Addresses = require('./resources/addresses');
var Verification = require('./resources/verification');
var Countries = require('./resources/countries');
var States = require('./resources/states');
var Objects = require('./resources/objects');
var Settings = require('./resources/settings');
var Services = require('./resources/services');
var Postcards = require('./resources/postcards');
var Checks = require('./resources/checks');
var BankAccounts = require('./resources/bankAccounts');

var Lob = function (apiKey) {
  if (typeof apiKey === 'string') {
    this.endpoint = 'https://api.lob.com/v1/';
    this.apiKey = apiKey;
  } else {
    throw new Error('API Key must be set');
  }
  this.jobs = new Jobs(this);
  this.addresses = new Addresses(this);
  this.verification = new Verification(this);
  this.states = new States(this);
  this.countries = new Countries(this);
  this.objects = new Objects(this);
  this.settings = new Settings(this);
  this.services = new Services(this);
  this.postcards = new Postcards(this);
  this.checks = new Checks(this);
  this.bankAccounts = new BankAccounts(this);
};

module.exports = Lob;
