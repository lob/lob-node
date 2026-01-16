'use strict';

const mockLob = mocks.mockLob;

describe('us_autocompletions', () => {

  describe('autocomplete', () => {

    it('returns a list of suggestions', (done) => {
      const autocompleteResponse = {
        id: 'us_auto_test123456789',
        suggestions: [
          {
            primary_line: 'TEST KEYS DO NOT AUTOCOMPLETE US ADDRESSES',
            city: 'SAN FRANCISCO',
            state: 'CA',
            zip_code: '94107'
          }
        ],
        object: 'us_autocompletion'
      };

      mockLob()
        .post('/v1/us_autocompletions')
        .reply(200, autocompleteResponse);

      Lob.usAutocompletions.autocomplete({
        address_prefix: '185 BER',
        city: 'San Francisco',
        state: 'CA'
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res.suggestions).to.exist;
        expect(res.suggestions[0].primary_line).to.eql('TEST KEYS DO NOT AUTOCOMPLETE US ADDRESSES');

        return done();
      });
    });

    it('returns a list of suggestions with custom case', (done) => {
      const autocompleteResponse = {
        id: 'us_auto_test123456789',
        suggestions: [
          {
            primary_line: 'Test Keys Do Not Autocomplete Us Addresses',
            city: 'San Francisco',
            state: 'CA',
            zip_code: '94107'
          }
        ],
        object: 'us_autocompletion'
      };

      mockLob()
        .post('/v1/us_autocompletions')
        .query({ case: 'proper' })
        .reply(200, autocompleteResponse);

      Lob.usAutocompletions.autocomplete({
        address_prefix: '185 BER',
        city: 'San Francisco',
        state: 'CA'
      }, {
        case: 'proper'
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res.suggestions).to.exist;
        expect(res.suggestions[0].primary_line).to.eql('Test Keys Do Not Autocomplete Us Addresses');

        return done();
      });
    });

  });

});
