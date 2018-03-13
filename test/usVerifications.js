'use strict';

describe('us_verifications', () => {

  describe('verify', () => {

    it('verifies an address', (done) => {
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
