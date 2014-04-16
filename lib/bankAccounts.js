var BankAccounts;
var request = require('request');


function BankAccounts(config) {
  this.uri = config.endpoint + 'bank_accounts';
  this.apiKey = config.apiKey;
  return this;
}

BankAccounts.prototype.retrieve = function(id, done){
  request(
    {
      url:this.uri + '/' + id,
      auth: {
        user: this.apiKey,
        password: ''
      },
      headers:{
        'User-Agent': 'Lob Node.js Wrapper'
      },
      json:true,
      method: 'GET'
    }, function (e, r, body) {
      done(e, body);
    });
  return true;
};

BankAccounts.prototype.delete = function(id, done){
  request(
    {
      url:this.uri + '/' + id,
      auth: {
        user: this.apiKey,
        password: ''
      },
      headers:{
        'User-Agent': 'Lob Node.js Wrapper'
      },
      json:true,
      method: 'DELETE'
    }, function (e, r, body) {
      done(e, body);
    });
};

BankAccounts.prototype.list = function(options, done){
  request(
    {
      url:this.uri + '/',
      auth: {
        user: this.apiKey,
        password: ''
      },
      qs:{
        count: options.count,
        offset: options.offset
      },
      headers:{
        'User-Agent': 'Lob Node.js Wrapper'
      },
      json:true,
      method: 'GET'
    }, function (e, r, body) {
      done(e, body);
    });
};

BankAccounts.prototype.create = function(params, done) {
  request(
    {
      url:this.uri,
      auth: {
        user: this.apiKey,
        password: ''
      },
      headers:{
        'User-Agent': 'Lob Node.js Wrapper'
      },
      json:true,
      form:params,
      method: 'POST'
    }, function (e, r, body) {
      done(e, body);
    });
};

module.exports = BankAccounts;
