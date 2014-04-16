var Addresses;
var request = require('request');


function Addresses(config) {
  this.uri = config.endpoint + 'addresses';
  this.apiKey = config.apiKey;
  return this;
}

Addresses.prototype.retrieve = function(id, done){
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

Addresses.prototype.delete = function(id, done){
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

Addresses.prototype.list = function(count,offset, done){
  request(
    {
      url:this.uri + '/',
      auth: {
        user: this.apiKey,
        password: ''
      },
      qs:{
        count: count,
        offset: offset
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

Addresses.prototype.create = function(params, done) {
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

module.exports = Addresses;
