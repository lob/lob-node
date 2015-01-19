'use strict';

var clientVersion     = require('../package.json').version;
var Endpoint          = require('./endpoint');
var addresses         = require('./resources/addresses');

Lob.DEFAULT_HOST = 'https://api.lob.com';
Lob.DEFAULT_BASE_PATH = '/v1';
Lob.USER_AGENT = 'Lob/v1 NodeBindings/' + clientVersion;

function Lob(key, version) {

  if (!(this instanceof Lob)) {
    return new Lob(key, version);
  }

  this._settings = {
    host: Lob.DEFAULT_HOST,
    basePath: Lob.DEFAULT_BASE_PATH,
    key: key,
    version: version,
    userAgent: Lob.USER_AGENT
  };

  this.addresses = Endpoint.make(this._settings, addresses);
}

module.exports = Lob;
