var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var chai         = require('chai');
var expect       = chai.expect;
/* jshint camelcase: false */
describe('States', function () {
  describe('list', function () {
    it('should have correct defaults', function (done) {
      Lob.states.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        return done();
      });
    });
  });
});
/* jshint camelcase: true */
