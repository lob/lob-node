'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

describe('bulk_us_verifications', () => {

  describe('verify', () => {

    it('verifies an address', (done) => {
      const bulkResponse = {
        addresses: [
          fixtures.clone(fixtures.BULK_US_VERIFICATION, {
            primary_line: '1 TELEGRAPH HILL BLVD',
            deliverability: 'deliverable'
          })
        ]
      };

      mockLob()
        .post('/v1/bulk/us_verifications')
        .reply(200, bulkResponse);

      Lob.bulkUSVerifications.verify({
        addresses: [{
          primary_line: 'deliverable',
          city: 'San Francisco',
          state: 'CA',
          zip_code: '94107'
        }]
      }, (err, res) => {
        const response = res.addresses[0];
        expect(response.primary_line).to.eql('1 TELEGRAPH HILL BLVD');
        expect(response.deliverability).to.eql('deliverable');
        return done();
      });
    });

    it('verifies an address with custom case', (done) => {
      const bulkResponse = {
        addresses: [
          fixtures.clone(fixtures.BULK_US_VERIFICATION, {
            primary_line: '1 Telegraph Hill Blvd',
            deliverability: 'deliverable'
          })
        ]
      };

      mockLob()
        .post('/v1/bulk/us_verifications')
        .query({ case: 'proper' })
        .reply(200, bulkResponse);

      Lob.bulkUSVerifications.verify({
        addresses: [{
          primary_line: 'deliverable',
          city: 'San Francisco',
          state: 'CA',
          zip_code: '94107'
        }]
      }, {
        case: 'proper'
      }, (err, res) => {
        const addresses = res.addresses;
        const addr = addresses[0];
        expect(addr.primary_line).to.eql('1 Telegraph Hill Blvd');
        expect(addr.deliverability).to.eql('deliverable');
        return done();
      });
    });

  });

});
