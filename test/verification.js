'use strict';

var chai    = require('chai');
var expect  = chai.expect;

var API_KEY = 'test_fd34e1b5ea86a597ec89f7f2e46940c874d';
var Lob     = require('../lib/index.js')(API_KEY);

describe('Verification', function () {
  it('should have correct defaults', function (done) {
    var addressLine1 = '220 William T Morrissey Boulevard';
    var addressCity = 'Boston';
    var addressState = 'MA';
    var addressZip = '02125';
    Lob.verification.verify({
      address_line1: addressLine1,
      address_city: addressCity,
      address_state: addressState,
      address_zip: addressZip
    }, function (err, res) {
      expect(res).to.have.property('address');
      expect(res.address).to.have.property('address_line1');
      expect(res.address.address_line1).to.eql('220 WILLIAM T MORRISSEY BLVD');
      expect(res.address).to.have.property('address_line2');
      expect(res.address.address_line2).to.eql('');
      expect(res.address).to.have.property('address_city');
      expect(res.address.address_city).to.eql('BOSTON');
      expect(res.address).to.have.property('address_state');
      expect(res.address.address_state).to.eql('MA');
      expect(res.address).to.have.property('address_zip');
      expect(res.address.address_zip).to.eql('02125-3314');
      expect(res.address).to.have.property('address_country');
      expect(res.address.address_country).to.eql('US');
      return done();
    });
  });

  it('should error when invalid address is provided', function (done) {
    var addressLine1 = '123 Test Street';
    var addressCity = 'Boston';
    var addressState = 'MA';
    var addressZip = '02125';
    Lob.verification.verify({
      address_line1: addressLine1,
      address_city: addressCity,
      address_state: addressState,
      address_zip: addressZip
    }, function (err) {
      expect(err).to.be.instanceof(Object);
      return done();
    });
  });

  it('should warn when semi-valid address is provided', function (done) {
    var addressLine1 = '325 Berry St';
    var addressCity = 'San Francisco';
    var addressState = 'CA';
    var addressZip = '94158';
    Lob.verification.verify({
      address_line1: addressLine1,
      address_city: addressCity,
      address_state: addressState,
      address_zip: addressZip
    }, function (err, res) {
      expect(res).to.have.property('address');
      expect(res.address).to.have.property('address_line1');
      expect(res.address.address_line1).to.eql('325 BERRY ST');
      expect(res.address).to.have.property('address_line2');
      expect(res.address.address_line2).to.eql('');
      expect(res.address).to.have.property('address_city');
      expect(res.address.address_city).to.eql('SAN FRANCISCO');
      expect(res.address).to.have.property('address_state');
      expect(res.address.address_state).to.eql('CA');
      expect(res.address).to.have.property('address_zip');
      expect(res.address.address_zip).to.eql('94158-1553');
      expect(res.address).to.have.property('address_country');
      expect(res.address.address_country).to.eql('US');
      expect(res).to.have.property('message');
      return done();
    });
  });
});
