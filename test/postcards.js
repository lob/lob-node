'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

const ADDRESS = {
  name: 'Lob',
  email: 'support@lob.com',
  address_line1: '123 Main Street',
  address_line2: 'Apartment A',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: '94158',
  address_country: 'US'
};

describe('postcards', () => {

  describe('list', () => {

    it('returns a list of postcards', (done) => {
      mockLob()
        .get('/v1/postcards')
        .query(true)
        .reply(200, fixtures.list([fixtures.POSTCARD], 1));

      Lob.postcards.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        done();
      });
    });

    it('filters postcards', (done) => {
      mockLob()
        .get('/v1/postcards')
        .query({ limit: 1 })
        .reply(200, fixtures.list([fixtures.POSTCARD], 1));

      Lob.postcards.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

    describe('cursor', () => {

      it('filters postcards by before', (done) => {
        const listWithNextUrl = fixtures.list([fixtures.POSTCARD], 1);
        listWithNextUrl.next_url = 'https://api.lob.com/v1/postcards?after=eyJkYXRl';

        mockLob()
          .get('/v1/postcards')
          .query(true)
          .reply(200, listWithNextUrl);

        mockLob()
          .get('/v1/postcards')
          .query(true)
          .reply(200, fixtures.list([fixtures.POSTCARD], 1));

        Lob.postcards.list().then((list) => {
          const token = new URLSearchParams(list.next_url).get('after');
          return Lob.postcards.list({ before: token });
        }).then((res) => {
          expect(res.object).to.eql('list');
          expect(res.data).to.be.instanceof(Array);
          done();
        });
      });

      it('filters postcards by after', (done) => {
        const listWithNextUrl = fixtures.list([fixtures.POSTCARD], 1);
        listWithNextUrl.next_url = 'https://api.lob.com/v1/postcards?after=eyJkYXRl';

        mockLob()
          .get('/v1/postcards')
          .query(true)
          .reply(200, listWithNextUrl);

        mockLob()
          .get('/v1/postcards')
          .query(true)
          .reply(200, fixtures.list([fixtures.POSTCARD], 1));

        Lob.postcards.list().then((list) => {
          const token = new URLSearchParams(list.next_url).get('after');
          return Lob.postcards.list({ after: token });
        }).then((res) => {
          expect(res.object).to.eql('list');
          expect(res.data).to.be.instanceof(Array);
          done();
        });
      });

    });

  });

  describe('retrieve', () => {

    it('retrieves a postcard', (done) => {
      const postcardId = fixtures.POSTCARD.id;

      mockLob()
        .post('/v1/postcards')
        .reply(200, fixtures.POSTCARD);

      mockLob()
        .get(`/v1/postcards/${  postcardId}`)
        .reply(200, fixtures.POSTCARD);

      Lob.postcards.create({
        to: ADDRESS,
        front: '<h1>Test Postcard Front</h1>',
        back: '<h1>Test Postcard Back</h1>'
      }, (err, res) => {
        Lob.postcards.retrieve(res.id, () => {
          expect(res.object).to.eql('postcard');
          done();
        });
      });
    });

  });

  describe('create', () => {

    it('creates a postcard with a local file', (done) => {
      mockLob()
        .post('/v1/postcards')
        .reply(200, fixtures.POSTCARD);

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: '<h1>Test Front</h1>',
        back: '<h1>Test Back</h1>'
      }, (err, res) => {
        expect(res.object).to.eql('postcard');
        done();
      });
    });

    it('creates a postcard with a buffer', (done) => {
      mockLob()
        .post('/v1/postcards')
        .reply(200, fixtures.POSTCARD);

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: Buffer.from('test'),
        back: Buffer.from('test')
      }, (err, res) => {
        expect(res.object).to.eql('postcard');
        done();
      });
    });

    it('creates a postcard with a merge variable conditional', (done) => {
      const postcardWithMerge = fixtures.clone(fixtures.POSTCARD, {
        merge_variables: { is_awesome: true }
      });

      mockLob()
        .post('/v1/postcards')
        .reply(200, postcardWithMerge);

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: '<html>{{#is_awesome}}Awesome{{/is_awesome}}</html>',
        back: '<html>Back</html>',
        merge_variables: { is_awesome: true }
      }, (err, res) => {
        expect(res.object).to.eql('postcard');
        expect(res.merge_variables.is_awesome).to.be.true;
        done();
      });
    });

    it('errors with missing front', (done) => {
      mockLob()
        .post('/v1/postcards')
        .reply(422, fixtures.error('front is required', 422));

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        back: '<h1>Test Postcard Back</h1>',
        message: 'This is the message'
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

    it('errors with missing back', (done) => {
      mockLob()
        .post('/v1/postcards')
        .reply(422, fixtures.error('back is required', 422));

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: '<h1>Test Postcard Back</h1>'
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

  });

  describe('delete', () => {

    it('deletes a postcard', (done) => {
      const postcardId = fixtures.POSTCARD.id;

      mockLob()
        .post('/v1/postcards')
        .reply(200, fixtures.POSTCARD);

      mockLob()
        .delete(`/v1/postcards/${  postcardId}`)
        .reply(200, fixtures.deleted(postcardId));

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: Buffer.from('test'),
        back: Buffer.from('test')
      }, (err, res) => {
        Lob.postcards.delete(res.id, (err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
