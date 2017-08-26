'use strict';

var ADDRESS = {
  name: 'HARRY ZHANG',
  email: 'harry@lob.com',
  phone: '5555555555',
  address_line1: '185 BERRY ST STE 6100',
  address_line2: '',
  address_city: 'SAN FRANCISCO',
  address_state: 'CA',
  address_zip: '94107-1741',
  address_country: 'US'
};

describe('addresses', function () {

  describe('list', function () {

    it('returns a list of addresses', function (done) {
      Lob.addresses.list(function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res.count).to.eql(10);
        return done();
      });
    });

    it('filters addresses', function (done) {
      Lob.addresses.list({ limit: 1 }, function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        return done();
      });
    });

  });

  describe('create', function () {

    it('creates an address', function (done) {
      Lob.addresses.create(ADDRESS, function (err, res) {
        expect(res).to.have.property('id');
        expect(res.name).to.eql(ADDRESS.name);
        expect(res.email).to.eql(ADDRESS.email);
        expect(res.phone).to.eql(ADDRESS.phone);
        expect(res.address_line1).to.eql(ADDRESS.address_line1);
        expect(res.address_line2).to.eql(ADDRESS.address_line2);
        expect(res.address_city).to.eql(ADDRESS.address_city);
        expect(res.address_state).to.eql(ADDRESS.address_state);
        expect(res.address_zip).to.eql(ADDRESS.address_zip);
        expect(res.address_country).to.eql('UNITED STATES');
        expect(res).to.have.property('date_created');
        expect(res).to.have.property('date_modified');
        expect(res).to.have.property('object');
        expect(res.object).to.eql('address');
        return done();
      });
    });

  });

  describe('retrieve', function () {

    it('retrieves an address', function (done) {
      Lob.addresses.create(ADDRESS, function (err, res) {
        Lob.addresses.retrieve(res.id, function (err2, res2) {
          expect(res).to.eql(res2);
          return done();
        });
      });
    });

  });

  describe('delete', function () {

    it('deletes an address', function (done) {
      Lob.addresses.create(ADDRESS, function (err, res) {
        Lob.addresses.delete(res.id, function (err2, res2) {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
