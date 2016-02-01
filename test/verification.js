'use strict';

describe('verification', function () {

  describe('verify', function () {

    it('verifies an address', function (done) {
      Lob.verification.verify({
        address_line1: '220 William T Morrissey Boulevard',
        address_city: 'Boston',
        address_state: 'MA',
        address_zip: '02125'
      }, function (err, res) {
        expect(res.address.address_line1).to.eql('220 WILLIAM T MORRISSEY BLVD');
        expect(res.address.address_line2).to.eql('');
        expect(res.address.address_city).to.eql('BOSTON');
        expect(res.address.address_state).to.eql('MA');
        expect(res.address.address_zip).to.eql('02125-3314');
        expect(res.address.address_country).to.eql('US');
        return done();
      });
    });

  });

});
