var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var Should;
Should = require('should');
/* jshint camelcase: false */
describe('Services', function () {
  describe('list', function () {
    it('should have correct defaults', function (done) {
      Lob.services.list(function (err, res) {
        res.should.have.property('object');
        res.should.have.property('data');
        res.data.should.be.instanceof(Array);
        res.object.should.eql('list');
        done();
      });
    });
  });
  describe('retrieve', function () {
    it('should have correct defaults', function (done) {
      Lob.services.retrieve('2', function (err, res) {
        res.object.should.eql('service');
        done();
      });
    });
    it('should fail with bad id', function (done) {
      Lob.services.retrieve('9800', function (err) {
        err[0].status_code.should.eql(404);
        done();
      });
    });
  });
});
/* jshint camelcase: true */
