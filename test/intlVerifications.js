'use strict';

describe('intl_verifications', function () {

  describe('verify', function () {

    it('verifies an address', function (done) {
      Lob.intlVerifications.verify({
        primary_line: '370 Water St',
        city: 'Summerside',
        state: 'Prince Edward Island',
        postal_code: 'C1N 1C4',
        country: 'CA'
      }, function (err) {
        expect(err.status_code).to.eql(403);
        return done();
      });
    });

  });

});
