var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var Should;
Should = require('should');
/* jshint camelcase: false */
describe('Addresses', function() {
  describe('list', function() {
    it('should have correct deafults', function(done) {
      Lob.addresses.list(function(err, res) {
        res.should.have.property('object');
        res.should.have.property('data');
        res.data.should.be.instanceof(Array);
        res.data.length.should.eql(10);
        res.should.have.property('count');
        res.should.have.property('next_url');
        res.next_url.should.eql('https://api.lob.com/' +
        'v1/addresses?count=10&offset=10');
        res.should.have.property('previous_url');
        res.object.should.eql('list');
        res.count.should.eql(10);
        return done();
      });
    });
  });
});
/* jshint camelcase: true */
