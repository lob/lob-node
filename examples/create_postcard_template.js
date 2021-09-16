'use strict';

/*
 * Create an address, then send a postcard with a custom PDF back.
 * Run me! This example works out of the box, "batteries included".
 */

const fs = require('fs');

const lobFactory = require('../lib/index.js');
// this key is publicly available in the legacy docs, so it's hardcoded
// since the templates are associated with this dummy account
// you can replace this key with your own, and the IDs below with any
// saved templates you have
const Lob = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

const file = fs.readFileSync(`${__dirname}/html/card.html`).toString();

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
}, (err, address) => {
  if (err) {
    console.log(err);
  } else {
    Lob.postcards.create({
      description: 'My Second Postcard',
      to: address.id,
      // you can replace these template IDs
      front: 'tmpl_b846a20859ae11a',
      back: 'tmpl_01b0d396a10c268',
      merge_variables: {
        name: 'Robin'
      }
    }, (err, postcard) => {
      if (err) {
        console.log(err);
      } else {
        console.log('The Lob API responded with this postcard object: ', postcard);
      }
    });
  }
});
