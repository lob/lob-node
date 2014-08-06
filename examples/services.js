var lobFactory = require('../lib/index.js');
var Lob = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

/*
 * Services Endpoint
 */

// List All services
//
Lob.services.list(function (err, res) {
  console.log(err, res);
});
/**/

// Retrieve a particular service object
//
Lob.services.retrieve('2', function (err, res) {
  console.log(err, res);
});
/**/
