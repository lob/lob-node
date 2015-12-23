'use strict';

var chai    = require('chai');
var expect  = chai.expect;

var API_KEY = 'test_fd34e1b5ea86a597ec89f7f2e46940c874d';
var Lob     = require('../lib/index.js')(API_KEY);

describe('Routes', function () {
  describe('list', function () {
    it('should error with an invalid zip code', function (done) {
      Lob.routes.list({ zip_codes: [99999] }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have the correct defaults', function (done) {
      Lob.routes.list({ zip_codes: [48168, 94158] }, function (err, routes) {
        expect(routes).to.have.property('data');
        done();
      });
    });
  });

  describe('retrieve', function () {
    it('should error with an invalid zip code', function (done) {
      Lob.routes.retrieve(99999, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have the correct defaults', function (done) {
      Lob.routes.retrieve(48168, function (err, zip) {
        expect(zip).to.have.property('zip_code');
        expect(zip).to.have.property('routes');
        done();
      });
    });
  });
});
