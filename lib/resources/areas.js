var Areas;
var request = require('request');
var fs      = require('fs');

function Areas (config) {
  this.uri = config.endpoint + 'areas';
  this.apiKey = config.apiKey;
  this.userAgent = config.userAgent;
  this.apiVersion = config.apiVersion;
  return this;
}

Areas.prototype.retrieve = function (id, done) {
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
        done(body.errors);
      } else {
        done(e, body);
      }
    });
};

Areas.prototype.list = function (options, done) {
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

Areas.prototype.create = function (params, done) {
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

  /* istanbul ignore else */
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

  /* istanbul ignore else */
  if (params.routes) {
    params.routes.forEach(function (rt) {
      form.append('routes', rt);
    });
  }

  Object.keys(params).forEach(function (p) {
    if (p !== 'front' && p !== 'back' && p !== 'routes') {
      form.append(p, params[p]);
    }
  });
};

module.exports = Areas;
