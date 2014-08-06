var lobFactory = require('../lib/index.js');
var Lob = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
/* jshint camelcase: false */
/*
* States Endpoint
*/

// List All States with defaults
//
Lob.states.list(function (err, res) {
  console.log(err, res);
});

/* jshint camelcase: false */
