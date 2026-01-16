'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

describe('us_zip_lookups', () => {

  describe('lookup', () => {

    it('looks up a US Zipcode', (done) => {
      mockLob()
        .post('/v1/us_zip_lookups')
        .reply(200, fixtures.US_ZIP_LOOKUP);

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
