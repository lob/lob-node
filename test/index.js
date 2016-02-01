'use strict';

describe('Lob', function () {

  it('allows specifying a version', function () {
    var Lob = require('../lib')(API_KEY, { apiVersion: 'api_version' });
    expect(Lob.options.headers['Lob-Version']).to.eql('api_version');
  });

  it('allows the use of promises and callbacks', function (done) {
    Lob.countries.list()
    .then(function (body) {
      expect(body.data).to.be.instanceof(Array);
      done();
    });
  });

  it('allows options to override defaults (such as host)', function () {
    var options = { host: 'http://test' };
    var Lob = require('../lib')(API_KEY, options);

    expect(Lob.options.host).to.eql('http://test');
  });

  it('allows options object as first argument', function () {
    var options = { apiKey: API_KEY, host: 'http://test' };
    var Lob     = require('../lib')(options);

    expect(Lob.options.apiKey).to.eql(API_KEY);
    expect(Lob.options.host).to.eql('http://test');
  });

  it('should propogate request errors', function (done) {
    var options = { host: 'http://test' };
    var Lob     = require('../lib')(API_KEY, options);

    Lob.countries.list()
    .catch(function (err) {
      expect(err.message).to.match(/getaddrinfo ENOTFOUND/);
      done();
    });
  });

});
