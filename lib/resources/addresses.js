var Addresses;
var request = require('request');

function Addresses (config) {
  this.uri = config.endpoint + 'addresses';
  this.apiKey = config.apiKey;
  this.userAgent = config.userAgent;
  this.apiVersion = config.apiVersion;
  return this;
}

Addresses.prototype.retrieve = function (id, done) {
  request(
    {
      url: this.uri + '/' + id,
      auth: {
        user: this.apiKey,
        password: ''
      },
      headers: this.headers,
      json: true,
      method: 'GET'
    }, function (e, r, body) {
      if (body && body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
};

Addresses.prototype.delete = function (id, done) {
  request(
    {
      url: this.uri + '/' + id,
      auth: {
        user: this.apiKey,
        password: ''
      },
      headers: this.headers,
      json: true,
      method: 'DELETE'
    }, function (e, r, body) {
      if (body && body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
};

Addresses.prototype.list = function (options, done) {
  var count;
  var offset;
  if (typeof options === 'function') {
    count = 10;
    offset = 0;
    done = options;
  } else {
    count = options.count || 10;
    offset = options.offset || 0;
  }

  var reqOptions = {
    url: this.uri,
    auth: {
      user: this.apiKey,
      password: ''
    },
    qs: {
      count: count,
      offset: offset
    },
    headers: this.headers,
    json: true,
    method: 'GET'
  };

  request(reqOptions, function (e, r, body) {
      if (body && body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
};

Addresses.prototype.create = function (params, done) {
  var options = {
    url: this.uri,
    auth: {
      user: this.apiKey,
      password: ''
    },
    headers: this.headers,
    json: true,
    form: params,
    method: 'POST'
  };

  request(options, function (e, r, body) {
      if (body && body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
};

module.exports = Addresses;
