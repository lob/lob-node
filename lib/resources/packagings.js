var Packagings;
var request = require('request');

function Packagings (config) {
  this.uri = config.endpoint + 'packagings';
  this.apiKey = config.apiKey;
  this.userAgent = config.userAgent;
  this.apiVersion = config.apiVersion;
  return this;
}

Packagings.prototype.retrieve = function (id, done) {
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

Packagings.prototype.list = function (done) {
  request(
    {
      url: this.uri,
      auth: {
        user: this.apiKey,
        password: ''
      },
      headers: this.headers,
      json: true,
      method: 'GET'
    }, function (e, r, body) {
      /* istanbul ignore if */
      if (body && body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
};

module.exports = Packagings;
