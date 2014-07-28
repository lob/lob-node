var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var chai         = require('chai');
var expect       = chai.expect;
/* jshint camelcase: false */
describe('Settings', function () {
  describe('list', function () {
    it('should have correct defaults', function (done) {
      Lob.settings.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.object).to.eql('list');
        done();
      });
    });
  });
  describe('retrieve', function () {
    it('should have correct defaults', function (done) {
      Lob.settings.retrieve('100', function (err, res) {
        expect(res.object).to.eql('setting');
        done();
      });
    });
    it('should fail with bad id', function (done) {
      Lob.settings.retrieve('9800', function (err) {
        expect(err[0].status_code).to.eql(404);
        done();
      });
    });
  });
});
/* jshint camelcase: true */
