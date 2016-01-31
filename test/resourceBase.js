'use strict';

var ResourceBase = require('../lib/resources/resourceBase.js');

describe('resource base', function () {

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
