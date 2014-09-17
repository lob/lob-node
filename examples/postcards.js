var lobFactory = require('../lib/index.js');
var Lob = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
/* jshint camelcase: false */
/*
 * Postcards Endpoint
 */

// List All Postcards with default offset:0, count:0
/**/
Lob.postcards.list(function (err, res) {
  console.log(err, res);
});
/**/

// List all postcards with offset: 3, count: 7
Lob.postcards.list({offset: 3, count: 7}, function (err, res) {
  console.log(err, res);
});

// Retrieve a particular postcard object
//
Lob.postcards.retrieve('psc_056fdd2b4a11a169', function (err, res) {
  console.log(err, res);
});
/**/

// Creating a postcard with local file
//
Lob.postcards.create({
  name: 'Test Card',
  to: 'adr_3b5fe0b76713a6e8',
  front: '@' + __dirname + '/../test/assets/4x6.pdf',
  back: '@' + __dirname + '/../test/assets/4x6.pdf',
}, function (err, res) {
  console.log(err, res);
});
/**/

// Creating a postcard with remote file
//
Lob.postcards.create({
  name: 'My First Postcard',
  to: 'adr_3b5fe0b76713a6e8',
  front: 'https://www.lob.com/postcardfront.pdf',
  back: 'https://www.lob.com/postcardback.pdf'
}, function (err, res) {
  console.log(err, res);
});
/**/

// Creating a postcard with local, remote file
//
Lob.postcards.create({
  name: 'My First Postcard',
  to: 'adr_3b5fe0b76713a6e8',
  front: 'https://www.lob.com/postcardback.pdf',
  back: 'https://www.lob.com/postcardback.pdf'
}, function (err, res) {
  console.log(err, res);
});
/**/

// Creating a postcard with remote files and inline address
Lob.postcards.create({
  name: 'My First Postcard',
  to: {
    name: 'Grayson Chao', // required
    email: 'grayson@lob.com', // optional
    phone: '5555555555', //optional
    address_line1: '402 Test Street',
    address_line2: 'Floor LL', // optional
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94107',
    address_country: 'US' // 2-letter country code
  }
  front: 'https://www.lob.com/postcardback.pdf',
  back: 'https://www.lob.com/postcardback.pdf'
}, function (err, res) {
  console.log(err, res);
});
/**/
