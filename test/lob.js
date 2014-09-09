var chai         = require('chai');
var expect       = chai.expect;

describe('Init', function () {
  it('should error when no api key', function (done) {
    try {
      require('../lib/resources/lob.js')();
    }
    catch (err){
      expect(err).to.be.an.instanceof(Error);
    }

    done();
  });
});

describe('setHost', function () {
  it('should allow you to override the host', function () {
    var lob = require('../lib/resources/lob.js')('api_key');
    lob.setHost('new endpoint');
    return expect(lob.endpoint).to.eql('new endpoint');
  });
});
