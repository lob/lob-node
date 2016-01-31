'use strict';

describe('bank accounts', function () {

  describe('create', function () {

    it('creates a bank account', function (done) {
      Lob.bankAccounts.create({
        routing_number: '122100024',
        account_number: '123456788',
        signatory: 'John Doe'
      }, function (err, res) {
        expect(res).to.have.property('id');
        expect(res).to.have.property('routing_number');
        expect(res.routing_number).to.eql('122100024');
        expect(res).to.have.property('account_number');
        expect(res.account_number).to.eql('123456788');
        expect(res.verified).to.eql(false);
        expect(res.object).to.eql('bank_account');
        return done();
      });
    });

    it('should error with bad routing number', function (done) {
      Lob.bankAccounts.create({
        routing_number: '11000000',
        account_number: '123456788',
        signatory: 'John Doe'
      }, function (err) {
        expect(err).to.exist;
        return done();
      });
    });

  });

  describe('retrieve', function () {

    it('should succeed on get', function (done) {
      var routingNumber = '122100024';
      var accountNumber = '123456788';

      Lob.bankAccounts.create({
        routing_number: routingNumber,
        account_number: accountNumber,
        signatory: 'John Doe'
      }, function (err, res) {
        var id = res.id;
        Lob.bankAccounts.retrieve(id,function (err, res) {
          expect(res).to.have.property('id');
          expect(res).to.have.property('routing_number');
          expect(res.routing_number).to.eql(routingNumber);
          expect(res).to.have.property('account_number');
          expect(res.account_number).to.eql(accountNumber);
          expect(res.verified).to.eql(false);
          expect(res.object).to.eql('bank_account');
          return done();
        });
      });
    });

    it('should error on bad bank_account', function (done) {
      Lob.bankAccounts.retrieve('38472', function (err) {
        expect(err).to.exist;
        return done();
      });
    });

  });

  describe('delete', function () {

    it('should succeed on delete', function (done) {
      var routingNumber = '122100024';
      var accountNumber = '123456788';

      Lob.bankAccounts.create({
        routing_number: routingNumber,
        account_number: accountNumber,
        signatory: 'John Doe'
      }, function (err, res) {
        var id = res.id;
        Lob.bankAccounts.delete(id, function (err, res) {
          expect(res.deleted).to.eql(true);
          return done();
        });
      });
    });

    it('should error on bad bank_account', function (done) {
      Lob.bankAccounts.delete('38472', function (err) {
        expect(err).to.exist;
        return done();
      });
    });
  });

  describe('list', function () {

    it('should have correct defaults', function (done) {
      Lob.bankAccounts.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
        'v1/bank_accounts?count=10&offset=10');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(10);
        return done();
      });
    });

    it('should have correct defaults', function (done) {
      Lob.bankAccounts.list({ offset: 0 }, function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
          'v1/bank_accounts?count=10&offset=10');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(10);
        return done();
      });
    });

    it('should get exact count', function (done) {
      Lob.bankAccounts.list({ count: 5, offset: 0 }, function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(5);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
        'v1/bank_accounts?count=5&offset=5');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(5);
        return done();
      });
    });

    it('should get error on high count', function (done) {
      Lob.bankAccounts.list({ count: 56565, offset: 0 }, function (err) {
        expect(err).to.exist;
        return done();
      });
    });

  });

  describe('verify', function () {

    it('should succeed on verify with amounts', function (done) {
      var routingNumber = '122100024';
      var accountNumber = '123456788';
      var amounts = [23, 34];

      Lob.bankAccounts.create({
        routing_number: routingNumber,
        account_number: accountNumber,
        signatory: 'John Doe'
      }, function (err, res) {
        var id = res.id;
        Lob.bankAccounts.verify(id, { amounts: amounts }, function (err, res) {
          expect(res).to.have.property('id');
          expect(res).to.have.property('routing_number');
          expect(res.routing_number).to.eql(routingNumber);
          expect(res).to.have.property('account_number');
          expect(res.account_number).to.eql(accountNumber);
          expect(res.verified).to.eql(true);
          expect(res.object).to.eql('bank_account');
          return done();
        });
      });
    });

    it('should error on bad bank_account', function (done) {
      Lob.bankAccounts.verify('38472', { amounts: [23, 34] }, function (err) {
        expect(err).to.exist;
        return done();
      });
    });

  });

});
