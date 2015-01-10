'use strict';

Lob.DEFAULT_HOST = 'api.lob.com';
Lob.DEFAULT_PORT = '443';
Lob.DEFAULT_BASE_PATH = '/v1/';
Lob.USER_AGENT = 'LobNode/' + require('../package').version;

function Lob(key, version) {

  if (!(this instanceof Lob)) {
    return new Lob(key, version);
  }

  this._settings = {
    host: Lob.DEFAULT_HOST,
    port: Lob.DEFAULT_PORT,
    basePath: Lob.DEFAULT_BASE_PATH,
    userAgent: Lob.USER_AGENT,
    key: key,
    version: version
  };

}

module.exports = Lob;
