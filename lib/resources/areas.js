function Areas (config) {
  this.uri = config.endpoint + 'areas';
  this.apiKey = config.apiKey;
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

Areas.prototype.list = function (done) {
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

Areas.prototype.create = function (params, done) {
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
  /* istanbul ignore else */
  if (params.name) {
    form.append('full_bleed', params.full_bleed);
  }

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

  params.routes.forEach(function (rt) {
    form.append('routes[]', rt);
  });

  params.forEach(function (p) { 
    if (p !== 'front' && p !== 'back') {
      if (params[p] instanceof Object && !(params[p] instanceof Buffer)) {
        for (var p2 in params[p]) {
          form.append(p + '[' + p2 + ']', params[p][p2]);
        }
      } else {
        form.append(p, params[p]);
      }
    }
  });
};

module.exports = Areas;
