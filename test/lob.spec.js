'use strict';

var testHelpers = require('./testHelpers');
var chai        = require('chai');
var lob         = require('../lib/lob')(testHelpers.testApiKey, '2111-11-11');

var expect = chai.expect;

describe('Lob Module', function() {
  it('should set the default host, port and base path', function () {
    expect(lob._settings.host).to.eql('api.lob.com');
    expect(lob._settings.port).to.eql('443');
    expect(lob._settings.basePath).to.eql('/v1/');
  });

  it('should set the user agent based on the package version', function () {
    expect(lob._settings.userAgent).to.eql('LobNode/3.0.0');
  });

  it('should set the key and version', function () {
    expect(lob._settings.key).to.eql(testHelpers.testApiKey);
    expect(lob._settings.version).to.eql('2111-11-11');
  });
});
