var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
/* jshint camelcase: false */
/*
* Verify Endpoint
*/

// Verify and Address
//
Lob.verification.verify({
  address_line1: '325 Berry Street',
  address_line2: 'Unit 211',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: '94158',
  address_country: 'US',
}, function (err, res) {
  console.log (err, res);
});
/**/
