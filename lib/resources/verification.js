var Verification;
var request = require('request');

function Verification (config) {
  this.uri = config.endpoint + 'verify';
  this.apiKey = config.apiKey;
  return this;
}

Verification.prototype.verify = function (params, done) {
  request(
    {
      url: this.uri,
      auth: {
        user: this.apiKey,
        password: ''
      },
      headers: {
        'User-Agent': 'Lob Node.js Wrapper'
      },
      json: true,
      form: params,
      method: 'POST'
    }, function (e, r, body) {
      if (body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
};

module.exports = Verification;
