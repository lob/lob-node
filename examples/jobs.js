var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
/* jshint camelcase: false */
/*
 * JOBS Endpoint
 */
// Creating a job with objects

//
//using ID's you already created
Lob.jobs.create({
  name: 'Lob Test Job',
  from: 'adr_71d64099e6729996', //Can pass an ID
  to: 'adr_71d64099e6729996',
  objects: ['obj_fe40799250bac8f6']
}, function (err, res) {
  console.log(err, res);
});
/**/

//using ID
Lob.jobs.create({
  name: 'Lob Test Job',
  from: { //or an new object
    name: 'Jane Smith',
    email: 'jane@b.com',
    phone: '5555555555',
    address_line1: '123 Test Street',
    address_line2: 'Unit 199',
    address_city: 'Mountain View',
    address_state: 'CA',
    address_zip: '94085',
    address_country: 'US',
  },
  to: { //or an new object
    name: 'Joe Smith',
    email: 'berry@Lob.com',
    phone: '5555555555',
    address_line1: '123 Test Street',
    address_line2: 'Unit 199',
    address_city: 'Mountain View',
    address_state: 'CA',
    address_zip: '94085',
    address_country: 'US',
  },
  objects: [
    {
      name: 'GO BLUE',
      file: 'https://www.Lob.com/goblue.pdf',
      setting_id: 100
    }
  ]
}, function (err, res) {
  console.log(err, res);
});
/**/

// List All Jobs with default offset:0, count:0
/**/
Lob.jobs.list(function (err, data) {
  console.log(err, data);
});
/**/

// List Jobs with offset:10, count:5
//
Lob.jobs.list(5, 10, function (err, res) {
  console.log(err, res);
});
/**/

// Retrieve a particular job JOB_ID = "job_*" (required)
//
Lob.jobs.retrieve('job_f6f4c0c3f6338136', function (err, res) {
  console.log(err, res);
});
/**/

/* jshint camelcase: true */
