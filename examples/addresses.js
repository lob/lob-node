var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
/* jshint camelcase: false */
/*
* Addresses Endpoint
*/

// Creating an Address Object
//
Lob.addresses.create({
  name: 'Test Name',
  email: 'test@gmail.com',
  phone: '123456789',
  address_line1: '123 Test Street',
  address_line2: 'Unit 199',
  address_city: 'Chicago',
  address_state: 'IL',
  address_zip: '60012',
  address_country: 'US',
}, function (err, res) {
  console.log(err, res);
});
/**/

// List All Addresses with default offset:0, count:0
//
Lob.addresses.list(function (err, res) {
  console.log(err, res);
});

// List Addreses with offset:10, count:5
//
Lob.addresses.list({count: 10, offset: 5}, function (err, res) {
  console.log(err, res);
});

// Retrieve a particular address address object
//
Lob.addresses.retrieve('adr_cda562558b71ff93', function (err, res) {
  console.log(err, res);
});

// Delete an Address Object (make sure it exists first)
//
Lob.addresses.delete('adr_71d64099e6729996', function (err, res) {
  console.log(err, res);
});
/**/

/* jshint camelcase: false */
