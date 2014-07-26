var chai         = require('chai');
var expect       = chai.expect;

describe('Init', function () {
  it('should error when no api key', function (done) {
    try {
      require('../lib/lob.js')();
    }
    catch (err){
      expect(err).to.be.an.instanceof(Error);
    }

    done();
  });
});
