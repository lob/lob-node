'use strict';

/*
  * This script shows how to save an HTML template for later use
  * as a postcard.
*/

const fs = require('fs');
const lobFactory = require('../lib/index');
const Lob = new lobFactory('<YOUR_API_KEY>');
const file = fs.readFileSync(`${__dirname}/html/card.html`).toString();
const ADDRESS = {
  name: 'Robin Joseph',
  email: 'test@gmail.com',
  phone: '123456789',
  address_line1: '123 Test Street',
  address_line2: 'Unit 199',
  address_city: 'Chicago',
  address_state: 'IL',
  address_zip: '60012',
  address_country: 'US'
};
Lob.templates.create({ html: file, description: 'TestTemplate' })
  .then((template) => {
    Lob.addresses.create(ADDRESS).then((address) => {
      Lob.postcards.create({
        description: 'Template-backed Postcard',
        to: address.id,
        front: template.id,
        back: template.id,
        merge_variables: {
          name: 'Robin'
        }
      }).then((postcard) => {
        console.log('The LOB API responded with the following postcard object', postcard);
      });
    });
  }).catch((err) => {
    console.log(err);
  });
