'use strict';

/*
 * Create an address, then send a postcard with a custom PDF back.
 * Run me! This example works out of the box, "batteries included".
 */

var fs = require('fs');

var lobFactory = require('../lib/index.js');
var Lob = new lobFactory('YOUR_API_KEY');

var file = fs.readFileSync(__dirname + '/html/card.html').toString();

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
}, function (err, address) {
  if (err) {
    console.log(err);
  } else {
    Lob.postcards.create({
      description: 'My Second Postcard',
      to: address.id,
      front: file,
      back: file,
      merge_variables: {
        name: 'Robin'
      }
    }, function (err, postcard) {
      if (err) {
        console.log(err);
      } else {
        console.log('The Lob API responded with this postcard object: ', postcard);
      }
    });
  }
});
