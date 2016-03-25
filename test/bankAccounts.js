'use strict';

var BANK_ACCOUNT = {
  routing_number: '122100024',
  account_number: '123456788',
  account_type: 'company',
  signatory: 'John Doe'
};

describe('bank accounts', function () {

  describe('create', function () {

    it('creates a bank account', function (done) {
      Lob.bankAccounts.create(BANK_ACCOUNT, function (err, res) {
        expect(res).to.have.property('id');
        expect(res.routing_number).to.eql(BANK_ACCOUNT.routing_number);
        expect(res.account_number).to.eql(BANK_ACCOUNT.account_number);
        expect(res.verified).to.eql(false);
        expect(res.object).to.eql('bank_account');
        return done();
      });
    });

  });

  describe('retrieve', function () {

    it('retrieves a bank account', function (done) {
      Lob.bankAccounts.create(BANK_ACCOUNT, function (err, res) {
        Lob.bankAccounts.retrieve(res.id, function (err, res) {
          expect(res).to.have.property('id');
          expect(res.routing_number).to.eql(BANK_ACCOUNT.routing_number);
          expect(res.account_number).to.eql(BANK_ACCOUNT.account_number);
          expect(res.verified).to.eql(false);
          expect(res.object).to.eql('bank_account');
          return done();
        });
      });
    });

  });

  describe('delete', function () {

    it('deletes a bank account', function (done) {
      Lob.bankAccounts.create(BANK_ACCOUNT, function (err, res) {
        Lob.bankAccounts.delete(res.id, function (err, res) {
          expect(res.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

  describe('list', function () {

    it('returns a list of bank accounts', function (done) {
      Lob.bankAccounts.list(function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res.count).to.eql(10);
        return done();
      });
    });

    it('filters bank accounts', function (done) {
      Lob.bankAccounts.list({ limit: 1 }, function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        return done();
      });
    });

  });

  describe('verify', function () {

    it('verifies a bank account', function (done) {
      var amounts = [23, 34];

      Lob.bankAccounts.create(BANK_ACCOUNT, function (err, res) {
        Lob.bankAccounts.verify(res.id, { amounts: amounts }, function (err, res) {
          expect(res).to.have.property('id');
          expect(res.routing_number).to.eql(BANK_ACCOUNT.routing_number);
          expect(res.account_number).to.eql(BANK_ACCOUNT.account_number);
          expect(res.verified).to.eql(true);
          expect(res.object).to.eql('bank_account');
          return done();
        });
      });
    });

  });

});
