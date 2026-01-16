'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

describe('bulk_intl_verifications', () => {

  describe('verify', () => {

    it('verifies a list of addresses', (done) => {
      const bulkResponse = {
        addresses: [
          fixtures.clone(fixtures.BULK_INTL_VERIFICATION, {
            primary_line: '370 WATER ST',
            deliverability: 'deliverable'
          })
        ]
      };

      mockLob()
        .post('/v1/bulk/intl_verifications')
        .reply(200, bulkResponse);

      Lob.bulkIntlVerifications.verify({
        addresses: [
          {
            primary_line: 'deliverable',
            country: 'CA'
          }
        ]
      }, (err, res) => {
        const response = res.addresses[0];
        expect(response.primary_line).to.eql('370 WATER ST');
        expect(response.deliverability).to.eql('deliverable');
        return done();
      });
    });

  });

});
