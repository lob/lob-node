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

describe('self mailers', () => {

  describe('list', () => {

    it('returns a list of self mailers', (done) => {
      mockLob()
        .get('/v1/self_mailers')
        .query(true)
        .reply(200, fixtures.list([fixtures.SELF_MAILER], 1));

      Lob.selfMailers.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        done();
      });
    });

    it('filters self mailers', (done) => {
      mockLob()
        .get('/v1/self_mailers')
        .query({ limit: 1 })
        .reply(200, fixtures.list([fixtures.SELF_MAILER], 1));

      Lob.selfMailers.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

    describe('cursor', () => {

      it('filters selfMailers by before', (done) => {
        const listWithNextUrl = fixtures.list([fixtures.SELF_MAILER], 1);
        listWithNextUrl.next_url = 'https://api.lob.com/v1/self_mailers?after=eyJkYXRl';

        mockLob()
          .get('/v1/self_mailers')
          .query(true)
          .reply(200, listWithNextUrl);

        mockLob()
          .get('/v1/self_mailers')
          .query(true)
          .reply(200, fixtures.list([fixtures.SELF_MAILER], 1));

        Lob.selfMailers.list().then((list) => {
          const token = new URLSearchParams(list.next_url).get('after');
          return Lob.selfMailers.list({ before: token });
        }).then((res) => {
          expect(res.object).to.eql('list');
          expect(res.data).to.be.instanceof(Array);
          done();
        });
      });

      it('filters self mailers by after', (done) => {
        const listWithNextUrl = fixtures.list([fixtures.SELF_MAILER], 1);
        listWithNextUrl.next_url = 'https://api.lob.com/v1/self_mailers?after=eyJkYXRl';

        mockLob()
          .get('/v1/self_mailers')
          .query(true)
          .reply(200, listWithNextUrl);

        mockLob()
          .get('/v1/self_mailers')
          .query(true)
          .reply(200, fixtures.list([fixtures.SELF_MAILER], 1));

        Lob.selfMailers.list().then((list) => {
          const token = new URLSearchParams(list.next_url).get('after');
          return Lob.selfMailers.list({ after: token });
        }).then((res) => {
          expect(res.object).to.eql('list');
          expect(res.data).to.be.instanceof(Array);
          done();
        });
      });

    });

  });

  describe('retrieve', () => {

    it('retrieves a self mailer', (done) => {
      const selfMailerId = fixtures.SELF_MAILER.id;

      mockLob()
        .post('/v1/self_mailers')
        .reply(200, fixtures.SELF_MAILER);

      mockLob()
        .get(`/v1/self_mailers/${  selfMailerId}`)
        .reply(200, fixtures.SELF_MAILER);

      Lob.selfMailers.create({
        to: ADDRESS,
        outside: '<h1>Test Self Mailer Outside</h1>',
        inside: '<h1>Test Self Mailer Inside</h1>'
      }, (err, res) => {
        Lob.selfMailers.retrieve(res.id, () => {
          expect(res.object).to.eql('self_mailer');
          done();
        });
      });
    });

  });

  describe('create', () => {

    it('creates a self mailer with a local file', (done) => {
      mockLob()
        .post('/v1/self_mailers')
        .reply(200, fixtures.SELF_MAILER);

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: '<h1>Test Outside</h1>',
        inside: '<h1>Test Inside</h1>'
      }, (err, res) => {
        expect(res.object).to.eql('self_mailer');
        done();
      });
    });

    it('creates a 12x9 self mailer with a local file', (done) => {
      mockLob()
        .post('/v1/self_mailers')
        .reply(200, fixtures.SELF_MAILER);

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: '<h1>Test Outside</h1>',
        inside: '<h1>Test Inside</h1>',
        size: '12x9_bifold'
      }, (err, res) => {
        expect(res.object).to.eql('self_mailer');
        done();
      });
    });

    it('creates a self mailer with a buffer', (done) => {
      mockLob()
        .post('/v1/self_mailers')
        .reply(200, fixtures.SELF_MAILER);

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: Buffer.from('test'),
        inside: Buffer.from('test')
      }, (err, res) => {
        expect(res.object).to.eql('self_mailer');
        done();
      });
    });

    it('creates a self mailer with a merge variable conditional', (done) => {
      const selfMailerWithMerge = fixtures.clone(fixtures.SELF_MAILER, {
        merge_variables: { is_awesome: true }
      });

      mockLob()
        .post('/v1/self_mailers')
        .reply(200, selfMailerWithMerge);

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: '<html>{{#is_awesome}}Awesome{{/is_awesome}}</html>',
        inside: '<html>Inside</html>',
        merge_variables: { is_awesome: true }
      }, (err, res) => {
        expect(res.object).to.eql('self_mailer');
        expect(res.merge_variables.is_awesome).to.be.true;
        done();
      });
    });

    it('errors with missing outside', (done) => {
      mockLob()
        .post('/v1/self_mailers')
        .reply(422, fixtures.error('outside is required', 422));

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        inside: '<h1>Test Self Mailer Inside</h1>',
        message: 'This is the message'
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

    it('errors with missing inside', (done) => {
      mockLob()
        .post('/v1/self_mailers')
        .reply(422, fixtures.error('inside is required', 422));

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: '<h1>Test Self Mailer Outside</h1>'
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

  });

  describe('delete', () => {

    it('deletes a self mailer', (done) => {
      const selfMailerId = fixtures.SELF_MAILER.id;

      mockLob()
        .post('/v1/self_mailers')
        .reply(200, fixtures.SELF_MAILER);

      mockLob()
        .delete(`/v1/self_mailers/${  selfMailerId}`)
        .reply(200, fixtures.deleted(selfMailerId));

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: Buffer.from('test'),
        inside: Buffer.from('test')
      }, (err, res) => {
        Lob.selfMailers.delete(res.id, (err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
