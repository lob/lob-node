var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var Should;
Should = require('should');
/* jshint camelcase: false */
describe('Settings', function() {
  describe('list', function() {
    it('should have correct defaults', function(done) {
      Lob.settings.list(function(err, res) {
        res.should.have.property('object');
        res.should.have.property('data');
        res.data.should.be.instanceof(Array);
        res.object.should.eql('list');
        done();
      });
    });
  });
});
/* jshint camelcase: true */
