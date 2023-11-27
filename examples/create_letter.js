'use strict';

/*
 * Create an address, then send a letter with HTML and template merge variables.
 * Run me! This example works out of the box, "batteries included".
 */

const fs = require('fs');

const lobFactory = require('../lib/index.js');
const Lob = new lobFactory('YOUR_API_KEY');

const file = fs.readFileSync(`${__dirname}/html/letter.html`).toString();

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
  .then((address) => {
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
      file,
      merge_variables: {
        name: 'Robin'
      },
      color: false
    });
  })
  .then((letter) => {
    console.log('The Lob API responded with this letter object: ', letter);
  })
  .catch((err) => {
    console.log(err);
  });
