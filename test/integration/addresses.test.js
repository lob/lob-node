'use strict';

describe('Integration: Addresses', function () {

  this.timeout(INTEGRATION_TIMEOUT);

  let createdAddressId;

  const TEST_ADDRESS = {
    name: 'Integration Test',
    address_line1: '185 Berry St',
    address_line2: 'Ste 6100',
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94107',
    address_country: 'US'
  };

  describe('create', () => {

    it('creates an address with valid data', (done) => {
      Lob.addresses.create(TEST_ADDRESS, (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.property('id');
        expect(res.id).to.match(/^adr_/);
        expect(res.name).to.eql('INTEGRATION TEST');
        expect(res.address_city).to.eql('SAN FRANCISCO');
        expect(res.object).to.eql('address');
        createdAddressId = res.id;
        done();
      });
    });

    it('rejects an address with invalid data', (done) => {
      Lob.addresses.create({
        name: 'Bad Address',
        address_line1: '123 Fake Street',
        address_city: 'Nonexistent City',
        address_state: 'XX',
        address_zip: '00000',
        address_country: 'US'
      }, (err) => {
        expect(err).to.exist;
        expect(err.message).to.exist;
        done();
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves a created address', function (done) {
      if (!createdAddressId) {
        return this.skip();
      }
      Lob.addresses.retrieve(createdAddressId, (err, res) => {
        expect(err).to.not.exist;
        expect(res.id).to.eql(createdAddressId);
        expect(res.object).to.eql('address');
        done();
      });
    });

    it('returns error for non-existent address', (done) => {
      Lob.addresses.retrieve('adr_nonexistent123456', (err) => {
        expect(err).to.exist;
        expect(err.status_code).to.eql(404);
        done();
      });
    });

  });

  describe('list', () => {

    it('returns a list of addresses', (done) => {
      Lob.addresses.list({ limit: 5 }, (err, res) => {
        expect(err).to.not.exist;
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(5);
        done();
      });
    });

  });

  describe('delete', () => {

    it('deletes a created address', function (done) {
      if (!createdAddressId) {
        return this.skip();
      }
      Lob.addresses.delete(createdAddressId, (err, res) => {
        expect(err).to.not.exist;
        expect(res.id).to.eql(createdAddressId);
        expect(res.deleted).to.eql(true);
        done();
      });
    });

  });

});
