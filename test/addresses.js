'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

const ADDRESS_INPUT = {
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

describe('addresses', () => {

  describe('list', () => {

    it('returns a list of addresses', (done) => {
      mockLob()
        .get('/v1/addresses')
        .query(true)
        .reply(200, fixtures.list([fixtures.ADDRESS], 1));

      Lob.addresses.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        return done();
      });
    });

    it('filters addresses', (done) => {
      mockLob()
        .get('/v1/addresses')
        .query({ limit: 1 })
        .reply(200, fixtures.list([fixtures.ADDRESS], 1));

      Lob.addresses.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        return done();
      });
    });

  });

  describe('create', () => {

    it('creates an address', (done) => {
      mockLob()
        .post('/v1/addresses')
        .reply(200, fixtures.ADDRESS);

      Lob.addresses.create(ADDRESS_INPUT, (err, res) => {
        expect(res).to.have.property('id');
        expect(res.name).to.eql(ADDRESS_INPUT.name);
        expect(res.email).to.eql(ADDRESS_INPUT.email);
        expect(res.phone).to.eql(ADDRESS_INPUT.phone);
        expect(res.address_line1).to.eql(ADDRESS_INPUT.address_line1);
        expect(res.address_line2).to.eql(null);
        expect(res.address_city).to.eql(ADDRESS_INPUT.address_city);
        expect(res.address_state).to.eql(ADDRESS_INPUT.address_state);
        expect(res.address_zip).to.eql(ADDRESS_INPUT.address_zip);
        expect(res.address_country).to.eql('UNITED STATES');
        expect(res).to.have.property('date_created');
        expect(res).to.have.property('date_modified');
        expect(res).to.have.property('object');
        expect(res.object).to.eql('address');
        return done();
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves an address', (done) => {
      const addressId = fixtures.ADDRESS.id;

      mockLob()
        .post('/v1/addresses')
        .reply(200, fixtures.ADDRESS);

      mockLob()
        .get(`/v1/addresses/${  addressId}`)
        .reply(200, fixtures.ADDRESS);

      Lob.addresses.create(ADDRESS_INPUT, (err, res) => {
        Lob.addresses.retrieve(res.id, (err2, res2) => {
          expect(res).to.eql(res2);
          return done();
        });
      });
    });

  });

  describe('delete', () => {

    it('deletes an address', (done) => {
      const addressId = fixtures.ADDRESS.id;

      mockLob()
        .post('/v1/addresses')
        .reply(200, fixtures.ADDRESS);

      mockLob()
        .delete(`/v1/addresses/${  addressId}`)
        .reply(200, fixtures.deleted(addressId));

      Lob.addresses.create(ADDRESS_INPUT, (err, res) => {
        Lob.addresses.delete(res.id, (err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
