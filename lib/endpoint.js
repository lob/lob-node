'use strict';

var Bluebird  = require('bluebird');
var Requester = require('./requester');
var Errors    = require('./errors');

var rc = {
  '\n': '\\n', '\"': '\\\"',
  '\u2028': '\\u2028', '\u2029': '\\u2029'
}; 

// Thanks to: https://gist.github.com/padolsey/6008842
exports.makePathInterpolator = function (str) {
  return new Function(
    'o',
    'return "' + (
      str
      .replace(/["\n\r\u2028\u2029]/g, function($0) {
        return rc[$0];
      })
      .replace(/\{([\s\S]+?)\}/g, '" + encodeURIComponent(o["$1"]) + "')
    ) + '";'
  );
};

exports.createArgObject = function(args, argNames) {
  var argObject = {};
  if (argNames) {
    for (var i = 0; i < argNames.length; i++) {
      argObject[argNames[i]] = args[i];
    }
  }
  return argObject;
};

exports.makeIndividual = function (settings, endpoint) {
  var pathInterpolator = exports.makePathInterpolator(endpoint.path);
  var headers = {
    'User-Agent': settings.userAgent
  };
  if (settings.version) {
    headers['Lob-Version'] = settings.version;
  }

  return function () {
    var argObj = exports.createArgObject(arguments, endpoint.args);
    var path = pathInterpolator(argObj);

    var opts = {
      url: settings.host + settings.basePath + path,
      auth: {
        user: settings.key,
        password: ''
      },
      headers: headers,
      json: true,
      method: endpoint.method
    };

    if (endpoint.method === 'POST') {
      opts.form = arguments[0];
    }

    return Requester.request(opts)
    .then(function (res) {
      var body = res[1];
      if (body.errors) {
        throw new Errors.LobError(body.errors[0].message);
      } else {
        return body;
      }
    })
    .nodeify(arguments[arguments.length - 1]);
  };
};

exports.make = function (settings, endpoints) {
  var methods = {};
  endpoints.forEach(function (endpoint) {
    methods[endpoint.name] = exports.makeIndividual(settings, endpoint);
  });
  return methods;
};
