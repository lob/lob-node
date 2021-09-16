'use strict';
var moment = require('moment');

/*
 * Create an address, then send a postcard with a custom PDF back.
 * Run me! This example works out of the box, "batteries included".
 */

const fs = require('fs');

const lobFactory = require('../lib/index.js');
const Lob = new lobFactory('YOUR_API_KEY');

const file = fs.readFileSync(`${__dirname}/html/card.html`).toString();

// Create the address
const date = moment().date(moment().date() + 1).format('YYYY-MM-DD');
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
      front: file,
      back: file,
      send_date: date,
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
