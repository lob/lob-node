var chai    = require('chai');
var expect  = chai.expect;

var API_KEY = 'test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc';
var Lob     = require('../lib/index.js')(API_KEY);

describe('Routes', function () {
  describe('list', function () {
    it('should error with an invalid zip code', function (done) {
      Lob.routes.list({ zip_codes: [99999] }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have the correct defaults', function (done) {
      Lob.routes.list({ zip_codes: [48168, 94158] }, function (err, routes) {
        expect(routes).to.have.property('data');
        done();
      });
    });
  });
});
