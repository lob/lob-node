var lobFactory = require('../lib/index.js');
var Lob = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var chai         = require('chai');
var expect       = chai.expect;
/* jshint camelcase: false */
describe('Packagings', function () {
  describe('list', function () {
    it('should have correct defaults', function (done) {
      Lob.packagings.list(function (err, res) {
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
      Lob.packagings.retrieve('2', function (err, res) {
        expect(res.object).to.eql('packaging');
        done();
      });
    });
    it('should fail with bad id', function (done) {
      Lob.packagings.retrieve('9800', function (err) {
        expect(err[0].status_code).to.eql(404);
        done();
      });
    });
  });
});
/* jshint camelcase: true */
