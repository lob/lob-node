'use strict';

describe('Integration: Bulk US Verifications (Live Key Required)', function () {

  this.timeout(INTEGRATION_TIMEOUT);

  before(function () {
    if (!HAS_LIVE_KEY) {
      this.skip();
    }
  });

  describe('verify', () => {

    it('verifies multiple addresses', (done) => {
      LiveLob.bulkUSVerifications.verify({
        addresses: [
          {
            primary_line: '185 Berry St Ste 6100',
            city: 'San Francisco',
            state: 'CA',
            zip_code: '94107'
          },
          {
            primary_line: '210 King St',
            city: 'San Francisco',
            state: 'CA',
            zip_code: '94107'
          }
        ]
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.property('addresses');
        expect(res.addresses).to.be.instanceof(Array);
        expect(res.addresses.length).to.eql(2);
        done();
      });
    });

  });

});
