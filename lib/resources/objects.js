var Objects;
var request = require('request');
var fs = require('fs');

function Objects (config) {
  this.uri = config.endpoint + 'objects';
  this.apiKey = config.apiKey;
  return this;
}

Objects.prototype.retrieve = function (id, done) {
  request(
    {
      url: this.uri + '/' + id,
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
      if (body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
  return true;
};

Objects.prototype.list = function (options, done) {
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
      headers: {
        'User-Agent': 'Lob Node.js Wrapper'
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

Objects.prototype.create = function (params, done) {
  var opts = {
    url: this.uri,
    auth: {
      user: this.apiKey,
      password: ''
    },
    headers: {
      'User-Agent': 'Lob Node.js Wrapper'
    },
    json: true
  };

  var req = request.post(opts, function (e, r, body) {
    if (body.errors) {
      done(body.errors, body);
    } else {
      done(e, body);
    }
  });
  var form = req.form();

  for (var p in params) {
    if (p === 'file') {
      if (params[p] instanceof Buffer) {
        form.append(p, params[p], {filename: 'file.pdf'});
      } else if (params[p].substr(0,1) === '@') {
        params[p] = fs.createReadStream(params[p].substr(1));
        form.append(p, params[p]);
      } else {
        form.append(p, params[p]);
      }
    } else {
      form.append(p, params[p]);
    }
  }
};

module.exports = Objects;
