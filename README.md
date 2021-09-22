# lob-node

[downloads-image]: http://img.shields.io/npm/dm/lob.svg
[npm-url]: https://npmjs.org/package/lob
[npm-image]: https://badge.fury.io/js/lob.svg
[travis-url]: https://travis-ci.org/lob/lob-node
[travis-image]: https://travis-ci.org/lob/lob-node.svg?branch=master
[depstat-url]: https://david-dm.org/Lob/Lob-node
[depstat-image]: https://david-dm.org/Lob/Lob-node.svg

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Build Status](https://travis-ci.org/lob/lob-node.svg?branch=master)](https://travis-ci.org/lob/lob-node) [![Dependency Status](https://david-dm.org/lob/lob-node.svg)](https://david-dm.org/lob/lob-node) [![Dev Dependency Status](https://david-dm.org/lob/lob-node/dev-status.svg)](https://david-dm.org/lob/lob-node) [![Coverage Status](https://coveralls.io/repos/lob/lob-node/badge.svg?branch=master)](https://coveralls.io/r/lob/lob-node?branch=master)

Node.js wrapper for the [Lob.com](https://lob.com) API. See full Lob.com documentation [here](https://lob.com/docs/node). For best results, be sure that you're using [the latest version](https://lob.com/docs/node#version) of the Lob API and the latest version of the Node wrapper.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Registration](#registration)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Options](#options)
- [Examples](#examples)
    - [Accessing Response Headers](#accessing-response-headers)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Testing](#testing)

## Getting Started

Here's a general overview of the Lob services available, click through to read more.

- [Postcards API](https://lob.com/products/print-mail/postcards)
- [Letters API](https://lob.com/products/print-mail/letters)
- [Checks API](https://lob.com/products/print-mail/checks)
- [Address Verification API](https://lob.com/products/address-verification)

Please read through the official [API Documentation](#api-documentation) to get a complete sense of what to expect from each endpoint.

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
const Lob = require('lob')('YOUR API KEY');

// change api version
const Lob = require('lob')('YOUR API KEY', { apiVersion: 'API-VERSION' });

// change internal defaults (e.g. host)
const options = {/* see options below */};
const Lob = require('lob')('YOUR API KEY', options);

// you can also just pass options
const options = { apiKey: 'foo', host: 'bar' };
const Lob = require('lob')(options);

// callback pattern
Lob.addresses.list((err, body) => {
  if (err) return callback(err);
  return callback(null, body.data);
});
```

Additionally, every resource method returns a promise, so you don't have to use the regular callback. E.g.

```javascript
const Lob = require('lob')('YOUR API KEY');

Lob.addresses.list()
.then((res) => {
  console.log(res.data);
})
.catch((e) => {
  console.log(e);
});
```

### Options
The Lob constructor accepts an `options` object which may contain one or more of the following options:

* `apiVersion` - Optionally set the version of the Lob API to use. Defaults to latest.
* `host` - Override the default host API calls are issued to.
* `userAgent` - Override the default userAgent.
* `headers` - Edit the headers sent in all API calls.
* `agent` - Override the default HTTP agent used to make requests.

## Examples

We've provided various examples for you to try out [here](https://github.com/lob/lob-node/tree/master/examples).

There are simple scripts to demonstrate how to create all the core Lob objects (checks, letters, postcards. etc.) as well as more complex examples that utilize other libraries and external files.

#### Accessing Response Headers

You can access response headers via a hidden `_response` property.

```javascript
Lob.addresses.list()
.then((res) => {
  res._response.headers['content-type'];
  // => "application/json; charset=utf-8"
});
```

You can also access headers from errors.

```javascript
Lob.addresses.retrieve('adr_bad_id')
.catch((err) => {
  err._response.headers['content-type'];
  // => "application/json; charset=utf-8"
});
```

## API Documentation

The full and comprehensive documentation of Lob's APIs is available [here](https://docs.lob.com/).

## Contributing

To contribute, please see the [CONTRIBUTING.md](https://github.com/lob/lob-node/blob/master/CONTRIBUTING.md) file.

## Testing

To run the tests with coverage:

```
LOB_API_KEY=YOUR_TEST_API_KEY npm test
```

To run the tests without coverage:

```
LOB_API_KEY=YOUR_TEST_API_KEY npm run test-no-cover
```

=======================

Copyright &copy; 2013 Lob.com

Released under the MIT License, which can be found in the repository in `LICENSE.txt`.
