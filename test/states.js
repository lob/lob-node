'use strict';

describe('states', function () {

  describe('list', function () {

    it('returns a list of states', function (done) {
      Lob.states.list(function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        return done();
      });
    });

  });

});
