# lob-node
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Build Status](https://travis-ci.org/lob/lob-node.svg?branch=master)](https://travis-ci.org/lob/lob-node) [![Dependency Status](https://gemnasium.com/lob/lob-node.svg)](https://gemnasium.com/lob/lob-node) [![Coverage Status](https://coveralls.io/repos/lob/lob-node/badge.png?branch=master)](https://coveralls.io/r/lob/lob-node?branch=master)


Node.js wrapper for the [Lob.com](http://Lob.com) API.

## Installation

lob-node can be installed through the npm:

```
$ npm install lob
```
To build and install from the latest source:

```
$ git clone git@github.com:lob/lob-node.git
$ npm install
```

## Getting Started

In order to use the client, you must have an API key. To obtain your key, you need to first create an account at [Lob.com](https://www.lob.com/)

You can access your API access credentials from the [Accounts Page](https://www.Lob.com/account)

##Usage
```javascript
> var Lob = require('Lob')('YOUR API KEY');
  undefined
```

##API
Please see the [API reference](API.md)

## Examples

Please Check out the Examples Folder for working examples.
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
