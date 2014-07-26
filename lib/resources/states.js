var States;
var request = require('request');

function States (config) {
  this.uri = config.endpoint + 'states';
  this.apiKey = config.apiKey;
  return this;
}

States.prototype.list = function (done) {
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
      method: 'GET'
    }, function (e, r, body) {
      done(e, body);
    });
};

module.exports = States;
