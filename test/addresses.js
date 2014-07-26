var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var chai         = require('chai');
var expect       = chai.expect;
/* jshint camelcase: false */
describe('Addresses', function () {
  describe('list', function () {
    it('should have correct defaults', function (done) {
      Lob.addresses.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
        'v1/addresses?count=10&offset=10');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(10);
        return done();
      });
    });
    it('should have correct defaults', function (done) {
      Lob.addresses.list({offset: 0}, function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
        'v1/addresses?count=10&offset=10');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(10);
        return done();
      });
    });
    it('should let you limit the count', function (done) {
      Lob.addresses.list({count: 5}, function (err, res) {
        expect(res.count).to.eql(5);
        return done();
      });
    });
    it('should error on high count', function (done) {
      Lob.addresses.list({count: 589}, function (err) {
        expect(err[0].status_code).to.eql(422);
        return done();
      });
    });
    it('should let you shift the offset', function (done) {
      Lob.addresses.list({offset: 10}, function (err, res) {
        var address1 = res.data[9].id;
        Lob.addresses.list({offset: 9, count: 1}, function (err, res) {
          var address2 = res.data[0].id;
          expect(address1).to.not.eql(address2);
          return done();
        });
      });
    });
  });
  describe('create', function () {
    it('should succeed with default POST request', function (done) {
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
      }, function (err, res) {
        expect(res).to.have.property('id');
        expect(res).to.have.property('name');
        expect(res.name).to.eql(name);
        expect(res).to.have.property('email');
        expect(res.email).to.eql(email);
        expect(res).to.have.property('phone');
        expect(res.phone).to.eql(phone);
        expect(res).to.have.property('address_line1');
        expect(res.address_line1).to.eql(addressLine1);
        expect(res).to.have.property('address_line2');
        expect(res.address_line2).to.eql(addressLine2);
        expect(res).to.have.property('address_city');
        expect(res.address_city).to.eql(addressCity);
        expect(res).to.have.property('address_state');
        expect(res.address_state).to.eql('California');
        expect(res).to.have.property('address_zip');
        expect(res.address_zip).to.eql(addressZip);
        expect(res).to.have.property('address_country');
        expect(res.address_country).to.eql('United States');
        expect(res).to.have.property('date_created');
        expect(res).to.have.property('date_modified');
        expect(res).to.have.property('object');
        expect(res.object).to.eql('address');
        return done();
      });
    });

    it('should succeed with foreign state and country', function (done) {
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
      }, function (err, res) {
        expect(res).to.have.property('id');
        expect(res).to.have.property('name');
        expect(res.name).to.eql(name);
        expect(res).to.have.property('email');
        expect(res.email).to.eql(email);
        expect(res).to.have.property('phone');
        expect(res.phone).to.eql(phone);
        expect(res).to.have.property('address_line1');
        expect(res.address_line1).to.eql(addressLine1);
        expect(res).to.have.property('address_line2');
        expect(res.address_line2).to.eql(addressLine2);
        expect(res).to.have.property('address_city');
        expect(res.address_city).to.eql(addressCity);
        expect(res).to.have.property('address_state');
        expect(res.address_state).to.eql('British Columbia');
        expect(res).to.have.property('address_zip');
        expect(res.address_zip).to.eql(addressZip);
        expect(res).to.have.property('address_country');
        expect(res.address_country).to.eql('Canada');
        expect(res).to.have.property('date_created');
        expect(res).to.have.property('date_modified');
        expect(res).to.have.property('object');
        expect(res.object).to.eql('address');
        return done();
      });
    });
    it('should error when no name is provided', function (done) {
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
      }, function (err) {
        expect(err).to.be.instanceof(Array);
        return done();
      });
    });
    it('should error when no address_line1 is provided', function (done) {
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
      }, function (err) {
        expect(err).to.be.instanceof(Array);
        return done();
      });
    });
    it('should error when no address_zip is provided', function (done) {
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
      }, function (err) {
        expect(err).to.be.instanceof(Array);
        return done();
      });
    });
    it('should error when an invalid state is provided', function (done) {
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
      }, function (err) {
        expect(err).to.be.instanceof(Array);
        return done();
      });
    });
  });
  describe('get', function () {
    it('should have correct defaults', function (done) {
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
      }, function (err, res) {
        Lob.addresses.retrieve(res.id, function (err2, res2) {
          expect(res).to.eql(res2);
          return done();
        });
      });
    });
    it('should error on bad address', function (done) {
      Lob.addresses.retrieve('38472', function (err) {
        expect(err[0].status_code).to.eql(404);
        return done();
      });
    });
  });
  describe('delete', function () {
    it('should delete correctly', function (done) {
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
      }, function (err, res) {
        Lob.addresses.delete(res.id, function (err2, res2) {
          expect(res2.deleted).to.eql(1);
          return done();
        });
      });
    });
    it('should error on bad delete', function (done) {
      Lob.addresses.delete('38472', function (err) {
        expect(err[0].status_code).to.eql(404);
        return done();
      });
    });
  });
});
/* jshint camelcase: true */
