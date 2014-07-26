var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var chai         = require('chai');
var expect       = chai.expect;

/* jshint camelcase: false */
/*jshint expr: true*/
describe('Bank Accounts', function () {
  describe('create', function () {
    it('should succeed with inline addresses', function (done) {
      Lob.bankAccounts.create({
        routing_number: '123456789',
        account_number: '123456788',
        bank_address: {
          name: 'Chase',
          address_line1: '123 Test Street',
          address_line2: 'Unit 199',
          address_city: 'Bangalore',
          address_state: 'KA',
          address_zip: '560039',
          address_country: 'IN',
        },
        account_address: {
          name: 'Lob.com',
          address_line1: '123 Test Street',
          address_line2: 'Unit 199',
          address_city: 'Bangalore',
          address_state: 'KA',
          address_zip: '560039',
          address_country: 'IN',
        }
      }, function (err, res) {
        expect(res).to.have.property('id');
        expect(res).to.have.property('bank_code');
        expect(res).to.have.property('routing_number');
        expect(res).to.have.property('bank_address');
        expect(res).to.have.property('account_address');
        expect(res.routing_number).to.eql('123456789');
        expect(res).to.have.property('account_number');
        expect(res.account_number).to.eql('123456788');
        expect(res.object).to.eql('bank_account');
        return done();
      });
    });

    it('should succeed with address ids', function (done) {
      var routingNumber = '123456789';
      var accountNumber = '123456788';
      var bankAddressId =  'adr_a11a87b8240b1540';
      var accountAddressId = 'adr_a11a87b8240b1540';

      Lob.bankAccounts.create({
        routing_number: routingNumber,
        account_number: accountNumber,
        bank_address: bankAddressId,
        account_address: accountAddressId
      }, function (err, res) {
        expect(res).to.have.property('id');
        expect(res).to.have.property('bank_code');
        expect(res).to.have.property('routing_number');
        expect(res).to.have.property('bank_address');
        expect(res).to.have.property('account_address');
        expect(res.routing_number).to.eql(routingNumber);
        expect(res).to.have.property('account_number');
        expect(res.account_number).to.eql(accountNumber);
        expect(res.object).to.eql('bank_account');
        return done();
      });
    });
    it('should error with bad address', function (done) {
      var routingNumber = '123456789';
      var accountNumber = '123456788';
      var bankAddressId =  'adr_bad';
      var accountAddressId = 'adr_a11a87b8240b1540';

      Lob.bankAccounts.create({
        routing_number: routingNumber,
        account_number: accountNumber,
        bank_address: bankAddressId,
        account_address: accountAddressId
      }, function (err) {
        expect(err).to.exist;
        return done();
      });
    });
  });
  describe('get', function () {
    it('should succeed on get', function (done) {
      var routingNumber = '123456789';
      var accountNumber = '123456788';
      var bankAddressId =  'adr_a11a87b8240b1540';
      var accountAddressId = 'adr_a11a87b8240b1540';

      Lob.bankAccounts.create({
        routing_number: routingNumber,
        account_number: accountNumber,
        bank_address: bankAddressId,
        account_address: accountAddressId
      }, function (err, res) {
        var id = res.id;
        Lob.bankAccounts.retrieve(id,function (err, res) {
          expect(res).to.have.property('id');
          expect(res).to.have.property('bank_code');
          expect(res).to.have.property('routing_number');
          expect(res).to.have.property('bank_address');
          expect(res).to.have.property('account_address');
          expect(res.routing_number).to.eql('123456789');
          expect(res).to.have.property('account_number');
          expect(res.account_number).to.eql('123456788');
          expect(res.object).to.eql('bank_account');
          return done();
        });
      });
    });
    it('should error on bad bank_account', function (done) {
      Lob.bankAccounts.retrieve('38472', function (err) {
        expect(err[0]).to.exist;
        return done();
      });
    });
  });
  describe('delete', function () {
    it('should succeed on delete', function (done) {
      var routingNumber = '123456789';
      var accountNumber = '123456788';
      var bankAddressId =  'adr_a11a87b8240b1540';
      var accountAddressId = 'adr_a11a87b8240b1540';

      Lob.bankAccounts.create({
        routing_number: routingNumber,
        account_number: accountNumber,
        bank_address: bankAddressId,
        account_address: accountAddressId
      }, function (err, res) {
        var id = res.id;
        Lob.bankAccounts.delete(id,function (err, res) {
          expect(res).to.exist;
          return done();
        });
      });
    });
    it('should error on bad bank_account', function (done) {
      Lob.bankAccounts.delete('38472', function (err) {
        expect(err[0]).to.exist;
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
      Lob.bankAccounts.list({offset: 0}, function (err, res) {
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
      Lob.bankAccounts.list({count: 5, offset: 0}, function (err, res) {
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
      Lob.bankAccounts.list({count: 56565, offset: 0}, function (err) {
        expect(err).to.exist;
        return done();
      });
    });
  });
});
/*jshint expr: false*/
/* jshint camelcase: true */
