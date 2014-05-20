var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var Should;
Should = require('should');
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
        res.should.have.property('id');
        res.should.have.property('name');
        res.should.have.property('bank_account');
        res.should.have.property('bank_account');
        res.should.have.property('check_number');
        res.should.have.property('memo');
        res.memo.should.eql('test check');
        res.object.should.eql('check');
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
        res.should.have.property('id');
        res.should.have.property('name');
        res.should.have.property('bank_account');
        res.should.have.property('bank_account');
        res.should.have.property('check_number');
        res.should.have.property('memo');
        res.memo.should.eql('test check');
        res.object.should.eql('check');
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
          res.should.have.property('id');
          res.should.have.property('name');
          res.should.have.property('bank_account');
          res.should.have.property('bank_account');
          res.should.have.property('check_number');
          res.should.have.property('memo');
          res.memo.should.eql('test check');
          res.object.should.eql('check');
          return done();
        });
      });
    });
  });
  describe('list', function () {
    it('should have correct defaults', function (done) {
      Lob.checks.list(function (err, res) {
        res.should.have.property('object');
        res.should.have.property('data');
        res.data.should.be.instanceof(Array);
        res.data.length.should.eql(10);
        res.should.have.property('count');
        res.should.have.property('next_url');
        res.next_url.should.eql('https://api.lob.com/' +
        'v1/checks?count=10&offset=10');
        res.should.have.property('previous_url');
        res.object.should.eql('list');
        res.count.should.eql(10);
        return done();
      });
    });
    it('should override count', function (done) {
      Lob.checks.list({count: 5, offset: 0}, function (err, res) {
        res.should.have.property('object');
        res.should.have.property('data');
        res.data.should.be.instanceof(Array);
        res.data.length.should.eql(5);
        res.should.have.property('count');
        res.should.have.property('next_url');
        res.next_url.should.eql('https://api.lob.com/' +
        'v1/checks?count=5&offset=5');
        res.should.have.property('previous_url');
        res.object.should.eql('list');
        res.count.should.eql(5);
        done();
      });
    });
    it('should override count', function (done) {
      Lob.checks.list({offset: 0}, function (err, res) {
        res.should.have.property('object');
        res.should.have.property('data');
        res.data.should.be.instanceof(Array);
        res.data.length.should.eql(10);
        res.should.have.property('count');
        res.should.have.property('next_url');
        res.next_url.should.eql('https://api.lob.com/' +
        'v1/checks?count=10&offset=10');
        res.should.have.property('previous_url');
        res.object.should.eql('list');
        res.count.should.eql(10);
        done();
      });
    });
  });
});
/* jshint camelcase: true */
