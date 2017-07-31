'use strict';

describe('us_zip_lookups', function () {

  describe('lookup', function () {

    it('looks up a US Zipcode', function (done) {
      Lob.usZipLookups.lookup({
        zip_code: '94107'
      }, function (err, res) {
        expect(res.zip_code).to.eql('94107');
        expect(res.zip_code_type).to.eql('standard');
        return done();
      });
    });

  });

});
