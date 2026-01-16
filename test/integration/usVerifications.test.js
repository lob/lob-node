'use strict';

describe('Integration: US Verifications', function () {

  this.timeout(INTEGRATION_TIMEOUT);

  describe('verify', () => {

    // Test environment requires special values:
    // primary_line: 'deliverable' + zip_code: '11111' = deliverable
    // primary_line: 'undeliverable' = undeliverable

    it('verifies a deliverable address', (done) => {
      Lob.usVerifications.verify({
        primary_line: 'deliverable',
        city: 'San Francisco',
        state: 'CA',
        zip_code: '11111'
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.property('deliverability');
        expect(res.deliverability).to.eql('deliverable');
        done();
      });
    });

    it('identifies an undeliverable address', (done) => {
      Lob.usVerifications.verify({
        primary_line: 'undeliverable',
        city: 'San Francisco',
        state: 'CA',
        zip_code: '11111'
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.property('deliverability');
        expect(res.deliverability).to.not.eql('deliverable');
        done();
      });
    });

    it('returns verification response structure', (done) => {
      Lob.usVerifications.verify({
        primary_line: 'deliverable',
        city: 'San Francisco',
        state: 'CA',
        zip_code: '11111'
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.property('id');
        expect(res).to.have.property('components');
        expect(res.object).to.eql('us_verification');
        done();
      });
    });

  });

});
