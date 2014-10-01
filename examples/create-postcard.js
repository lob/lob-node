/* 
 * Create an address, then send two postcards with it - one with a message
 * on the back, and one with a custom PDF back instead.
 * Run me! This example works out of the box, "batteries included".
 */

var lobFactory = require('../lib/index.js');
var Lob = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

// Create the address
Lob.addresses.create({
  name: 'Test Person',
  email: 'test@gmail.com',
  phone: '123456789',
  address_line1: '123 Test Street',
  address_line2: 'Unit 199',
  address_city: 'Chicago',
  address_state: 'IL',
  address_zip: '60012',
  address_country: 'US',
}, function (err, address) {
  if (!err) {
    // with message
    Lob.postcards.create({
      name: 'My first postcard',
      to: address.id,
      front: 'https://www.lob.com/postcardfront.pdf',
      message: 'Hello from lob!'
    }, function (err, postcard) {
      console.log(postcard);
    });

    // with custom back
    Lob.postcards.create({
      name: 'My first postcard',
      to: address.id,
      front: 'https://www.lob.com/postcardfront.pdf',
      back: 'https://www.lob.com/postcardback.pdf'
    }, function (err, postcard) {
      console.log(postcard);
    });
  }
});
