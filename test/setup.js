'use strict'

var Chai = require('chai');

var API_KEY = 'test_fd34e1b5ea86a597ec89f7f2e46940c874d';

global.expect = Chai.expect;
global.API_KEY = API_KEY;
global.Lob = require('../lib/index.js')(API_KEY);
