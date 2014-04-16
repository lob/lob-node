var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var Should;
Should = require('should');
/* jshint camelcase: false */
describe('Addresses', function() {
  describe('list', function() {
    it('should have correct defaults', function(done) {
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
    it('should let you limit the count', function(done) {
      Lob.addresses.list({count:5}, function(err, res) {
        res.count.should.eql(5);
        return done();
      });
    });
    it('should let you shift the offset', function(done) {
      Lob.addresses.list({offset:10}, function(err, res) {
        var address1 = res.data[9].id;
        Lob.addresses.list({offset:9, count:1}, function(err, res) {
          var address2 = res.data[0].id;
          address1.should.not.eql(address2);
          return done();
        });
      });
    });
  });
  describe('create', function() {
    it('should succeed with default POST request', function(done) {
      var name = 'Harry Zhang';
      var email = 'harry@Lob.com';
      var phone = '5555555555';
      var addressLine1 = '123 Test Street';
      var addressLine2 = 'Unit 123';
      var addressCity = 'San Francisco';
      var addressState = 'California';
      var addressZip = '94158';
      var addressCountry = 'US';
      Lob.addresses.create({
        name: name,
        email: email,
        phone: phone,
        address_line1: addressLine1,
        address_line2: addressLine2,
        address_city: addressCity,
        address_state: addressState,
        address_zip: addressZip,
        address_country: addressCountry
      }, function(err, res) {
        res.should.have.property('id');
        res.should.have.property('name');
        res.name.should.eql(name);
        res.should.have.property('email');
        res.email.should.eql(email);
        res.should.have.property('phone');
        res.phone.should.eql(phone);
        res.should.have.property('address_line1');
        res.address_line1.should.eql(addressLine1);
        res.should.have.property('address_line2');
        res.address_line2.should.eql(addressLine2);
        res.should.have.property('address_city');
        res.address_city.should.eql(addressCity);
        res.should.have.property('address_state');
        res.address_state.should.eql('California');
        res.should.have.property('address_zip');
        res.address_zip.should.eql(addressZip);
        res.should.have.property('address_country');
        res.address_country.should.eql('United States');
        res.should.have.property('date_created');
        res.should.have.property('date_modified');
        res.should.have.property('object');
        res.object.should.eql('address');
        return done();
      });
    });

    it('should succeed with foreign state and country', function(done) {
      var name = 'Harry Zhang';
      var email = 'harry@Lob.com';
      var phone = '5555555555';
      var addressLine1 = '123 Test Street';
      var addressLine2 = 'Unit 123';
      var addressCity = 'Armstrong';
      var addressState = 'British Columbia';
      var addressZip = 'V0E 1Y0';
      var addressCountry = 'CA';
      Lob.addresses.create({
        name: name,
        email: email,
        phone: phone,
        address_line1: addressLine1,
        address_line2: addressLine2,
        address_city: addressCity,
        address_state: addressState,
        address_zip: addressZip,
        address_country: addressCountry
      }, function(err, res) {
        res.should.have.property('id');
        res.should.have.property('name');
        res.name.should.eql(name);
        res.should.have.property('email');
        res.email.should.eql(email);
        res.should.have.property('phone');
        res.phone.should.eql(phone);
        res.should.have.property('address_line1');
        res.address_line1.should.eql(addressLine1);
        res.should.have.property('address_line2');
        res.address_line2.should.eql(addressLine2);
        res.should.have.property('address_city');
        res.address_city.should.eql(addressCity);
        res.should.have.property('address_state');
        res.address_state.should.eql('British Columbia');
        res.should.have.property('address_zip');
        res.address_zip.should.eql(addressZip);
        res.should.have.property('address_country');
        res.address_country.should.eql('Canada');
        res.should.have.property('date_created');
        res.should.have.property('date_modified');
        res.should.have.property('object');
        res.object.should.eql('address');
        return done();
      });
    });
    it('should error when no name is provided', function(done) {
      var email = 'harry@Lob.com';
      var phone = '5555555555';
      var addressLine1 = '123 Test Street';
      var addressLine2 = 'Unit 123';
      var addressCity = 'San Francisco';
      var addressState = 'CA';
      var addressZip = '94158';
      var addressCountry = 'US';
      Lob.addresses.create({
        email: email,
        phone: phone,
        address_line1: addressLine1,
        address_line2: addressLine2,
        address_city: addressCity,
        address_state: addressState,
        address_zip: addressZip,
        address_country: addressCountry
      }, function(err) {
        err.should.be.instanceof(Array);
        return done();
      });
    });
    it('should error when no address_line1 is provided', function(done) {
      var name = 'Harry Zhang';
      var email = 'harry@Lob.com';
      var phone = '5555555555';
      var addressLine2 = 'Unit 123';
      var addressCity = 'San Francisco';
      var addressState = 'CA';
      var addressZip = '94158';
      var addressCountry = 'US';
      Lob.addresses.create({
        name: name,
        email: email,
        phone: phone,
        address_line2: addressLine2,
        address_city: addressCity,
        address_state: addressState,
        address_zip: addressZip,
        address_country: addressCountry
      }, function(err) {
        err.should.be.instanceof(Array);
        return done();
      });
    });
    it('should error when no address_zip is provided', function(done) {
      var name = 'Harry Zhang';
      var email = 'harry@Lob.com';
      var phone = '5555555555';
      var addressLine1 = '123 Test Street';
      var addressLine2 = 'Unit 123';
      var addressCity = 'San Francisco';
      var addressState = 'CA';
      var addressCountry = 'US';
      Lob.addresses.create({
        name: name,
        email: email,
        phone: phone,
        address_line1: addressLine1,
        address_line2: addressLine2,
        address_city: addressCity,
        address_state: addressState,
        address_country: addressCountry
      }, function(err) {
        err.should.be.instanceof(Array);
        return done();
      });
    });
    it('should error when an invalid state is provided', function(done) {
      var name = 'Harry Zhang';
      var email = 'harry@Lob.com';
      var phone = '5555555555';
      var addressLine1 = '123 Test Street';
      var addressLine2 = 'Unit 123';
      var addressCity = 'San Francisco';
      var addressState = 'ZZ';
      var addressZip = '94158';
      var addressCountry = 'US';
      Lob.addresses.create({
        name: name,
        email: email,
        phone: phone,
        address_line1: addressLine1,
        address_line2: addressLine2,
        address_city: addressCity,
        address_state: addressState,
        address_zip: addressZip,
        address_country: addressCountry
      }, function(err) {
        err.should.be.instanceof(Array);
        return done();
      });
    });
  });
  describe('get', function() {
    it('should have correct defaults', function(done) {
      var name = 'Harry Zhang';
      var email = 'harry@Lob.com';
      var phone = '5555555555';
      var addressLine1 = '123 Test Street';
      var addressLine2 = 'Unit 123';
      var addressCity = 'San Francisco';
      var addressState = 'CA';
      var addressZip = '94158';
      var addressCountry = 'US';
      Lob.addresses.create({
        name: name,
        email: email,
        phone: phone,
        address_line1: addressLine1,
        address_line2: addressLine2,
        address_city: addressCity,
        address_state: addressState,
        address_zip: addressZip,
        address_country: addressCountry
      }, function(err, res) {
        Lob.addresses.retrieve(res.id, function(err2, res2) {
          res.should.eql(res2);
          return done();
        });
      });
    });
  });
});
/* jshint camelcase: true */
