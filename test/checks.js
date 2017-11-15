'use strict';

const uuid = require('uuid/v1');

const CHECK = {
  description: 'TEST_CHECK',
  bank_account: 'bank_42426d3c5c2ffd2',
  to: 'adr_eed2a7b59384aea7',
  from: 'adr_eed2a7b59384aea7',
  amount: 100,
  memo: 'test check',
  check_bottom: '<h1>Test Check</h1>'
};

describe('checks', () => {

  describe('create', () => {

    it('creates a check', (done) => {
      Lob.checks.create(CHECK, (err, res) => {
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

    const idempotencyKey = uuid();

    it('creates a check with an idempotency key', (done) => {
      Lob.checks.create(CHECK, {
        'idempotency-key': idempotencyKey
      },
        (err, res) => {
          Lob.checks.create(CHECK, {
          'idempotency-key': idempotencyKey
        },
        (err, resTwo) => {
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

  describe('retrieve', () => {

    it('retrieves a check', (done) => {
      Lob.checks.create(CHECK, (err, res) => {
        Lob.checks.retrieve(res.id, (err, res) => {
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

  describe('list', () => {

    it('returns a list of checks', (done) => {
      Lob.checks.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res.count).to.eql(10);
        return done();
      });
    });

    it('filters checks', (done) => {
      Lob.checks.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

  });

  describe('delete', () => {

    it('deletes a check', (done) => {
      Lob.checks.create(CHECK, (err, res) => {
        Lob.checks.delete(res.id, (err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
