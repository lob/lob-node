var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var Should;
Should = require('should');
/* jshint camelcase: false */
describe('Bank Accounts', function() {
  var id;
  describe('create', function() {
    it('should succeed with inline addresses', function(done) {
      Lob.bankAccounts.create({
        routing_number: '123456789',
        account_number: '123456788',
        bank_address: {
          name:'Chase',
          address_line1: '123 Test Street',
          address_line2: 'Unit 199',
          address_city: 'Bangalore',
          address_state: 'KA',
          address_zip: '560039',
          address_country: 'IN',
        },
        account_address:{
          name:'Lob.com',
          address_line1: '123 Test Street',
          address_line2: 'Unit 199',
          address_city: 'Bangalore',
          address_state: 'KA',
          address_zip: '560039',
          address_country: 'IN',
        }
      }, function(err, res) {
        res.should.have.property('id');
        res.should.have.property('bank_code');
        res.should.have.property('routing_number');
        res.should.have.property('bank_address');
        res.should.have.property('account_address');
        res.routing_number.should.eql('123456789');
        res.should.have.property('account_number');
        res.account_number.should.eql('123456788');
        res.object.should.eql('bank_account');
        return done();
      });
    });

    it('should succeed with address ids', function(done) {

      var routingNumber = '123456789';
      var accountNumber = '123456788';
      var bankAddressId =  'adr_a11a87b8240b1540';
      var accountAddressId = 'adr_a11a87b8240b1540';

      Lob.bankAccounts.create({
        routing_number: routingNumber,
        account_number: accountNumber,
        bank_address: bankAddressId,
        account_address:accountAddressId
      }, function(err, res) {
        id = res.id;
        res.should.have.property('id');
        res.should.have.property('bank_code');
        res.should.have.property('routing_number');
        res.should.have.property('bank_address');
        res.should.have.property('account_address');
        res.routing_number.should.eql(routingNumber);
        res.should.have.property('account_number');
        res.account_number.should.eql(accountNumber);
        res.object.should.eql('bank_account');
        return done();
      });
    });
  });
  describe('get', function() {
    it('should succeed on get', function(done) {
      Lob.bankAccounts.get(id,function(err, res) {
        res.should.have.property('id');
        res.should.have.property('bank_code');
        res.should.have.property('routing_number');
        res.should.have.property('bank_address');
        res.should.have.property('account_address');
        res.routing_number.should.eql('123456789');
        res.should.have.property('account_number');
        res.account_number.should.eql('123456788');
        res.object.should.eql('bank_account');
        return done();
      });
    });
  });
  describe('list', function() {
    it('should have correct deafults', function(done) {
      Lob.bankAccounts.list(function(err, res) {
        res.should.have.property('object');
        res.should.have.property('data');
        res.data.should.be.instanceof(Array);
        res.data.length.should.eql(10);
        res.should.have.property('count');
        res.should.have.property('next_url');
        res.next_url.should.eql('https://api.lob.com/' +
        'v1/bank_accounts?count=10&offset=10');
        res.should.have.property('previous_url');
        res.object.should.eql('list');
        res.count.should.eql(10);
        return done();
      });
    });
  });
});
/* jshint camelcase: true */
