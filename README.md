# lob-node

[downloads-image]: http://img.shields.io/npm/dm/lob.svg
[npm-url]: https://npmjs.org/package/lob
[npm-image]: https://badge.fury.io/js/lob.svg
[travis-url]: https://travis-ci.org/lob/lob-node
[travis-image]: https://travis-ci.org/lob/lob-node.svg?branch=master
[depstat-url]: https://david-dm.org/Lob/Lob-node
[depstat-image]: https://david-dm.org/Lob/Lob-node.svg

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Build Status](https://travis-ci.org/lob/lob-node.svg?branch=master)](https://travis-ci.org/lob/lob-node) [![Dependency Status](https://gemnasium.com/lob/lob-node.svg)](https://gemnasium.com/lob/lob-node) [![Coverage Status](https://coveralls.io/repos/lob/lob-node/badge.svg?branch=master)](https://coveralls.io/r/lob/lob-node?branch=master)

Node.js wrapper for the [Lob.com](https://lob.com) API. See full Lob.com documentation [here](https://lob.com/docs/node).  For best results, be sure that you're using [the latest version](https://lob.com/docs/node#version) of the Lob API and the latest version of the Node wrapper.

## Table of Contents

- [Getting Started](#getting-started)
  - [Registration](#registration)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Options](#options)
- [Examples](#examples)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Testing](#testing)

## Getting Started

Here's a general overview of the Lob services available, click through to read more.

- [Postcards API](https://lob.com/services/postcards)
- [Letters API](https://lob.com/services/letters)
- [Checks API](https://lob.com/services/checks)
- [Area Mail API](https://lob.com/services/area)
- [Address Verification API](https://lob.com/verification/address)

### Registration

First, you will need to first create an account at [Lob.com](https://dashboard.lob.com/#/register) and obtain your Test and Live API Keys.

Once you have created an account, you can access your API Keys from the [Settings Panel](https://dashboard.lob.com/#/settings).

### Installation

lob-node can be installed through the npm:

```
$ npm install lob
```

To build and install from the latest source:

```
$ git clone git@github.com:lob/lob-node.git
$ npm install
```

### Usage
```javascript
var Lob = require('lob')('YOUR API KEY');

// change api version
var Lob = require('lob')('YOUR API KEY', { apiVersion: 'API-VERSION' });

// change internal defaults (e.g. host)
var options = {/* see options below */};
var Lob = require('lob')('YOUR API KEY', options);

// you can also just pass options
var options = { apiKey: 'foo', host: 'bar' };
var Lob = require('lob')(options);

// callback pattern
Lob.settings.list({ type: 1 }, function (err, body) {
  if (err) return callback(err);
  return callback(null, body.data);
});
```

Additionally, every resource method returns a promise, so you don't have to use the regular callback. E.g.

```javascript
var Lob = require('lob')('YOUR API KEY');

Lob.settings.list({ type: 1 })
.then(function (res) {
  console.log(res.data);
})
.catch(function (e) {
  console.log(e);
});
```

### Options
The Lob constructor accepts an `options` object which may contain one or more of the following options:

* `apiVersion` - Optionally set the version of the Lob API to use. Defaults to latest.
* `host` - Override the default host API calls are issued to.
* `userAgent` - Override the default userAgent.
* `headers` - Edit the headers sent in all API calls.

## Examples

We've provided various examples for you to try out [here](https://github.com/lob/lob-node/tree/master/examples).

There are simple scripts to demonstrate how to create all the core Lob objects (checks, letters, postcards. etc.) as well as more complex examples that utilize other libraries and external files:

- [Creating Dynamic Postcards with HTML and Data](https://github.com/lob/lob-node/tree/master/examples/create_postcards_from_csv)
- [Verifying and Creating Letters from CSV](https://github.com/lob/lob-node/tree/master/examples/verify_and_create_letters_from_csv)

#### Accessing Response Headers

You can access response headers via a hidden `_response` property.

```js
Lob.addresses.list()
.then(function (res) {
  res._response.headers['content-type'];
  // => "application/json; charset=utf-8"
});
```

You can also access headers from errors.

```js
Lob.addresses.retrieve('adr_bad_id')
.catch(function (err) {
  err._response.headers['content-type'];
  // => "application/json; charset=utf-8"
});
```

## API Documentation

- [Introduction](https://lob.com/docs/node#introduction)
- [Authentication](https://lob.com/docs/node#auth)
- [Versioning](https://lob.com/docs/node#version)
- [Errors](https://lob.com/docs/node#errors)
- [Rate Limiting](https://lob.com/docs/node#rate-limits)
- [Metadata](https://lob.com/docs/node#metadata)
- **Addresses**
  - [Address Book](https://lob.com/docs/node#addresses)
    - [Create an Address](https://lob.com/docs/node#addresses_create)
    - [Retrieve an Address](https://lob.com/docs/node#addresses_retrieve)
    - [Delete an Address](https://lob.com/docs/node#addresses_delete)
    - [List all Addresses](https://lob.com/docs/node#addresses_list)
  - [Address Verification API](https://lob.com/docs/node#verify)
    - [Verify an Address](https://lob.com/docs/node#verify_create)
- **Postcards API**
  - [Postcards](https://lob.com/docs/node#postcards)
    - [Create a Postcard](https://lob.com/docs/node#postcards_create)
    - [Retrieve a Postcard](https://lob.com/docs/node#postcards_retrieve)
    - [List all Postcards](https://lob.com/docs/node#postcards_list)
- **Letters API**
  - [Letters](https://lob.com/docs/node#letters)
    - [Create a Letter](https://lob.com/docs/node#letters_create)
    - [Retrieve a Letter](https://lob.com/docs/node#letters_retrieve)
    - [List all Letters](https://lob.com/docs/node#letters_list)
- **Checks API**
  - [Checks](https://lob.com/docs/node#checks)
    - [Create a Check](https://lob.com/docs/node#checks_create)
    - [Retrieve a Check](https://lob.com/docs/node#checks_retrieve)
    - [List all Checks](https://lob.com/docs/node#checks_list)
  - [Bank Accounts](https://lob.com/docs/node#bank-accounts)
    - [Create a Bank Account](https://lob.com/docs/node#bankaccounts_create)
    - [Retrieve a Bank Account](https://lob.com/docs/node#bankaccounts_retrieve)
    - [Delete a Bank Account](https://lob.com/docs/node#bankaccounts_delete)
    - [Verify a Bank Account](https://lob.com/docs/node#bankaccounts_verify)
    - [List all Bank Accounts](https://lob.com/docs/node#bankaccounts_list)
- **Area Mail API**
  - [Areas](https://lob.com/docs/node#areas)
    - [Create an Area Mailing](https://lob.com/docs/node#areas_create)
    - [Retrieve an Area Mailing](https://lob.com/docs/node#areas_retrieve)
    - [List all Area Mailings](https://lob.com/docs/node#areas_list)
  - [Routes](https://lob.com/docs/node#routes)
    - [Retrieve a Zip Code](https://lob.com/docs/node#routes_retrieve)
    - [List all Zip Codes](https://lob.com/docs/node#routes_list)
- **Resources**
  - [Countries](https://lob.com/docs/node#countries)
    - [List all Countries](https://lob.com/docs/node#countries_list)
  - [States](https://lob.com/docs/node#states)
    - [List all States](https://lob.com/docs/node#states_list)
- **Appendix**
  - [API Changelog](https://lob.com/docs/node#changelog)
  - [HTML Examples](https://lob.com/docs/node#html-examples)
  - [Image Prepping](https://lob.com/docs/node#prepping)

## Contributing

To contribute, please see the [CONTRIBUTING.md](https://github.com/lob/lob-node/blob/master/CONTRIBUTING.md) file.

## Testing

To run the tests with coverage:

    npm test

To run the tests without coverage:

    npm run test-no-cover

=======================

Copyright &copy; 2013 Lob.com

Released under the MIT License, which can be found in the repository in `LICENSE.txt`.
