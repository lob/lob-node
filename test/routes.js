'use strict';

describe('routes', function () {

  describe('list', function () {

    it('returns a list of routes', function (done) {
      Lob.routes.list({ zip_codes: [48168, 94158] }, function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        done();
      });
    });

  });

  describe('retrieve', function () {

    it('retrieves a route', function (done) {
      Lob.routes.retrieve(48168, function (err, zip) {
        expect(zip).to.have.property('zip_code');
        expect(zip).to.have.property('routes');
        done();
      });
    });

  });

});
