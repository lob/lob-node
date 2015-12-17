'use strict';

var chai    = require('chai');
var expect  = chai.expect;

var API_KEY = 'test_fd34e1b5ea86a597ec89f7f2e46940c874d';
var Lob     = require('../lib/index.js')(API_KEY);

describe('Checks', function () {

  describe('create', function () {
    it('should succeed with default parameters', function (done) {
      Lob.checks.create({
        description: 'TEST_CHECK',
        bank_account: 'bank_e13902b6bdfff24',
        to: 'adr_8613108bcfa00806',
        from: 'adr_8613108bcfa00806',
        amount: 100,
        memo: 'test check',
        check_bottom: '<h1>Test Check</h1>'
      }, function (err, res) {
        expect(res).to.have.property('id');
        expect(res).to.have.property('description');
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
        description: 'TEST_CHECK',
        bank_account: 'bank_e13902b6bdfff24',
        to: {
          name: 'Lob.com',
          address_line1: '123 Test Street',
          address_line2: 'Unit 199',
          address_city: 'San Francisco',
          address_state: 'CA',
          address_zip: '94158',
          address_country: 'US'
        },
        from: {
          name: 'Lob.com',
          address_line1: '123 Test Street',
          address_line2: 'Unit 199',
          address_city: 'San Francisco',
          address_state: 'CA',
          address_zip: '94158',
          address_country: 'US'
        },
        amount: 100,
        memo: 'test check'
      }, function (err, res) {
        expect(res).to.have.property('id');
        expect(res).to.have.property('description');
        expect(res).to.have.property('bank_account');
        expect(res).to.have.property('check_number');
        expect(res).to.have.property('memo');
        expect(res.memo).to.eql('test check');
        expect(res.object).to.eql('check');
        return done();
      });
    });

    it('should fail when no address provided', function (done) {
      Lob.checks.create({
        description: 'TEST_CHECK',
        bank_account: 'bank_e13902b6bdfff24',
        amount: 100,
        memo: 'test check'
      }, function (err) {
        expect(err.message).to.eql('to is required');
        expect(err.status_code).to.eql(422);
        return done();
      });
    });
  });

  describe('retrieve', function () {
    it('should succeed on get', function (done) {
      var id = 'chk_9cd5802b918faf86';
      Lob.checks.retrieve(id, function (err, res) {
        expect(res).to.have.property('id');
        expect(res).to.have.property('description');
        expect(res).to.have.property('bank_account');
        expect(res).to.have.property('check_number');
        expect(res).to.have.property('memo');
        expect(res.memo).to.eql('test check');
        expect(res.object).to.eql('check');
        done();
      });
    });

    it('should fail with invalid id', function (done) {
      Lob.checks.retrieve('BADCHECKID', function (err) {
        expect(err).to.not.eql(null);
        done();
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
      Lob.checks.list({ count: 5, offset: 0 }, function (err, res) {
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
      Lob.checks.list({ offset: 0 }, function (err, res) {
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

    it('should error with count>100', function (done) {
      Lob.checks.list({ count: 9001 }, function (err) {
        expect(err).to.not.eql(null);
        done();
      });
    });
  });
});
