'use strict';

describe('countries', function () {

  describe('list', function () {

    it('should have correct defaults', function (done) {
      Lob.countries.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        return done();
      });
    });

  });

});
