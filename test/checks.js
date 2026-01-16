'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

describe('checks', () => {

  describe('create', () => {

    it('creates a check', (done) => {
      const checkWithMerge = fixtures.clone(fixtures.CHECK, {
        merge_variables: { data: { title: 'Test Check' } }
      });

      mockLob()
        .post('/v1/checks')
        .reply(200, checkWithMerge);

      Lob.checks.create({
        description: 'TEST_CHECK',
        bank_account: 'bank_test123',
        to: 'adr_test123',
        from: 'adr_test123',
        amount: 100,
        memo: 'test check',
        check_bottom: '<h1>{{data.title}}</h1>',
        merge_variables: { data: { title: 'Test Check' } }
      }, (err, res) => {
        expect(res).to.have.property('id');
        expect(res).to.have.property('description');
        expect(res).to.have.property('bank_account');
        expect(res).to.have.property('check_number');
        expect(res).to.have.property('memo');
        expect(res.memo).to.eql('Test memo');
        expect(res.object).to.eql('check');
        expect(res.merge_variables.data.title).to.eql('Test Check');
        return done();
      });
    });

    it('creates a check with an idempotency key', (done) => {
      mockLob()
        .post('/v1/checks')
        .reply(200, fixtures.CHECK);

      mockLob()
        .post('/v1/checks')
        .reply(200, fixtures.CHECK);

      Lob.checks.create({
        description: 'TEST_CHECK',
        bank_account: 'bank_test123',
        to: 'adr_test123',
        from: 'adr_test123',
        amount: 100,
        memo: 'test check'
      }, { 'idempotency-key': 'test-key-123' }, (_err, res) => {
        Lob.checks.create({
          description: 'TEST_CHECK',
          bank_account: 'bank_test123',
          to: 'adr_test123',
          from: 'adr_test123',
          amount: 100,
          memo: 'test check'
        }, { 'idempotency-key': 'test-key-123' }, (_err2, resTwo) => {
          expect(res.id).to.eql(resTwo.id);
          expect(res).to.have.property('id');
          expect(res).to.have.property('description');
          expect(res).to.have.property('bank_account');
          expect(res).to.have.property('check_number');
          expect(res).to.have.property('memo');
          expect(res.object).to.eql('check');
          return done();
        });
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves a check', (done) => {
      const checkId = fixtures.CHECK.id;

      mockLob()
        .post('/v1/checks')
        .reply(200, fixtures.CHECK);

      mockLob()
        .get(`/v1/checks/${  checkId}`)
        .reply(200, fixtures.CHECK);

      Lob.checks.create({
        description: 'TEST_CHECK',
        bank_account: 'bank_test123',
        to: 'adr_test123',
        from: 'adr_test123',
        amount: 100,
        memo: 'test check'
      }, (_err, res) => {
        Lob.checks.retrieve(res.id, (_err2, res2) => {
          expect(res2).to.have.property('id');
          expect(res2).to.have.property('description');
          expect(res2).to.have.property('bank_account');
          expect(res2).to.have.property('check_number');
          expect(res2).to.have.property('memo');
          expect(res2.object).to.eql('check');
          done();
        });
      });
    });

  });

  describe('list', () => {

    it('returns a list of checks', (done) => {
      mockLob()
        .get('/v1/checks')
        .query(true)
        .reply(200, fixtures.list([fixtures.CHECK], 1));

      Lob.checks.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        return done();
      });
    });

    it('filters checks', (done) => {
      mockLob()
        .get('/v1/checks')
        .query({ limit: 1 })
        .reply(200, fixtures.list([fixtures.CHECK], 1));

      Lob.checks.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

    describe('cursor', () => {

      it('filters checks by before', (done) => {
        const listWithNextUrl = fixtures.list([fixtures.CHECK], 1);
        listWithNextUrl.next_url = 'https://api.lob.com/v1/checks?after=eyJkYXRl';

        mockLob()
          .get('/v1/checks')
          .query(true)
          .reply(200, listWithNextUrl);

        mockLob()
          .get('/v1/checks')
          .query(true)
          .reply(200, fixtures.list([fixtures.CHECK], 1));

        Lob.checks.list().then((list) => {
          const token = new URLSearchParams(list.next_url).get('after');
          return Lob.checks.list({ before: token });
        }).then((res) => {
          expect(res.object).to.eql('list');
          expect(res.data).to.be.instanceof(Array);
          done();
        });
      });

      it('filters checks by after', (done) => {
        const listWithNextUrl = fixtures.list([fixtures.CHECK], 1);
        listWithNextUrl.next_url = 'https://api.lob.com/v1/checks?after=eyJkYXRl';

        mockLob()
          .get('/v1/checks')
          .query(true)
          .reply(200, listWithNextUrl);

        mockLob()
          .get('/v1/checks')
          .query(true)
          .reply(200, fixtures.list([fixtures.CHECK], 1));

        Lob.checks.list().then((list) => {
          const token = new URLSearchParams(list.next_url).get('after');
          return Lob.checks.list({ after: token });
        }).then((res) => {
          expect(res.object).to.eql('list');
          expect(res.data).to.be.instanceof(Array);
          done();
        });
      });

    });

  });

  describe('delete', () => {

    it('deletes a check', (done) => {
      const checkId = fixtures.CHECK.id;

      mockLob()
        .post('/v1/checks')
        .reply(200, fixtures.CHECK);

      mockLob()
        .delete(`/v1/checks/${  checkId}`)
        .reply(200, fixtures.deleted(checkId));

      Lob.checks.create({
        description: 'TEST_CHECK',
        bank_account: 'bank_test123',
        to: 'adr_test123',
        from: 'adr_test123',
        amount: 100,
        memo: 'test check'
      }, (err, res) => {
        Lob.checks.delete(res.id, (err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
