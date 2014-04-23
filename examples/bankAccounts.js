var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
/* jshint camelcase: false */

/*
 * Bank Accounts Endpoint
 */

// List All Accounts with default offset:0, count:10
//
Lob.bankAccounts.list(function (err, res) {
  console.log(err, res);
});
/**/

// Retrieve a particular Bank Account Object
//
Lob.bankAccounts.retrieve('bank_7a88fa3abe5e2da', function (err, res) {
  console.log(err, res);
});
/**/

// Creating a Bank Account
//
Lob.bankAccounts.create({
  routing_number: 123456789,
  account_number: 123456789,
  bank_code: 123456789,
  bank_address: {
    name: 'Chase Bank',
    address_line1: '55 Edmonds',
    address_city: 'Palo Alto',
    address_state: 'CA',
    address_zip: '90081',
    address_country: 'US'
  },
  account_address: {
    name: 'Leore Avidar',
    address_line1: '123 Test Street',
    address_city: 'Sunnyvale',
    address_state: 'CA',
    address_zip: '94085',
    address_country: 'US'
  }
}, function (err, res) {
  console.log(err, res);
});
/**/

/* jshint camelcase: true */
