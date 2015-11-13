'use strict';

var chai    = require('chai');
var expect  = chai.expect;
var API_KEY = 'test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc';

describe('Main Lob Object', function () {
  it('should allow you to specify a version', function () {
    var Lob = require('../lib')(API_KEY, { apiVersion: 'api_version' });
    expect(Lob.options.headers['Lob-Version']).to.eql('api_version');
  });

  it('should allow the use of promises and callbacks', function (done) {
    var Lob = require('../lib')(API_KEY);
    Lob.settings.list()
    .then(function (body) {
      expect(body.data).to.be.a('Array');
      done();
    })
    .catch(function () {
      done();
    });
  });

  it('should allow options to override defaults (such as host)', function () {
    var options = { host: 'http://test' };
    var Lob = require('../lib')(API_KEY, options);

    expect(Lob.options.host).to.eql('http://test');
  });

  it('should allow you to only pass options as first arg', function () {
    var options = { apiKey: API_KEY, host: 'http://test' };
    var Lob     = require('../lib')(options);

    expect(Lob.options.apiKey).to.eql(API_KEY);
    expect(Lob.options.host).to.eql('http://test');
  });

  it('should propogate request errors', function (done) {
    var options = { baseURI: 'http://test' };
    var Lob     = require('../lib')(API_KEY, options);

    Lob.settings.list()
    .then(function () {
      done();
    })
    .catch(function (e) {
      expect(e.message).to.eql('getaddrinfo ENOTFOUND testsettings');
      done();
    });
  });
});
