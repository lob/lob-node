'use strict';

describe('Lob', () => {

  it('allows specifying a version', () => {
    const Lob = require('../lib')(API_KEY, { apiVersion: 'api_version' });
    expect(Lob.options.headers['Lob-Version']).to.eql('api_version');
  });

  it('allows the use of promises and callbacks', (done) => {
    const Lob = require('../lib')(API_KEY);

    Lob.addresses.list()
    .then((result) => {
      expect(result.data).to.be.instanceof(Array);
      done();
    });
  });

  it('allows options to override defaults (such as host)', () => {
    const options = { host: 'http://test' };
    const Lob = require('../lib')(API_KEY, options);

    expect(Lob.options.host).to.eql('http://test');
  });

  it('allows options object as first argument', () => {
    const options = { apiKey: API_KEY, host: 'http://test' };
    const Lob = require('../lib')(options);

    expect(Lob.options.apiKey).to.eql(API_KEY);
    expect(Lob.options.host).to.eql('http://test');
  });

  it('should propagate request errors', (done) => {
    const options = { host: 'http://test' };
    const Lob = require('../lib')(API_KEY, options);

    Lob.addresses.list().then((res) => {
      done();
    })
    .catch((err) => {
      expect(err.message).to.match(/getaddrinfo (ENOTFOUND|EAI_AGAIN)/);
      done();
    });
  });

});
