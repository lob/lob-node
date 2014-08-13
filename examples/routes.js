var lobFactory = require('../lib/index.js');
var Lob = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

// List all routes for a set of zip codes
Lob.routes.list({
  zip_codes: ['94108', '94709', '94608']
}, function (err, res) {
  console.log(err, res);
});
