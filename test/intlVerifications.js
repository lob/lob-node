'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

describe('intl_verifications', () => {

  describe('verify', () => {

    it('verifies an address', (done) => {
      const verificationResponse = fixtures.clone(fixtures.INTL_VERIFICATION, {
        primary_line: '370 WATER ST',
        deliverability: 'deliverable'
      });

      mockLob()
        .post('/v1/intl_verifications')
        .reply(200, verificationResponse);

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
