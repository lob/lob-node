'use strict';

describe('bulk_intl_verifications', () => {

  describe('verify', () => {

    it('verifies a list of addresses', (done) => {
      Lob.bulkIntlVerifications.verify({
        addresses: [
          {
            primary_line: 'deliverable',
            country: 'CA'
          }
        ]
      }, (err, res) => {
        const response = res.addresses[0]
        expect(response.primary_line).to.eql('370 WATER ST');
        expect(response.deliverability).to.eql('deliverable');
        return done();
      });
    });

  });

});
