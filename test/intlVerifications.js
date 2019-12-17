'use strict';

describe('intl_verifications', () => {

  describe('verify', () => {

    it('verifies an address', (done) => {
      Lob.intlVerifications.verify({
        primary_line: 'deliverable',
        country: 'CA'
      }, (err, res) => {
        expect(res.primary_line).to.eql('370 WATER ST');
        expect(res.deliverability).to.eql('deliverable');
        return done();
      });
    });

  });

});
