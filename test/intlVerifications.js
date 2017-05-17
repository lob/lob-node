'use strict';

describe('intl_verifications', function () {

  describe('verify', function () {

    it('verifies an address', function (done) {
      Lob.intlVerifications.verify({
        address_line1: '370 Water St',
        address_city: 'Summerside',
        address_state: 'Prince Edward Island',
        address_zip: 'C1N 1C4',
        address_country: 'CA'
      }, function (err) {
        expect(err.status_code).to.eql(403);
        return done();
      });
    });

  });

});
