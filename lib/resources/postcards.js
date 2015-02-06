var fs = require('fs');
var Postcards;
var request = require('request');

function Postcards (config) {
  this.uri = config.endpoint + 'postcards';
  this.apiKey = config.apiKey;
  this.userAgent = config.userAgent;
  this.apiVersion = config.apiVersion;
  return this;
}

Postcards.prototype.retrieve = function (id, done) {
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

Postcards.prototype.list = function (options, done) {
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

Postcards.prototype.create = function (params, done) {
  var opts = {
    url: this.uri,
    auth: {
      user: this.apiKey,
      password: ''
    },
    headers: this.headers,
    json: true
  };

  var req = request.post(opts, function (e, r, body) {
    if (body && body.errors) {
      done(body.errors, body);
    } else {
      done(e, body);
    }
  });
  var form = req.form();

/* istanbul ignore else */
  if (params.front) {
    if (!(params.front instanceof Buffer) && params.front.substr(0,1) === '@') {
      params.front = fs.createReadStream(params.front.substr(1));
      form.append('front', params.front);
    } else if (params.front instanceof Buffer) {
      form.append('front', params.front, {filename: 'front.pdf'});
    } else {
      form.append('front', params.front);
    }
  }

  if (params.back) {
    if (!(params.back instanceof Buffer) && params.back.substr(0,1) === '@') {
      params.back = fs.createReadStream(params.back.substr(1));
      form.append('back', params.back);
    } else if (params.back instanceof Buffer) {
      form.append('back', params.back, {filename: 'back.pdf'});
    } else {
      form.append('back', params.back);
    }
  }

  for (var p in params) {
    if (p !== 'front' && p !== 'back') {
      if (params[p] instanceof Object && !(params[p] instanceof Buffer)) {
        for (var p2 in params[p]) {
          form.append(p + '[' + p2 + ']', params[p][p2]);
        }
      } else {
        form.append(p, params[p]);
      }
    }
  }
};

module.exports = Postcards;
