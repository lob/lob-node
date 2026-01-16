'use strict';

describe('Integration: Bulk Intl Verifications (Live Key Required)', function () {

  this.timeout(INTEGRATION_TIMEOUT);

  before(function () {
    if (!HAS_LIVE_KEY) {
      this.skip();
    }
  });

  describe('verify', () => {

    it('verifies an international address', (done) => {
      LiveLob.bulkIntlVerifications.verify({
        addresses: [
          {
            primary_line: '370 Water St',
            city: 'Summerside',
            state: 'Prince Edward Island',
            postal_code: 'C1N 1C4',
            country: 'CA'
          }
        ]
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.property('addresses');
        expect(res.addresses).to.be.instanceof(Array);
        expect(res.addresses.length).to.eql(1);
        done();
      });
    });

  });

});
