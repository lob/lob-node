'use strict';

const ResourceBase = require('../lib/resources/resourceBase.js');

describe('resource base', () => {

  it('should expose response headers', (done) => {
    Lob.addresses.list((err, res) => {
      expect(res._response.headers['content-type']).to.exist;
      done();
    });
  });

  it('hides the raw response from stringification', (done) => {
    Lob.addresses.list((err, res) => {
      expect(JSON.parse(JSON.stringify(res))._response).to.not.exist;
      done();
    });
  });

  it('should expose the raw response on 400 level error', (done) => {
    Lob.addresses.retrieve('adr_bad_id', (err) => {
      expect(err._response).to.exist;
      done();
    });
  });

  it('should expose the raw response on 500 level errors', (done) => {
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

});
