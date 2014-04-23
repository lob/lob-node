var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
/* jshint camelcase: false */
/*
* Countries Endpoint
*/

// List All Countries with defaults
//
Lob.countries.list(function (err, res) {
  console.log(err, res);
});

/* jshint camelcase: false */
