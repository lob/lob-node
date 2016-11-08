'use strict';

var ResourceBase = require('../lib/resources/resourceBase.js');

describe('resource base', function () {

  it('should expose response headers', function (done) {
    Lob.addresses.list(function (err, res) {
      expect(res._response.headers['content-type']).to.exist;
      done();
    });
  });

  it('hides the raw response from stringification', function (done) {
    Lob.addresses.list(function (err, res) {
      expect(JSON.parse(JSON.stringify(res))._response).to.not.exist;
      done();
    });
  });

  it('should expose the raw response on 400 level error', function (done) {
    Lob.addresses.retrieve('adr_bad_id', function (err, res) {
      expect(err._response).to.exist;
      done();
    });
  });

  it('should expose the raw response on 500 level errors', function (done) {
    var resource = new ResourceBase('', {
      options: {
        host: 'https://mock.lob.com/500',
        apiKey: API_KEY
      }
    });

    return resource._transmit('POST', null, null, null, function (err) {
      expect(err._response).to.exist;
      return done();
    });
  });

});
