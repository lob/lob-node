var Countries;
var request = require('request');

function Countries (config) {
  this.uri = config.endpoint + 'countries';
  this.apiKey = config.apiKey;
  return this;
}

Countries.prototype.list = function (done) {
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

module.exports = Countries;
