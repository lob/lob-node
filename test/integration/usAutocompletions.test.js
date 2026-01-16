'use strict';

describe('Integration: US Autocompletions', function () {

  this.timeout(INTEGRATION_TIMEOUT);

  describe('autocomplete', () => {

    it('returns suggestions for a partial address', (done) => {
      Lob.usAutocompletions.autocomplete({
        address_prefix: '185 BER',
        city: 'San Francisco',
        state: 'CA'
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.property('suggestions');
        expect(res.suggestions).to.be.instanceof(Array);
        expect(res.object).to.eql('us_autocompletion');
        done();
      });
    });

    it('returns suggestions with proper case', (done) => {
      Lob.usAutocompletions.autocomplete({
        address_prefix: '185 ber',
        city: 'san francisco',
        state: 'CA'
      }, {
        case: 'proper'
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.property('suggestions');
        done();
      });
    });

  });

});
