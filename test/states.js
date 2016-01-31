'use strict';

describe('states', function () {

  describe('list', function () {

    it('should have correct defaults', function (done) {
      Lob.states.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        return done();
      });
    });

  });

});
