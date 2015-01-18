'use strict';
// var Lob = {};
// Lob.DEFAULT_HOST = 'api.Lob.com';
// Lob.DEFAULT_PORT = '443';
// Lob.DEFAULT_BASE_PATH = '/v1/';
// Lob.DEFAULT_API_VERSION = null;

var clientVersion = require('../../package.json').version;
var userAgent = 'Lob/v1 NodeBindings/' + clientVersion;

var Jobs = require('./jobs');
var Addresses = require('./addresses');
var Verification = require('./verification');
var Countries = require('./countries');
var States = require('./states');
var Objects = require('./objects');
var Settings = require('./settings');
var Services = require('./services');
var Packagings = require('./packagings');
var Postcards = require('./postcards');
var Checks = require('./checks');
var BankAccounts = require('./bankAccounts');
var Areas = require('./areas');
var Routes = require('./routes');

var Lob = function (apiKey) {
  /* istanbul ignore next */
  if (this === undefined) {
    return new Lob(apiKey);
  }
  if (typeof apiKey === 'string') {
    this.endpoint = 'https://api.lob.com/v1/';
    this.apiKey = apiKey;
    this.userAgent = userAgent;
  } else {
    throw new Error('API Key must be set');
  }

  this.headers = {
    'user-agent': this.useragent
  };

  this.jobs = new Jobs(this);
  this.addresses = new Addresses(this);
  this.verification = new Verification(this);
  this.states = new States(this);
  this.countries = new Countries(this);
  this.objects = new Objects(this);
  this.settings = new Settings(this);
  this.services = new Services(this);
  this.packagings = new Packagings(this);
  this.postcards = new Postcards(this);
  this.checks = new Checks(this);
  this.bankAccounts = new BankAccounts(this);
  this.areas = new Areas(this);
  this.routes = new Routes(this);
};

Lob.prototype.setHost = function (host) {
  this.endpoint = host;
  this.jobs = new Jobs(this);
  this.addresses = new Addresses(this);
  this.verification = new Verification(this);
  this.states = new States(this);
  this.countries = new Countries(this);
  this.objects = new Objects(this);
  this.settings = new Settings(this);
  this.services = new Services(this);
  this.packagings = new Packagings(this);
  this.postcards = new Postcards(this);
  this.checks = new Checks(this);
  this.bankAccounts = new BankAccounts(this);
  this.areas = new Areas(this);
  this.routes = new Routes(this);
};

Lob.prototype.setVersion = function (version) {
  this.apiVersion = version;
  this.headers['Lob-Version'] = this.apiVersion;
  this.jobs = new Jobs(this);
  this.addresses = new Addresses(this);
  this.verification = new Verification(this);
  this.states = new States(this);
  this.countries = new Countries(this);
  this.objects = new Objects(this);
  this.settings = new Settings(this);
  this.services = new Services(this);
  this.packagings = new Packagings(this);
  this.postcards = new Postcards(this);
  this.checks = new Checks(this);
  this.bankAccounts = new BankAccounts(this);
  this.areas = new Areas(this);
  this.routes = new Routes(this);
};

module.exports = Lob;
