'use strict';

describe('routes', () => {

  describe('list', () => {

    it('returns a list of routes', (done) => {
      Lob.routes.list({ zip_codes: [48168, 94158] }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        done();
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves a route', (done) => {
      Lob.routes.retrieve(48168, (err, zip) => {
        expect(zip).to.have.property('zip_code');
        expect(zip).to.have.property('routes');
        done();
      });
    });

  });

});
