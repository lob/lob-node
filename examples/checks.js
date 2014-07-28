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
// Creating Check with Bank Account
/**/
Lob.bankAccounts.create({
  routing_number: '123456789',
  account_number: '123456788',
  bank_address: {
    name: 'Chase',
    address_line1: '123 Test Street',
    address_line2: 'Unit 199',
    address_city: 'Bangalore',
    address_state: 'KA',
    address_zip: '560039',
    address_country: 'IN',
  },
  account_address: {
    name: 'Lob.com',
    address_line1: '123 Test Street',
    address_line2: 'Unit 199',
    address_city: 'Bangalore',
    address_state: 'KA',
    address_zip: '560039',
    address_country: 'IN',
  }
}, function (err, res) {
  Lob.checks.create({
    name: 'TEST_CHECK',
    bank_account: res.id,
    to: 'adr_8613108bcfa00806',
    amount: 100,
    memo: 'test check'
  }, function (err, res2) {
    console.log(err, res2);
  });
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
