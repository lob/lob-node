var Lob = require('../../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var Should;
Should = require('should');
/* jshint camelcase: false */

describe('Verification', function() {
  it('should have correct defaults', function(done) {
    var addressLine1 = '220 William T Morrissey Boulevard';
    var addressCity = 'Boston';
    var addressState = 'MA';
    var addressZip = '02125';
    Lob.verification.verify({
      address_line1: addressLine1,
      address_city: addressCity,
      address_state: addressState,
      address_zip: addressZip
    }, function(err, res) {
      res.should.have.property('address');
      res.address.should.have.property('address_line1');
      res.address.address_line1.should.eql('220 William T Morrissey Blvd');
      res.address.should.have.property('address_line2');
      res.address.address_line2.should.eql('');
      res.address.should.have.property('address_city');
      res.address.address_city.should.eql('Boston');
      res.address.should.have.property('address_state');
      res.address.address_state.should.eql('MA');
      res.address.should.have.property('address_zip');
      res.address.address_zip.should.eql('02125-3314');
      res.address.should.have.property('address_country');
      res.address.address_country.should.eql('United States');
      res.address.should.have.property('object');
      res.address.object.should.eql('address');
      return done();
    });
  });
  it('should error when invalid address is provided', function(done) {
    var addressLine1 = '123 Test Street';
    var addressCity = 'Boston';
    var addressState = 'MA';
    var addressZip = '02125';
    Lob.verification.verify({
      address_line1: addressLine1,
      address_city: addressCity,
      address_state: addressState,
      address_zip: addressZip
    }, function(err, res) {
      err.should.be.instanceof(Array);
      return done();
    });
  });
  it('should warn when semi-valid address is provided', function(done) {
    var addressLine1 = '325 Berry St';
    var addressCity = 'San Francisco';
    var addressState = 'CA';
    var addressZip = '94158';
    Lob.verification.verify({
      address_line1: addressLine1,
      address_city: addressCity,
      address_state: addressState,
      address_zip: addressZip
    }, function(err, res) {
      res.should.have.property('address');
      res.address.should.have.property('address_line1');
      res.address.address_line1.should.eql('325 Berry St');
      res.address.should.have.property('address_line2');
      res.address.address_line2.should.eql('');
      res.address.should.have.property('address_city');
      res.address.address_city.should.eql('San Francisco');
      res.address.should.have.property('address_state');
      res.address.address_state.should.eql('CA');
      res.address.should.have.property('address_zip');
      res.address.address_zip.should.eql('94158-1553');
      res.address.should.have.property('address_country');
      res.address.address_country.should.eql('United States');
      res.should.have.property('message');
      res.address.should.have.property('object');
      res.address.object.should.eql('address');
      return done();
    });
  });
});

/* jshint camelcase: true */
