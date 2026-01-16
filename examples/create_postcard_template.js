'use strict';

/*
 * Create an address, then send a postcard with a custom PDF back.
 * Run me! This example works out of the box, "batteries included".
 */

const lobFactory = require('../lib/index.js');
// Replace with your own API key and template IDs
const lob = new lobFactory('YOUR_API_KEY');

// Create the address
lob.addresses.create({
  name: 'Robin Joseph',
  email: 'test@gmail.com',
  phone: '123456789',
  address_line1: '123 Test Street',
  address_line2: 'Unit 199',
  address_city: 'Chicago',
  address_state: 'IL',
  address_zip: '60012',
  address_country: 'US'
}, (err, address) => {
  if (err) {
    console.log(err);
  } else {
    lob.postcards.create({
      description: 'My Second Postcard',
      to: address.id,
      // you can replace these template IDs
      front: 'tmpl_b846a20859ae11a',
      back: 'tmpl_01b0d396a10c268',
      merge_variables: {
        name: 'Robin'
      }
    }, (err2, postcard) => {
      if (err2) {
        console.log(err2);
      } else {
        console.log('The Lob API responded with this postcard object: ', postcard);
      }
    });
  }
});
