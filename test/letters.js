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

describe('letters', () => {

  describe('list', () => {

    it('returns a list of letters', (done) => {
      mockLob()
        .get('/v1/letters')
        .query(true)
        .reply(200, fixtures.list([fixtures.LETTER], 1));

      Lob.letters.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        done();
      });
    });

    it('filters letters', (done) => {
      mockLob()
        .get('/v1/letters')
        .query({ limit: 1 })
        .reply(200, fixtures.list([fixtures.LETTER], 1));

      Lob.letters.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

    describe('cursor', () => {

      it('filters letters by before', (done) => {
        const listWithNextUrl = fixtures.list([fixtures.LETTER], 1);
        listWithNextUrl.next_url = 'https://api.lob.com/v1/letters?after=eyJkYXRl';

        mockLob()
          .get('/v1/letters')
          .query(true)
          .reply(200, listWithNextUrl);

        mockLob()
          .get('/v1/letters')
          .query(true)
          .reply(200, fixtures.list([fixtures.LETTER], 1));

        Lob.letters.list().then((list) => {
          const token = new URLSearchParams(list.next_url).get('after');
          return Lob.letters.list({ before: token });
        }).then((res) => {
          expect(res.object).to.eql('list');
          expect(res.data).to.be.instanceof(Array);
          done();
        });
      });

      it('filters letters by after', (done) => {
        const listWithNextUrl = fixtures.list([fixtures.LETTER], 1);
        listWithNextUrl.next_url = 'https://api.lob.com/v1/letters?after=eyJkYXRl';

        mockLob()
          .get('/v1/letters')
          .query(true)
          .reply(200, listWithNextUrl);

        mockLob()
          .get('/v1/letters')
          .query(true)
          .reply(200, fixtures.list([fixtures.LETTER], 1));

        Lob.letters.list().then((list) => {
          const token = new URLSearchParams(list.next_url).get('after');
          return Lob.letters.list({ after: token });
        }).then((res) => {
          expect(res.object).to.eql('list');
          expect(res.data).to.be.instanceof(Array);
          done();
        });
      });

    });

  });

  describe('retrieve', () => {

    it('retrieves a letter', (done) => {
      const letterId = fixtures.LETTER.id;

      mockLob()
        .post('/v1/letters')
        .reply(200, fixtures.LETTER);

      mockLob()
        .get(`/v1/letters/${  letterId}`)
        .reply(200, fixtures.LETTER);

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        color: true,
        file: '<h1>Test Letter</h1>'
      }, (err, res) => {
        Lob.letters.retrieve(res.id, (err2, res2) => {
          expect(res2.object).to.eql('letter');
          done();
        });
      });
    });

  });

  describe('create', () => {

    it('creates a letter with a local file', (done) => {
      mockLob()
        .post('/v1/letters')
        .reply(200, fixtures.LETTER);

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: '<h1>Test Letter</h1>',
        color: true
      }, (err, res) => {
        expect(res.object).to.eql('letter');
        done();
      });
    });

    it('creates a letter with a buffer', (done) => {
      mockLob()
        .post('/v1/letters')
        .reply(200, fixtures.LETTER);

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: Buffer.from('test'),
        color: false
      }, (err, res) => {
        expect(res.object).to.eql('letter');
        done();
      });
    });

    it('creates a letter with undefined optional parameters', (done) => {
      mockLob()
        .post('/v1/letters')
        .reply(200, fixtures.LETTER);

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: '<h1>Test Letter</h1>',
        color: false,
        extra_service: undefined
      }, (err, res) => {
        expect(res.object).to.eql('letter');
        done();
      });
    });

    it('creates a letter with a merge variable list', (done) => {
      const letterWithMerge = fixtures.clone(fixtures.LETTER, {
        merge_variables: {
          list: [{ name: 'Ami' }, { name: 'Nathan' }]
        }
      });

      mockLob()
        .post('/v1/letters')
        .reply(200, letterWithMerge);

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: '<html>{{#list}} {{name}} {{/list}}</html>',
        color: false,
        merge_variables: {
          list: [{ name: 'Ami' }, { name: 'Nathan' }]
        }
      }, (err, res) => {
        expect(res.object).to.eql('letter');
        expect(res.merge_variables.list[0].name).to.eql('Ami');
        expect(res.merge_variables.list[1].name).to.eql('Nathan');
        done();
      });
    });

    it('errors with a missing file', (done) => {
      mockLob()
        .post('/v1/letters')
        .reply(422, fixtures.error('file is required', 422));

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

  });

  describe('delete', () => {

    it('deletes a letter', (done) => {
      const letterId = fixtures.LETTER.id;

      mockLob()
        .post('/v1/letters')
        .reply(200, fixtures.LETTER);

      mockLob()
        .delete(`/v1/letters/${  letterId}`)
        .reply(200, fixtures.deleted(letterId));

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: '<h1>Test Letter</h1>',
        color: true
      }, (err, res) => {
        Lob.letters.delete(res.id, (err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
