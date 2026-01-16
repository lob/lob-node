'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

describe('Lob', () => {

  it('allows specifying a version', () => {
    const LobClient = require('../lib')(API_KEY, { apiVersion: 'api_version' });
    expect(LobClient.options.headers['Lob-Version']).to.eql('api_version');
  });

  it('allows the use of promises and callbacks', (done) => {
    mockLob()
      .get('/v1/addresses')
      .query(true)
      .reply(200, fixtures.list([fixtures.ADDRESS], 1));

    const LobClient = require('../lib')(API_KEY);

    LobClient.addresses.list()
      .then((result) => {
        expect(result.data).to.be.instanceof(Array);
        done();
      });
  });

  it('allows options to override defaults (such as host)', () => {
    const options = { host: 'http://test' };
    const LobClient = require('../lib')(API_KEY, options);

    expect(LobClient.options.host).to.eql('http://test');
  });

  it('allows options object as first argument', () => {
    const options = { apiKey: API_KEY, host: 'http://test' };
    const LobClient = require('../lib')(options);

    expect(LobClient.options.apiKey).to.eql(API_KEY);
    expect(LobClient.options.host).to.eql('http://test');
  });

});
