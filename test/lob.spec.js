'use strict';

var testHelpers = require('./testHelpers');
var chai        = require('chai');
var Lob         = require('../lib/lob')(testHelpers.testApiKey, '2111-11-11');
var Errors      = require('../lib/errors');

var expect = chai.expect;

describe('Lob Module', function() {
  it('should set the default host, port and base path', function () {
    expect(Lob._settings.host).to.eql('https://api.lob.com');
    expect(Lob._settings.basePath).to.eql('/v1');
  });

  it('should set the user agent based on the package version', function () {
    expect(Lob._settings.userAgent).to.eql('Lob/v1 NodeBindings/3.0.0');
  });

  it('should set the key and version', function () {
    expect(Lob._settings.key).to.eql(testHelpers.testApiKey);
    expect(Lob._settings.version).to.eql('2111-11-11');
  });
});


describe('Integration', function() {
  it('should return errors properly with promises', function () {
    expect(Lob.addresses.retrieve('asdf')).to.be.rejectedWith(Errors.LobError);
  });

  it('should return errors properly with callbacks', function (done) {
    Lob.addresses.retrieve('asdf', function (err, address) {
      expect(err.name).to.eql('LobError');
      done();
    });
  });

  it('should work properly with promises', function () {
    expect(Lob.addresses.list()).to.be.fulfilled;
  });

  it('should work properly with callbacks', function (done) {
    Lob.addresses.list(function (err, addresses) {
      expect(addresses.object).to.eql('list');
      done();
    });
  });
});
