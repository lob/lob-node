'use strict';

describe('settings', function () {

  describe('list', function () {

    it('returns a list of settings', function (done) {
      Lob.settings.list(function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        done();
      });
    });

    it('filters settings', function (done) {
      Lob.settings.list({ type: 1 }, function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        done();
      });
    });

  });

  describe('retrieve', function () {

    it('retrieves a setting', function (done) {
      Lob.settings.retrieve('200', function (err, res) {
        expect(res.object).to.eql('setting');
        done();
      });
    });

  });

});
