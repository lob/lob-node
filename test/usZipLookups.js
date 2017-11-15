'use strict';

describe('us_zip_lookups', () => {

  describe('lookup', () => {

    it('looks up a US Zipcode', (done) => {
      Lob.usZipLookups.lookup({
        zip_code: '94107'
      }, (err, res) => {
        expect(res.zip_code).to.eql('94107');
        expect(res.zip_code_type).to.eql('standard');
        return done();
      });
    });

  });

});
