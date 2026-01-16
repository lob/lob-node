'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

const BANK_ACCOUNT_INPUT = {
  routing_number: '122100024',
  account_number: '123456788',
  account_type: 'company',
  signatory: 'John Doe'
};

describe('bank accounts', () => {

  describe('create', () => {

    it('creates a bank account', (done) => {
      mockLob()
        .post('/v1/bank_accounts')
        .reply(200, fixtures.BANK_ACCOUNT);

      Lob.bankAccounts.create(BANK_ACCOUNT_INPUT, (err, res) => {
        expect(res).to.have.property('id');
        expect(res.routing_number).to.eql(BANK_ACCOUNT_INPUT.routing_number);
        expect(res.account_number).to.eql(BANK_ACCOUNT_INPUT.account_number);
        expect(res.verified).to.eql(false);
        expect(res.object).to.eql('bank_account');
        return done();
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves a bank account', (done) => {
      const bankAccountId = fixtures.BANK_ACCOUNT.id;

      mockLob()
        .post('/v1/bank_accounts')
        .reply(200, fixtures.BANK_ACCOUNT);

      mockLob()
        .get(`/v1/bank_accounts/${  bankAccountId}`)
        .reply(200, fixtures.BANK_ACCOUNT);

      Lob.bankAccounts.create(BANK_ACCOUNT_INPUT, (_err, res) => {
        Lob.bankAccounts.retrieve(res.id, (_err2, res2) => {
          expect(res2).to.have.property('id');
          expect(res2.routing_number).to.eql(BANK_ACCOUNT_INPUT.routing_number);
          expect(res2.account_number).to.eql(BANK_ACCOUNT_INPUT.account_number);
          expect(res2.verified).to.eql(false);
          expect(res2.object).to.eql('bank_account');
          return done();
        });
      });
    });

  });

  describe('delete', () => {

    it('deletes a bank account', (done) => {
      const bankAccountId = fixtures.BANK_ACCOUNT.id;

      mockLob()
        .post('/v1/bank_accounts')
        .reply(200, fixtures.BANK_ACCOUNT);

      mockLob()
        .delete(`/v1/bank_accounts/${  bankAccountId}`)
        .reply(200, fixtures.deleted(bankAccountId));

      Lob.bankAccounts.create(BANK_ACCOUNT_INPUT, (_err, res) => {
        Lob.bankAccounts.delete(res.id, (_err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

  describe('list', () => {

    it('returns a list of bank accounts', (done) => {
      mockLob()
        .get('/v1/bank_accounts')
        .query(true)
        .reply(200, fixtures.list([fixtures.BANK_ACCOUNT], 1));

      Lob.bankAccounts.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        return done();
      });
    });

    it('filters bank accounts', (done) => {
      mockLob()
        .get('/v1/bank_accounts')
        .query({ limit: 1 })
        .reply(200, fixtures.list([fixtures.BANK_ACCOUNT], 1));

      Lob.bankAccounts.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        return done();
      });
    });

  });

  describe('verify', () => {

    it('verifies a bank account', (done) => {
      const bankAccountId = fixtures.BANK_ACCOUNT.id;
      const amounts = [23, 34];
      const verifiedBankAccount = fixtures.clone(fixtures.BANK_ACCOUNT, { verified: true });

      mockLob()
        .post('/v1/bank_accounts')
        .reply(200, fixtures.BANK_ACCOUNT);

      mockLob()
        .post(`/v1/bank_accounts/${  bankAccountId  }/verify`)
        .reply(200, verifiedBankAccount);

      Lob.bankAccounts.create(BANK_ACCOUNT_INPUT, (_err, res) => {
        Lob.bankAccounts.verify(res.id, { amounts }, (_err2, res2) => {
          expect(res2).to.have.property('id');
          expect(res2.routing_number).to.eql(BANK_ACCOUNT_INPUT.routing_number);
          expect(res2.account_number).to.eql(BANK_ACCOUNT_INPUT.account_number);
          expect(res2.verified).to.eql(true);
          expect(res2.object).to.eql('bank_account');
          return done();
        });
      });
    });

  });

});
