var Checks;
var request = require('request');

function Checks (config) {
  this.uri = config.endpoint + 'checks';
  this.apiKey = config.apiKey;
  this.userAgent = config.userAgent;
  this.apiVersion = config.apiVersion;
  return this;
}

Checks.prototype.retrieve = function (id, done) {
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

Checks.prototype.list = function (options, done) {
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

  request(
    {
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
    }, function (e, r, body) {
      if (body && body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
};

Checks.prototype.create = function (params, done) {
  request(
    {
      url: this.uri,
      auth: {
        user: this.apiKey,
        password: ''
      },
      headers: this.headers,
      json: true,
      form: params,
      method: 'POST'
    }, function (e, r, body) {
      if (body && body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
};

module.exports = Checks;
