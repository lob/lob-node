var fs = require('fs');
var Postcards;
var request = require('request');


function Postcards(config) {
  this.uri = config.endpoint + 'postcards';
  this.apiKey = config.apiKey;
  return this;
}

Postcards.prototype.retrieve = function(id, done){
  request(
    {
      url:this.uri + '/' + id,
      auth: {
        user: this.apiKey,
        password: ''
      },
      headers:{
        'User-Agent': 'Lob Node.js Wrapper'
      },
      json:true,
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

Postcards.prototype.list = function(options, done){
  var count;
  var offset;
  if(typeof options === 'function') {
    count = 10;
    offset = 0;
    done = options;
  } else {
    count = options.count || 10;
    offset = options.offset || 0;
  }

  request(
    {
      url:this.uri + '/',
      auth: {
        user: this.apiKey,
        password: ''
      },
      qs:{
        count: count,
        offset: offset
      },
      headers:{
        'User-Agent': 'Lob Node.js Wrapper'
      },
      json:true,
      method: 'GET'
    }, function (e, r, body) {
      if (body.errors) {
        done(body.errors, body);
      } else {
        done(e, body);
      }
    });
};

Postcards.prototype.create = function(params, done) {
  var opts = {
    url: this.uri,
    auth: {
      user: this.apiKey,
      password: ''
    },
    headers: {
      'User-Agent': 'Lob Node.js Wrapper'
    },
    json:true
  };

  var req = request.post(opts, function(e, r, body) {
    if (body.errors) {
      done(body.errors, body);
    } else {
      done(e, body);
    }
  });
  var form = req.form();

  for(var p in params) {
    if(params[p] instanceof Object && !(params[p] instanceof Buffer)) {
      for(var p2 in params[p]) {
        form.append(p + '[' + p2 + ']', params[p][p2]);
      }
    } else {
      form.append(p, params[p]);
    }
  }

  if(params.front) {
    if (params.front instanceof Buffer) {
      form.append('front', params.front, {filename: 'front.pdf' });
    } else if(params.front.substr(0,1) === '@') {
      form.append('front', fs.createReadStream(params.front.substr(1)));
    }
  }

  if(params.back){
    if (params.back instanceof Buffer) {
      form.append('back', params.back, {filename: 'back.pdf' });
    } else if(params.back.substr(0,1) === '@') {
      form.append('back', fs.createReadStream(params.back.substr(1)));
    }
  }
};

module.exports = Postcards;
