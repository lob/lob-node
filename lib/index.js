var Lob = require('./resources/lob');

var lobFactory = function (config) {
  return new Lob(config);
};

lobFactory.Lob = Lob;

module.exports = lobFactory;
