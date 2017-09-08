'use strict';

describe('us_verifications', function () {

  describe('verify', function () {

    it('verifies an address', function (done) {
      Lob.usVerifications.verify({
        primary_line: '185 Berry St Ste 6600',
        city: 'San Francisco',
        state: 'CA',
        zip_code: '94107'
      }, function (err, res) {
        expect(res.primary_line).to.eql('185 BERRY ST STE 6600');
        expect(res.deliverability).to.eql('deliverable');
        return done();
      });
    });

  });

});
