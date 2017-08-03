'use strict';

var uuid = require('uuid/v1');

var CHECK = {
  description: 'TEST_CHECK',
  bank_account: 'bank_42426d3c5c2ffd2',
  to: 'adr_eed2a7b59384aea7',
  from: 'adr_eed2a7b59384aea7',
  amount: 100,
  memo: 'test check',
  check_bottom: '<h1>Test Check</h1>'
};

describe('checks', function () {

  describe('create', function () {

    it('creates a check', function (done) {
      Lob.checks.create(CHECK, function (err, res) {
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

    var idempotencyKey = uuid();

    it('creates a check with an idempotency key', function (done) {
      Lob.checks.create(CHECK, {
        'idempotency-key': idempotencyKey
      },
        function (err, res) {
          Lob.checks.create(CHECK, {
          'idempotency-key': idempotencyKey
        },
        function(err, resTwo) {
          expect(res.id).to.eql(resTwo.id);
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
    });

  });

  describe('retrieve', function () {

    it('retrieves a check', function (done) {
      Lob.checks.create(CHECK, function (err, res) {
        Lob.checks.retrieve(res.id, function (err, res) {
          expect(res).to.have.property('id');
          expect(res).to.have.property('description');
          expect(res).to.have.property('bank_account');
          expect(res).to.have.property('check_number');
          expect(res).to.have.property('memo');
          expect(res.object).to.eql('check');
          done();
        });
      });
    });

  });

  describe('list', function () {

    it('returns a list of checks', function (done) {
      Lob.checks.list(function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res.count).to.eql(10);
        return done();
      });
    });

    it('filters checks', function (done) {
      Lob.checks.list({ limit: 1 }, function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

  });

  describe('delete', function () {

    it('deletes a check', function (done) {
      Lob.checks.create(CHECK, function (err, res) {
        Lob.checks.delete(res.id, function (err2, res2) {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });
    
  });

});
