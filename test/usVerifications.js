'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

describe('us_verifications', () => {

  describe('verify', () => {

    it('verifies an address', (done) => {
      const verificationResponse = fixtures.clone(fixtures.US_VERIFICATION, {
        primary_line: '1 TELEGRAPH HILL BLVD',
        deliverability: 'deliverable'
      });

      mockLob()
        .post('/v1/us_verifications')
        .reply(200, verificationResponse);

      Lob.usVerifications.verify({
        primary_line: 'deliverable',
        city: 'San Francisco',
        state: 'CA',
        zip_code: '94107'
      }, (err, res) => {
        expect(res.primary_line).to.eql('1 TELEGRAPH HILL BLVD');
        expect(res.deliverability).to.eql('deliverable');
        return done();
      });
    });

    it('verifies an address with custom case', (done) => {
      const verificationResponse = fixtures.clone(fixtures.US_VERIFICATION, {
        primary_line: '1 Telegraph Hill Blvd',
        deliverability: 'deliverable'
      });

      mockLob()
        .post('/v1/us_verifications')
        .query({ case: 'proper' })
        .reply(200, verificationResponse);

      Lob.usVerifications.verify({
        primary_line: 'deliverable',
        city: 'San Francisco',
        state: 'CA',
        zip_code: '94107'
      }, {
        case: 'proper'
      }, (err, res) => {
        expect(res.primary_line).to.eql('1 Telegraph Hill Blvd');
        expect(res.deliverability).to.eql('deliverable');
        return done();
      });
    });

  });

});
