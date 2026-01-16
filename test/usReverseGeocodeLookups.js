'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

describe('us_reverse_geocode_lookups', () => {

  describe('lookup', () => {

    it('reverse geocodes a US Location', (done) => {
      mockLob()
        .post('/v1/us_reverse_geocode_lookups')
        .reply(200, fixtures.US_REVERSE_GEOCODE);

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
