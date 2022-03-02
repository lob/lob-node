'use strict';

describe('us_autocompletions', () => {

  describe('autocomplete', () => {

    it('returns a list of suggestions', (done) => {
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
      Lob.usVerifications.verify({
        primary_line: 'deliverable',
        city: 'San Francisco',
        state: 'CA',
        zip_code: '94107'
      }, {
        case: 'proper'
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res.suggestions).to.exist;
        expect(res.suggestions[0].primary_line).to.eql('TEST KEYS DO NOT AUTOCOMPLETE US ADDRESSES');
        return done();
      });
    });

  });

});
