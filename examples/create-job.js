/*
 * Example of creating an address, then object, then a job using the created
 * address and object.
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
    // Create the object (Lob object, not JS object!!)
    Lob.objects.create({
      description: 'My first object',
      file: 'https://s3-us-west-2.amazonaws.com/lob-assets/200_201_card.pdf',
      setting: 200
    }, function (err, object) {
      if (!err) {
        // Use the returned address and returned Lob object to create the job
        Lob.jobs.create({
          description: 'My first job!',
          to: address.id,
          // Freely mix references and inline objects
          from: {
            name: 'Me',
            email: 'me@lob.com',
            phone: '5555555555',
            address_line1: '456 Fake Street',
            address_line2: 'Unit 0',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94702',
            address_country: 'US'
          },
          objects: [object.id]
        }, function (err, job) {
          if (err) {
            console.log(err);
          } else {
            console.log('The Lob API responded with this job object: ', job);
          }
        })
      }
    })
  }
});
