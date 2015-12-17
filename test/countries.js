'use strict';

var chai    = require('chai');
var expect  = chai.expect;

var API_KEY = 'test_fd34e1b5ea86a597ec89f7f2e46940c874d';
var Lob     = require('../lib/index.js')(API_KEY);

describe('Countries', function () {
  describe('list', function () {
    it('should have correct defaults', function (done) {
      Lob.countries.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        return done();
      });
    });
  });
});
