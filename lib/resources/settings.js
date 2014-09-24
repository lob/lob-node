var Settings;
var request = require('request');

function Settings (config) {
  this.uri = config.endpoint + 'settings';
  this.apiKey = config.apiKey;
  this.userAgent = config.userAgent;
  return this;
}

Settings.prototype.retrieve = function (id, done) {
  request(
    {
      url: this.uri + '/' + id,
      auth: {
        user: this.apiKey,
        password: ''
      },
      headers: {
        'User-Agent': this.userAgent
      },
      json: true,
      method: 'GET'
    }, function (e, r, body) {
      if (body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
};

Settings.prototype.list = function (done) {
  request(
    {
      url: this.uri,
      auth: {
        user: this.apiKey,
        password: ''
      },
      headers: {
        'User-Agent': this.userAgent
      },
      json: true,
      method: 'GET'
    }, function (e, r, body) {
      /* istanbul ignore if */
      if (body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
};

module.exports = Settings;
