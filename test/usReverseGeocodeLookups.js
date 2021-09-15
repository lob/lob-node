'use strict';

describe('us_reverse_geocode_lookups', () => {

  describe('lookup', () => {

    it('reverse geocodes a US Location', (done) => {
      Lob.usReverseGeocodeLookups.lookup({
        latitude: 37.777456,
        longitude: -122.393039
      }, (err, res) => {
        expect(res.addresses[0].components.zip_code).to.be.a('string');
        expect(res.addresses[0].components.zip_code_plus_4).to.be.a('string');
        return done();
      });
    });

  });

});