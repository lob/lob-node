'use strict';

describe('Integration: Postcards', function () {

  this.timeout(INTEGRATION_TIMEOUT);

  let createdPostcardId;

  const TEST_ADDRESS = {
    name: 'Test Recipient',
    address_line1: '185 Berry St',
    address_line2: 'Ste 6100',
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94107'
  };

  describe('create', () => {

    it('creates a postcard with inline addresses', (done) => {
      Lob.postcards.create({
        description: 'Integration Test Postcard',
        to: TEST_ADDRESS,
        from: TEST_ADDRESS,
        front: '<html><body><h1>Front</h1></body></html>',
        back: '<html><body><h1>Back</h1></body></html>'
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.property('id');
        expect(res.id).to.match(/^psc_/);
        expect(res.description).to.eql('Integration Test Postcard');
        expect(res.object).to.eql('postcard');
        createdPostcardId = res.id;
        done();
      });
    });

    it('creates a postcard with merge variables', (done) => {
      Lob.postcards.create({
        description: 'Merge Variable Test',
        to: TEST_ADDRESS,
        from: TEST_ADDRESS,
        front: '<html><body><h1>Hello {{name}}</h1></body></html>',
        back: '<html><body><p>Your code: {{code}}</p></body></html>',
        merge_variables: {
          name: 'Test User',
          code: 'ABC123'
        }
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.property('id');
        expect(res.merge_variables).to.deep.eql({
          name: 'Test User',
          code: 'ABC123'
        });
        done();
      });
    });

    it('rejects postcard with missing front', (done) => {
      Lob.postcards.create({
        to: TEST_ADDRESS,
        back: '<html><body><h1>Back</h1></body></html>'
      }, (err) => {
        expect(err).to.exist;
        expect(err.message).to.exist;
        done();
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves a created postcard', function (done) {
      if (!createdPostcardId) {
        return this.skip();
      }
      Lob.postcards.retrieve(createdPostcardId, (err, res) => {
        expect(err).to.not.exist;
        expect(res.id).to.eql(createdPostcardId);
        expect(res.object).to.eql('postcard');
        done();
      });
    });

  });

  describe('list', () => {

    it('returns a list of postcards', (done) => {
      Lob.postcards.list({ limit: 5 }, (err, res) => {
        expect(err).to.not.exist;
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        done();
      });
    });

  });

  describe('delete', () => {

    it('cancels a created postcard', function (done) {
      if (!createdPostcardId) {
        return this.skip();
      }
      Lob.postcards.delete(createdPostcardId, (err, res) => {
        expect(err).to.not.exist;
        expect(res.id).to.eql(createdPostcardId);
        expect(res.deleted).to.eql(true);
        done();
      });
    });

  });

});
