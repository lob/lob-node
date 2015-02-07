var fs = require('fs');
var Jobs;
var request = require('request');

function Jobs (config) {
  this.uri = config.endpoint + 'jobs';
  this.apiKey = config.apiKey;
  this.userAgent = config.userAgent;
  this.apiVersion = config.apiVersion;
  return this;
}

Jobs.prototype.retrieve = function (id, done) {
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

Jobs.prototype.list = function (options, done) {
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

Jobs.prototype.create = function (params, done) {
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

  for (var p in params) {
    if (p !== 'objects') {
      if (params[p] instanceof Object) {
        for (var p2 in params[p]) {
          form.append(p + '[' + p2 + ']', params[p][p2]);
        }
      } else {
        form.append(p, params[p]);
      }
    }
  }

  for (var i in params.objects) {
    var obj = params.objects[i];
    if (obj.file) {
      for (var r in obj) {
        if (r === 'file') {
          if (obj[r] instanceof Buffer) {
            form.append('object' + (parseInt(i) + 1) + '[' + r + ']',
              obj[r], {filename: 'file' + i + '.pdf'});
          } else if (obj[r].substr(0,1) === '@') {
            form.append('object' + (parseInt(i) + 1) + '[' + r + ']',
              fs.createReadStream(obj[r].substr(1)));
          } else {
            form.append('object' + (parseInt(i) + 1) + '[' + r + ']', obj[r]);
          }
        } else {
          form.append('object' + (parseInt(i) + 1) + '[' + r + ']', obj[r]);
        }
      }
    } else {
      form.append('object' + (parseInt(i) + 1), obj);
    }
  }
};

module.exports = Jobs;
