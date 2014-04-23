var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
/* jshint camelcase: false */
/*
 * Checks Endpoint
 */

// Creating Check
/**/
Lob.checks.create({
  name: 'Test Check',
  check_number: '10000',
  bank_account: 'bank_7a88fa3abe5e2da',
  to: 'adr_3b5fe0b76713a6e8',
  amount: 100,
  memo: 'THis is my first Check',
  message: 'this check is for laundry'
}, function (err, res) {
  console.log(err, res);
});
/**/
// List All Checks with default offset:0, count:0
//
Lob.checks.list(function (err, res) {
  console.log(err, res);
});
/**/

// Retrieve a particular check object
//
Lob.checks.retrieve('psc_056fdd2b4a11a169', function (err, res) {
  console.log(err, res);
});
/**/
/* jshint camelcase: true */
