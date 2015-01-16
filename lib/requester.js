'use strict';

var Bluebird = require('bluebird');

exports.request = Bluebird.promisify(require('request'));
