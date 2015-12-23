'use strict';

var chai    = require('chai');
var expect  = chai.expect;

var API_KEY = 'test_fd34e1b5ea86a597ec89f7f2e46940c874d';
var Lob     = require('../lib/index.js')(API_KEY);

describe('Settings', function () {
  describe('list', function () {
    it('should have correct defaults', function (done) {
      Lob.settings.list({ type: 1 }, function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.object).to.eql('list');
        done();
      });
    });

    it('should have optional options', function (done) {
      Lob.settings.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.object).to.eql('list');
        done();
      });
    });
  });

  describe('retrieve', function () {
    it('should have correct defaults', function (done) {
      Lob.settings.retrieve('200', function (err, res) {
        expect(res.object).to.eql('setting');
        done();
      });
    });

    it('should fail with bad id', function (done) {
      Lob.settings.retrieve('9800', function (err) {
        expect(err.status_code).to.eql(404);
        done();
      });
    });
  });
});
