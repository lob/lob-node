var Lob = require('./resources/lob');

var lobFactory = function (apiKey, apiVersion) {
  return new Lob(apiKey, apiVersion);
};

lobFactory.Lob = Lob;

module.exports = lobFactory;
