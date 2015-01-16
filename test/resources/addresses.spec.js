'use strict';

var chai = require('chai');
var expect = chai.expect;

var testHelpers = require('../testHelpers');
var Lob         = require('../../lib/lob')(testHelpers.testApiKey);

// Integration test for addresses.
describe('addresses', function () {

  var addressParams = {
    name: 'Lobster',
    email: 'lob@lob.com',
    phone: '5555555555',
    address_line1: '123 Test St',
    address_line2: 'Unit 123',
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94107',
    address_country: 'US'
  };

  describe('create', function () {
    it('should successfully create an address', function (done) {
      Lob.addresses.create(addressParams)
      .then(function (address) {
        expect(address.name).to.eql('Lobster');
        expect(address.object).to.eql('address');
      })
      .finally(done);
    });
  });

  describe('list', function () {
    it('should successfully list the addresses', function (done) {
      Lob.addresses.list()
      .then(function (addresses) {
        expect(addresses.object).to.eql('list');
      })
      .finally(done);
    });
  });

  describe('retrieve', function () {
    it('should successfully retrieve an address', function (done) {
      Lob.addresses.create(addressParams)
      .then(function (address) {
        return Lob.addresses.retrieve(address.id);
      })
      .then(function (address) {
        expect(address.name).to.eql('Lobster');
        expect(address.object).to.eql('address');
      })
      .finally(done);
    });
  });

  describe('delete', function () {
    it('should successfully delete an address', function (done) {
      Lob.addresses.create(addressParams)
      .then(function (address) {
        return Lob.addresses.delete(address.id);
      })
      .then(function (res) {
        expect(res.deleted).to.eql(1);
      })
      .finally(done);
    });
  });

});
