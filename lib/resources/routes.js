var Routes;
var request = require('request');

function Routes (config) {
  this.uri = config.endpoint + 'routes';
  this.apiKey = config.apiKey;
  return this;
}

Routes.prototype.list = function (params, done) {
  var opts = {
      url: this.uri,
      auth: {
        user: this.apiKey,
        password: ''
      },
      qs: {
        /* jshint camelcase: false */
        zip_codes: params.zip_codes
        /* jshint camelcase: true */
      },
      headers: {
        'User-Agent': 'Lob Node.js Wrapper'
      },
      json: true
  };

  request.get(opts, function (e, r, body) {
    if (body.errors) {
      done(body.errors, body);
    } else {
      done(e, body);
    }
  });
};

module.exports = Routes;
