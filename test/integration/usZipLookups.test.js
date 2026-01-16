'use strict';

describe('Integration: US Zip Lookups (Live Key Required)', function () {

  this.timeout(INTEGRATION_TIMEOUT);

  before(function () {
    if (!HAS_LIVE_KEY) {
      this.skip();
    }
  });

  describe('lookup', () => {

    it('looks up a valid zip code', (done) => {
      LiveLob.usZipLookups.lookup({
        zip_code: '94107'
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res.zip_code).to.eql('94107');
        expect(res.zip_code_type).to.exist;
        expect(res.cities).to.be.instanceof(Array);
        expect(res.cities.length).to.be.greaterThan(0);
        done();
      });
    });

  });

});
