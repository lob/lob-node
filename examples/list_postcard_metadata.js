'use strict';
const util = require('util');

/*
 * Create an address, then send a postcard with a custom PDF back.
 * Run me! This example works out of the box, "batteries included".
 */

const fs = require('fs');

const lobFactory = require('../lib/index.js');
const lob = new lobFactory('YOUR_API_KEY');

const file = fs.readFileSync(`${__dirname}/html/card.html`).toString();

async function createPostcard () {
  // Create the postcard
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
        front: file,
        back: file,
        metadata: {
          campaign: 'NEWYORK2015'
        },
        merge_variables: {
          name: 'Robin'
        }
      }, (err2) => {
        if (err2) {
          console.log(err2);
        } else {
          console.log('The Lob API successfully created a postcard.');
        }
      });
    }
  });
}

async function listPostcards () {
  await createPostcard();
  lob.postcards.list({
    metadata: {
      campaign: 'NEWYORK2015'
    },
    limit: 1
  }, (err, list) => {
    if (err) {
      console.log(err);
    } else {
      console.log('The Lob API responded with this list: ', util.inspect(list, { depth: null }));
    }
  });
}

listPostcards();
