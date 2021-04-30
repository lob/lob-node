'use strict';

/*
 * Create an address, then send a self mailer with a custom PDF outside.
 * Run me! This example works out of the box, "batteries included".
 */

const lobFactory = require('../lib/index.js');
const Lob = new lobFactory('YOUR_API_KEY');

// Create the address
Lob.addresses.create({
  name: 'John Doe',
  email: 'test@example.com',
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
    Lob.selfMailers.create({
      description: 'Test Self Mailer',
      to: address.id,
      outside: 'https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_outside.pdf',
      inside: '<h1>Hello {{name}}</h1>',
      merge_variables: {
        name: 'Robin'
      }
    }, (err, selfMailer) => {
      if (err) {
        console.log(err);
      } else {
        console.log('The Lob API responded with this self mailer object: ', selfMailer);
      }
    });
  }
});
