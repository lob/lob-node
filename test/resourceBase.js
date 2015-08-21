var chai    = require('chai');
var expect  = chai.expect;

var API_KEY = 'test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc';
var util         = require('util');
var ResourceBase = require('../lib/resources/resourceBase.js');

describe('ResourceBase', function () {
  it('should get 504 on gateway timeout', function (done) {
    var resource = new ResourceBase('', {
      options: {
        host: 'http://mock.codes/504',
        apiKey: API_KEY,
      }
    });

    return resource._transmit('GET', null, null, null, function (err, result) {
      expect(err.statusCode).to.eql(504);
      return done();
    });
  });
});
