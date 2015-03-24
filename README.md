# lob-node
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Build Status](https://travis-ci.org/lob/lob-node.svg?branch=master)](https://travis-ci.org/lob/lob-node) [![Dependency Status](https://gemnasium.com/lob/lob-node.svg)](https://gemnasium.com/lob/lob-node) [![Coverage Status](https://coveralls.io/repos/lob/lob-node/badge.svg?branch=master)](https://coveralls.io/r/lob/lob-node?branch=master)

Node.js wrapper for the [Lob.com](https://lob.com) API.

## Table of Contents
[Installation](#Installation)

[Getting Started](#GettingStarted)

[Supported Image Types](#SupportedImageTypes)

[Creating a PDF](#CreatingAPDF)

[Usage](#Usage)

[API](#API)

## Installation<a name="Installation"></a>

lob-node can be installed through the npm:

```
$ npm install lob
```
To build and install from the latest source:

```
$ git clone git@github.com:lob/lob-node.git
$ npm install
```
## Getting Started<a name="GettingStarted"></a>

In order to use the client, you must have an API key. To obtain your key, you need to first create an account at [Lob.com](https://lob.com/).

You can access your API access credentials from the [Settings Panel](https://dashboard.lob.com/settings).

## Supported Image Types<a name="SupportedImageTypes"></a>

- PDF
- PNG
- JPEG

For more information on prepping the images please see the [Lob documentation](https://lob.com/docs/node#prepping).

### Creating a PDF<a name="CreatingAPDF"></a>

If you need to generate your own PDF programmatically we recommend
using [pdfkit](http://pdfkit.org/). There is an example provided in the examples folder [here](examples/create_pdf.js).

## HTML Support

The Lob.com API also supports HTML strings in leiu of a file of the above type. See below for examples of submitting with HTML strings.

For templates and more information regarding HTML, please see the [Lob documentation](https://lob.com/docs/node#html-fonts).

##Usage<a name="Usage"></a>
```javascript
var Lob = require('lob')('YOUR API KEY');

// change api version
var Lob = require('lob')('YOUR API KEY');

// change internal defaults (e.g. host)
var options = {/* see options below */};
var Lob = require('lob')('YOUR API KEY', options);

// you can also just pass options
var options = { apiKey: 'foo', host: 'bar' };
var Lob = require('lob')(options);

// callback pattern
Lob.settings.list({ type: 1 }, function(err, body) {
  if(err) return callback(err);
  return callback(null, body.data);
});
```

Additionally, every resource method returns a promise, so you don't have to use the regular callback. E.g.

```javascript
var Lob = require('lob')('YOUR API KEY');

Lob.settings.list({ type: 1 }).then(function(res) {
  console.log(res.data);
}).catch(function (e) {
  console.log(e);
});
```

### Options
The Lob constructor accepts an `options` object which may contain one or more of the following options:

* `apiVersion` - Optionally set the version of the Lob API to use. Defaults to latest.
* `host` - Override the default host API calls are issued to.
* `userAgent` - Override the default userAgent.
* `headers` - Edit the headers sent in all API calls.

For a detailed API reference see [below](#API)

##API<a name="API"></a>
- [`Lob.jobs`](#Lob-jobs)
  - [`Lob.jobs.retrieve(String id, Function done)`](#Lob-jobs-retrieve)
  - [`Lob.jobs.list(Object options, Function done)`](#Lob-jobs-list)
  - [`Lob.jobs.create(Object params, Function done)`](#Lob-jobs-create)
- [`Lob.addresses`](#Lob-addresses)
  - [`Lob.addresses.retrieve(String id, Function done)`](#Lob-addresses-retrieve)
  - [`Lob.addresses.delete(String id, Function done)`](#Lob-addresses-delete)
  - [`Lob.addresses.list(Object options, Function done)`](#Lob-addresses-list)
  - [`Lob.addresses.create(Object params, Function done)`](#Lob-addresses-create)
- [`Lob.objects`](#Lob-objects)
  - [`Lob.objects.retrieve(String id, Function done)`](#Lob-objects-retrieve)
  - [`Lob.objects.list(Object options, Function done)`](#Lob-objects-list)
  - [`Lob.objects.create(Object params, Function done)`](#Lob-objects-create)
  - [`Lob.objects.delete(String id, Function done)`](#Lob-objects-delete)
- [`Lob.settings`](#Lob-settings)
  - [`Lob.settings.list(Object options, Function done)`](#Lob-settings-list)
  - [`Lob.settings.retrieve(String id, Function done)`](#Lob-settings-retrieve)
- [`Lob.services`](#Lob-services)
  - [`Lob.services.retrieve(String id, Function done)`](#Lob-services-retrieve)
  - [`Lob.services.list(Object options, Function done)`](#Lob-services-list)
- [`Lob.postcards`](#Lob-postcards)
  - [`Lob.postcards.retrieve(String id, Function done)`](#Lob-postcards-retrieve)
  - [`Lob.postcards.list(Object options, Function done)`](#Lob-postcards-list)
  - [`Lob.postcards.create(Object params, Function done)`](#Lob-postcards-create)
- [`Lob.checks`](#Lob-checks)
  - [`Lob.checks.retrieve(String id, Function done)`](#Lob-checks-retrieve)
  - [`Lob.checks.list(Object options, Function done)`](#Lob-checks-list)
  - [`Lob.checks.create(Object params, Function done)`](#Lob-checks-create)
- [`Lob.bankAccounts`](#Lob-bankAccounts)
  - [`Lob.bankAccounts.retrieve(String id, Function done)`](#Lob-bankAccounts-retrieve)
  - [`Lob.bankAccounts.delete(String id, Function done)`](#Lob-bankAccounts-delete)
  - [`Lob.bankAccounts.list(Object options, Function done)`](#Lob-bankAccounts-list)
  - [`Lob.bankAccounts.create(Object params, Function done)`](#Lob-bankAccounts-create)
- [`Lob.areas`](#Lob-areas)
  - [`Lob.areas.retrieve(String id, Function done)`](#Lob-areas-retrieve)
  - [`Lob.areas.list(Object options, Function done)`](#Lob-areas-list)
  - [`Lob.areas.create(Object params, Function done)`](#Lob-areas-create)
- [`Lob.routes`](#Lob-routes)
  - [`Lob.routes.list(Object options, Function done)`](#Lob-routes-list)
- [`Lob.verification`](#Lob-verification)
  - [`Lob.verification.verify(Object params, Function done)`](#Lob-verification-verify)
- [`Lob.countries`](#Lob-countries)
  - [`Lob.countries.list(Object options, Function done)`](#Lob-countries-list)
- [`Lob.states`](#Lob-states)
  - [`Lob.states.list(Object options, Function done)`](#Lob-states-list)

###`Lob.jobs`<a name="Lob-jobs"></a>
#####`Lob.jobs.retrieve(String id, Function done)`<a name="Lob-jobs-retrieve"></a>
```javascript
// Retrieve a particular job JOB_ID = "job_*" (required)
Lob.jobs.retrieve('job_f6f4c0c3f6338136', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.jobs.list(Object options, Function done)`<a name="Lob-jobs-list"></a>
```javascript
// List Jobs with default offset:0, count:0
Lob.jobs.list(function (err, data) {
  console.log(err, data);
});

// List Jobs with offset:10, count:5
Lob.jobs.list({count: 5, offset: 10}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.jobs.create(Object params, Function done)`<a name="Lob-jobs-create"></a>
```javascript
//using ID's you already created
Lob.jobs.create({
  name: 'Lob Test Job',
  from: 'adr_71d64099e6729996', //Can pass an ID
  to: { // or an inline address object
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
  objects: [
    'obj_fe40799250bac8f6', // use an ID
    { // or an inline object
      name: 'GO BLUE',
      file: 'https://s3-us-west-2.amazonaws.com/lob-assets/goblue.pdf',
      setting: 100
    }

  ] // always an array
}, function (err, res) {
  console.log(err, res);
});

```
###`Lob.addresses`<a name="Lob-addresses"></a>
#####`Lob.addresses.retrieve(String id, Function done)`<a name="Lob-addresses-retrieve"></a>
```javascript
// Retrieve a particular address address object
//
Lob.addresses.retrieve('adr_cda562558b71ff93', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.addresses.delete(String id, Function done)`<a name="Lob-addresses-delete"></a>
```javascript
// Delete an Address Object (make sure it exists first)
//
Lob.addresses.delete('adr_71d64099e6729996', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.addresses.list(Object options, Function done)`<a name="Lob-addresses-list"></a>
```javascript
// List All Addresses with default offset:0, count:0
//
Lob.addresses.list(function (err, res) {
  console.log(err, res);
});

// List Addreses with offset:10, count:5
//
Lob.addresses.list({count: 10, offset: 5}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.addresses.create(Object params, Function done)`<a name="Lob-addresses-create"></a>
```javascript
Lob.addresses.create({
  name: 'Test Name',
  email: 'test@gmail.com',
  phone: '123456789',
  address_line1: '123 Test Street',
  address_line2: 'Unit 199',
  address_city: 'Chicago',
  address_state: 'IL',
  address_zip: '60012',
  address_country: 'US',
}, function (err, res) {
  console.log(err, res);
});
```
###`Lob.objects`<a name="Lob-objects"></a>
#####`Lob.objects.retrieve(String id, Function done)`<a name="Lob-objects-retrieve"></a>
```javascript
// Retrieve a particular object OBJECT_ID = "obj_*" (required)
//
Lob.objects.retrieve('obj_1d1188df1e8d6427', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.objects.list(Object options, Function done)`<a name="Lob-objects-list"></a>
```javascript
// List All Objects with default offset:0, count:0
//
Lob.objects.list(function (err, res) {
  console.log(err, res);
});

// List Objects with count:10, offset:5
//
Lob.objects.list({count: 10, offset: 5}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.objects.create(Object params, Function done)`<a name="Lob-objects-create"></a>
```javascript
// Creating an Object with local file
//
Lob.objects.create({
  name: 'My First Object',
  file: '@/home/Downloads/goblue.pdf',
  setting: 100
}, function (err, res) {
  console.log(err, res);
});

// Creating an Object with remote file
//
Lob.objects.create({
  name: 'My First Object',
  file: 'https://s3-us-west-2.amazonaws.com/lob-assets/goblue.pdf',
  setting: 100
}, function (err, res) {
  console.log(err, res);
});

// Creating an Object with HTML
//
Lob.objects.create({
  name: 'My First Object',
  file: '<html style="margin: 130px; font-size: 50;">HTML here</html>',
  setting: 100
}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.objects.delete(String id, Function done)`<a name="Lob-objects-delete"></a>
```javascript
Lob.objects.delete('obj_1d1188df1e8d6427', function (err, res) {
  console.log(err, res);
});
```
###`Lob.settings`<a name="Lob-settings"></a>
#####`Lob.settings.list(Object options, Function done)`<a name="Lob-settings-list"></a>
```
Lob.settings.list({ type: 1 }, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.settings.retrieve(String id, Function done)`<a name="Lob-settings-retrieve"></a>
```javascript
Lob.settings.retrieve('100', function (err, res) {
  console.log(err, res);
});
```
###`Lob.services`<a name="Lob-services"></a>
#####`Lob.services.retrieve(String id, Function done)`<a name="Lob-services-retrieve"></a>
```javascript
// Retrieve a particular service object
//
Lob.services.retrieve('2', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.services.list(Object options, Function done)`<a name="Lob-services-list"></a>
```javascript
// List All services
//
Lob.services.list(function (err, res) {
  console.log(err, res);
});
```
###`Lob.postcards`<a name="Lob-postcards"></a>
#####`Lob.postcards.retrieve(String id, Function done)`<a name="Lob-postcards-retrieve"></a>
```javascript
// Retrieve a particular postcard object
//
Lob.postcards.retrieve('psc_056fdd2b4a11a169', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.postcards.list(Object options, Function done)`<a name="Lob-postcards-list"></a>
```javascript
// List All Postcards with default offset:0, count:0
//
Lob.postcards.list(function (err, res) {
  console.log(err, res);
});

// List All Postcards with offset:10, count:5
//
Lob.postcards.list({offset: 10, count: 5}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.postcards.create(Object params, Function done)`<a name="Lob-postcards-create"></a>
```javascript
// Creating PostCard with local file
//
Lob.postcards.create({
  name: 'Test Card',
  to: 'adr_3b5fe0b76713a6e8',
  front: '@/home/Downloads/postcardfront.pdf',
  back: '@/home/Downloads/postcardback.pdf'
}, function (err, res) {
  console.log(err, res);
});
/**/

// Creating a PostCard with remote file
//
Lob.postcards.create({
  name: 'My First Postcard',
  to: 'adr_3b5fe0b76713a6e8',
  front: 'https://s3-us-west-2.amazonaws.com/lob-assets/postcardfront.pdf',
  back: 'https://s3-us-west-2.amazonaws.com/lob-assets/postcardback.pdf'
}, function (err, res) {
  console.log(err, res);
});
/**/

// Creating a PostCard with HTML
//
Lob.postcards.create({
  name: 'My First Postcard',
  to: 'adr_3b5fe0b76713a6e8',
  front: '<html style="margin: 130px; font-size: 50;">Front HTML</html>',
  back: '<html style="margin: 130px; font-size: 50;">Back HTML</html>'
}, function (err, res) {
  console.log(err, res);
});
```
###`Lob.checks`<a name="Lob-checks"></a>
#####`Lob.checks.retrieve(String id, Function done)`<a name="Lob-checks-retrieve"></a>
```javascript
// Retrieve a particular check object
//
Lob.checks.retrieve('psc_056fdd2b4a11a169', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.checks.list(Object options, Function done)`<a name="Lob-checks-list"></a>
```javascript
// List All Checks with default offset:0, count:0
//
Lob.checks.list(function (err, res) {
  console.log(err, res);
});
/**/
```
#####`Lob.checks.create(Object params, Function done)`<a name="Lob-checks-create"></a>
```javascript
// Creating Check
/**/
Lob.checks.create({
  name: 'Test Check',
  check_number: '10000',
  bank_account: 'bank_7a88fa3abe5e2da',
  to: 'adr_3b5fe0b76713a6e8',
  amount: 100,
  memo: 'THis is my first Check',
  message: 'this check is for laundry',
  logo: 'https://s3-us-west-2.amazonaws.com/lob-assets/lob_check_logo.png'
}, function (err, res) {
  console.log(err, res);
});
/**/
// Creating Check with Bank Account
/**/
Lob.bankAccounts.create({
  routing_number: '322271627',
  account_number: '123456788',
  bank_address: {
    name: 'Chase',
    address_line1: '123 Test Street',
    address_line2: 'Unit 199',
    address_city: 'Bangalore',
    address_state: 'KA',
    address_zip: '560039',
    address_country: 'IN',
  },
  account_address: {
    name: 'Lob.com',
    address_line1: '123 Test Street',
    address_line2: 'Unit 199',
    address_city: 'Bangalore',
    address_state: 'KA',
    address_zip: '560039',
    address_country: 'IN',
  },
  signatory: 'John Doe'
}, function (err, res) {
  Lob.checks.create({
    name: 'TEST_CHECK',
    bank_account: res.id,
    to: 'adr_8613108bcfa00806',
    amount: 100,
    memo: 'test check',
    logo: 'http://assets.lob.com/lob_check_logo.png'
  }, function (err, res2) {
    console.log(err, res2);
  });
});
/**/
```
###`Lob.bankAccounts`<a name="Lob-bankAccounts"></a>
#####`Lob.bankAccounts.retrieve(String id, Function done)`<a name="Lob-bankAccounts-retrieve"></a>
```javascript
// Retrieve a particular Bank Account Object
//
Lob.bankAccounts.retrieve('bank_7a88fa3abe5e2da', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.bankAccounts.delete(String id, Function done)`<a name="Lob-bankAccounts-delete"></a>
```javascript
// Deleting a bank account
Lob.bankAccounts.delete('bank_7a88fa3abe5e2da', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.bankAccounts.list(Object options, Function done)`<a name="Lob-bankAccounts-list"></a>
```javascript
// List All Accounts with default offset:0, count:10
//
Lob.bankAccounts.list(function (err, res) {
  console.log(err, res);
});
```
#####`Lob.bankAccounts.create(Object params, Function done)`<a name="Lob-bankAccounts-create"></a>
```javascript
// Creating a Bank Account
//
Lob.bankAccounts.create({
  routing_number: '322271627',
  account_number: '123456789',
  bank_address: {
    name: 'Chase Bank',
    address_line1: '55 Edmonds',
    address_city: 'Palo Alto',
    address_state: 'CA',
    address_zip: '90081',
    address_country: 'US'
  },
  account_address: {
    name: 'Leore Avidar',
    address_line1: '123 Test Street',
    address_city: 'Sunnyvale',
    address_state: 'CA',
    address_zip: '94085',
    address_country: 'US'
  },
  signatory: 'John Doe'
}, function (err, res) {
  console.log(err, res);
});
```
###`Lob.areas`<a name="Lob-areas"></a>
#####`Lob.areas.retrieve(String id, Function done)`<a name="Lob-areas-retrieve"></a>
```javascript
// Retrieve a particular Area
Lob.areas.retrieve('area_350e47ace201ee4', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.areas.list(Object options, Function done)`<a name="Lob-areas-list"></a>
```javascript
// List all areas with count: 5 and offset: 10
Lob.areas.list({count: 5, offset: 10}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.areas.create(Object params, Function done)`<a name="Lob-areas-create"></a>
```javascript
// Create an area mailing with a mix of local and remote files
// You can mix and match (for example, both local or both remote)
Lob.areas.create({
  front: '@/path/to/local/file',
  back: 'https://s3-us-west-2.amazonaws.com/lob-assets/areaback.pdf',
  routes: ['94107-C031', '94158-C031'], // required
  target_type: 'all', // optional
  full_bleed: 1 // optional
}, function (err, res) {
  console.log(err, res);
})

// Create an area mailing with HTML
Lob.areas.create({
  front: '<html style="margin: 130px; font-size: 50;">Front HTML</html>',
  back: '<html style="margin: 130px; font-size: 50;">Back HTML</html>',
  routes: ['94107-C031', '94158-C031'], // required
  target_type: 'all', // optional
  full_bleed: 1 // optional
}, function (err, res) {
  console.log(err, res);
})
```
###`Lob.routes`<a name="Lob-routes"></a>
#####`Lob.routes.list(Object options, Function done)`<a name="Lob-routes-list"></a>
```javascript
// List all routes for a set of zip codes
Lob.routes.list({
  zip_codes: ['94108', '94709', '94608']
}, function (err, res) {
  console.log(err, res);
});
```
###`Lob.verification`<a name="Lob-verification"></a>
#####`Lob.verification.verify(Object params, Function done)`<a name="Lob-verification-verify"></a>
```javascript
Lob.verification.verify({ // Inline address only
  address_line1: '325 Berry Street',
  address_line2: 'Unit 211',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: '94158',
  address_country: 'US',
}, function (err, res) {
  console.log (err, res);
});
```
###`Lob.countries`<a name="Lob-countries"></a>
#####`Lob.countries.list(Object options, Function done)`<a name="Lob-countries-list"></a>
```javascript
// List All Countries with defaults
//
Lob.countries.list(function (err, res) {
  console.log(err, res);
});
```
###`Lob.states`<a name="Lob-states"></a>
#####`Lob.states.list(Object options, Function done)`<a name="Lob-states-list"></a>
```javascript
Lob.states.list(function (err, res) {
  console.log(err, res);
});
```
[downloads-image]: http://img.shields.io/npm/dm/lob.svg
[npm-url]: https://npmjs.org/package/lob
[npm-image]: https://badge.fury.io/js/lob.svg
[travis-url]: https://travis-ci.org/lob/lob-node
[travis-image]: https://travis-ci.org/lob/lob-node.svg?branch=master
[depstat-url]: https://david-dm.org/Lob/Lob-node
[depstat-image]: https://david-dm.org/Lob/Lob-node.svg

## Running the test-suite

To run the tests with coverage:

    gulp testCI

To run the tests without coverage:

    gulp test

## Credits

Copyright &copy; 2013 Lob.com

Released under the MIT License, which can be found in the repository in `LICENSE.txt`.
