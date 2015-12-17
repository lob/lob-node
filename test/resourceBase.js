'use strict';

var chai    = require('chai');
var expect  = chai.expect;

var API_KEY = 'test_fd34e1b5ea86a597ec89f7f2e46940c874d';
var ResourceBase = require('../lib/resources/resourceBase.js');

describe('ResourceBase', function () {
  it('should get 504 on gateway timeout', function (done) {
    var resource = new ResourceBase('', {
      options: {
        host: 'http://mock.codes/504',
        apiKey: API_KEY
      }
    });

    return resource._transmit('GET', null, null, null, function (err) {
      expect(err.statusCode).to.eql(504);
      return done();
    });
  });
});
