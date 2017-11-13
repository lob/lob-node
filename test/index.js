'use strict';

describe('Lob', () => {

  it('allows specifying a version', () => {
    var Lob = require('../lib')(API_KEY, { apiVersion: 'api_version' });
    expect(Lob.options.headers['Lob-Version']).to.eql('api_version');
  });

  it('allows the use of promises and callbacks', (done) => {
    var Lob = require('../lib')(API_KEY);

    Lob.addresses.list()
    .then((result) => {
      expect(result.data).to.be.instanceof(Array);
      done();
    });
  });

  it('allows options to override defaults (such as host)', () => {
    var options = { host: 'http://test' };
    var Lob = require('../lib')(API_KEY, options);

    expect(Lob.options.host).to.eql('http://test');
  });

  it('allows options object as first argument', () => {
    var options = { apiKey: API_KEY, host: 'http://test' };
    var Lob     = require('../lib')(options);

    expect(Lob.options.apiKey).to.eql(API_KEY);
    expect(Lob.options.host).to.eql('http://test');
  });

  it('should propogate request errors', (done) => {
    var options = { host: 'http://test' };
    var Lob     = require('../lib')(API_KEY, options);

    Lob.addresses.list()
    .catch((err) => {
      expect(err.message).to.match(/getaddrinfo ENOTFOUND/);
      done();
    });
  });

});
