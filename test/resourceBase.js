'use strict';

const Agent = require('agentkeepalive');
const nock = require('nock');

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

const ResourceBase = require('../lib/resources/resourceBase.js');

describe('resource base', () => {

  it('should expose response headers', (done) => {
    mockLob()
      .get('/v1/addresses')
      .query(true)
      .reply(200, fixtures.list([fixtures.ADDRESS], 1), {
        'content-type': 'application/json; charset=utf-8'
      });

    Lob.addresses.list((err, res) => {
      expect(res._response.headers['content-type']).to.exist;
      done();
    });
  });

  it('hides the raw response from stringification', (done) => {
    mockLob()
      .get('/v1/addresses')
      .query(true)
      .reply(200, fixtures.list([fixtures.ADDRESS], 1));

    Lob.addresses.list((err, res) => {
      expect(JSON.parse(JSON.stringify(res))._response).to.not.exist;
      done();
    });
  });

  it('should expose the raw response on 400 level error', (done) => {
    mockLob()
      .get('/v1/addresses/adr_bad_id')
      .reply(404, fixtures.error('address not found', 404));

    Lob.addresses.retrieve('adr_bad_id', (err) => {
      expect(err._response).to.exist;
      done();
    });
  });

  it('should expose the raw response on 500 level errors', (done) => {
    // Create a mock server that returns 500
    nock('https://mock.lob.com')
      .post('/500')
      .reply(500, { error: { message: 'Internal Server Error', status_code: 500 } });

    const resource = new ResourceBase('', {
      options: {
        host: 'https://mock.lob.com/500',
        apiKey: API_KEY
      }
    });

    resource._transmit('POST', null, null, null, (err) => {
      expect(err._response).to.exist;
      return done();
    });
  });

  it('allows a custom HTTP agent', (done) => {
    // Create a mock server that returns 200
    nock('https://mock.lob.com')
      .post('/200')
      .reply(200, { success: true });

    const resource = new ResourceBase('', {
      options: {
        host: 'https://mock.lob.com/200',
        apiKey: API_KEY,
        agent: new Agent.HttpsAgent()
      }
    });

    resource._transmit('POST', null, null, null, (err) => {
      expect(err).to.not.exist;
      return done();
    });
  });

});
