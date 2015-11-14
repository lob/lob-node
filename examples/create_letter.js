'use strict';

/*
 * Create an address, then send a letter with HTML and template data.
 * Run me! This example works out of the box, "batteries included".
 */

var fs = require('fs');

var lobFactory = require('../lib/index.js');
var Lob = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

var file = fs.readFileSync(__dirname + '/html/letter.html').toString();

// Create the address
Lob.addresses.create({
  name: 'Robin Joseph',
  email: 'test@gmail.com',
  phone: '123456789',
  address_line1: '123 Test Street',
  address_line2: 'Unit 199',
  address_city: 'Chicago',
  address_state: 'IL',
  address_zip: '60012',
  address_country: 'US'
})
.then(function (address) {
  return Lob.letters.create({
    description: 'My First Letter',
    to: address.id,
    from: {
      name: 'Test Person',
      address_line1: '123 Test Street',
      address_line2: 'Unit 200',
      address_city: 'Chicago',
      address_state: 'IL',
      address_zip: '60012',
      address_country: 'US'
    },
    file: file,
    data: {
      name: 'Robin'
    },
    color: false
  });
})
.then(function (letter) {
  console.log('The Lob API responded with this letter object: ', letter);
})
.catch(function (err) {
  console.log(err);
});
