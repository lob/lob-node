'use strict';

describe('countries', function () {

  describe('list', function () {

    it('returns a list of countries', function (done) {
      Lob.countries.list(function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        return done();
      });
    });

  });

});
