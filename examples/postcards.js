var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
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

// Retrieve a particular postcard object
//
Lob.postcards.retrieve('psc_056fdd2b4a11a169', function (err, res) {
  console.log(err, res);
});
/**/

// Creating PostCard with local file
//
Lob.postcards.create({
  name: 'Test Card',
  to: 'adr_3b5fe0b76713a6e8',
  front: '@/home/Downloads/postcardfront.pdf',
  back: '@/home/Downloads/postcardback.pdf'
}, function (err, res) {
  console.log(err, res);
});
/**/

// Creating an PostCard with remote file
//
Lob.postcards.create({
  name: 'My First Postcard',
  to: 'adr_3b5fe0b76713a6e8',
  front: 'https://www.Lob.com/postcardfront.pdf',
  back: 'https://www.Lob.com/postcardback.pdf'
}, function (err, res) {
  console.log(err, res);
});
/**/

// Creating an PostCard with local, remote file
//
Lob.postcards.create({
  name: 'My First Postcard',
  to: 'adr_3b5fe0b76713a6e8',
  front: 'https://www.Lob.com/postcardback.pdf',
  back: 'https://www.Lob.com/postcardback.pdf'
}, function (err, res) {
  console.log(err, res);
});
/**/
