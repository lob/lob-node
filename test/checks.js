var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var chai         = require('chai');
var expect       = chai.expect;

/* jshint camelcase: false */
describe('Checks', function () {
  describe('create', function () {
    it('should succeed with default parameters', function (done) {
      Lob.checks.create({
        name: 'TEST_CHECK',
        bank_account: 'bank_e13902b6bdfff24',
        to: 'adr_8613108bcfa00806',
        amount: 100,
        memo: 'test check'
      }, function (err, res) {
        expect(res).to.have.property('id');
        expect(res).to.have.property('name');
        expect(res).to.have.property('bank_account');
        expect(res).to.have.property('bank_account');
        expect(res).to.have.property('check_number');
        expect(res).to.have.property('memo');
        expect(res.memo).to.eql('test check');
        expect(res.object).to.eql('check');
        return done();
      });
    });

    it('should succeed with inline to address id', function (done) {
      Lob.checks.create({
        name: 'TEST_CHECK',
        bank_account: 'bank_e13902b6bdfff24',
        to: {
          name: 'Lob.com',
          address_line1: '123 Test Street',
          address_line2: 'Unit 199',
          address_city: 'San Francisco',
          address_state: 'CA',
          address_zip: '94158',
          address_country: 'US',
        },
        amount: 100,
        memo: 'test check'
      }, function (err, res) {
        expect(res).to.have.property('id');
        expect(res).to.have.property('name');
        expect(res).to.have.property('bank_account');
        expect(res).to.have.property('bank_account');
        expect(res).to.have.property('check_number');
        expect(res).to.have.property('memo');
        expect(res.memo).to.eql('test check');
        expect(res.object).to.eql('check');
        return done();
      });
    });
  });
  describe('get', function () {
    it('should succeed on get', function (done) {
      Lob.checks.create({
        name: 'TEST_CHECK',
        bank_account: 'bank_e13902b6bdfff24',
        to: {
          name: 'Lob.com',
          address_line1: '123 Test Street',
          address_line2: 'Unit 199',
          address_city: 'San Francisco',
          address_state: 'CA',
          address_zip: '94158',
          address_country: 'US',
        },
        amount: 100,
        memo: 'test check'
      }, function (err, res) {
        var id = res.id;
        Lob.checks.retrieve(id,function (err, res) {
          expect(res).to.have.property('id');
          expect(res).to.have.property('name');
          expect(res).to.have.property('bank_account');
          expect(res).to.have.property('bank_account');
          expect(res).to.have.property('check_number');
          expect(res).to.have.property('memo');
          expect(res.memo).to.eql('test check');
          expect(res.object).to.eql('check');
          return done();
        });
      });
    });
  });
  describe('list', function () {
    it('should have correct defaults', function (done) {
      Lob.checks.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
        'v1/checks?count=10&offset=10');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(10);
        return done();
      });
    });
    it('should override count', function (done) {
      Lob.checks.list({count: 5, offset: 0}, function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(5);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
        'v1/checks?count=5&offset=5');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(5);
        done();
      });
    });
    it('should override count', function (done) {
      Lob.checks.list({offset: 0}, function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
        'v1/checks?count=10&offset=10');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(10);
        done();
      });
    });
  });
});
/* jshint camelcase: true */
