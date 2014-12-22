var chai         = require('chai');
var expect       = chai.expect;

describe('Init', function () {
  it('should error when no api key', function (done) {
    try {
      new require('../lib')();
    }
    catch (err){
      expect(err).to.be.an.instanceof(Error);
    }

    done();
  });

  it('should allow you to specify a version', function () {
    var lob = new require('../lib')('api_key');
    lob.setVersion('api_version');
    return expect(lob.apiVersion).to.eql('api_version');
  });
});

describe('setHost', function () {
  it('should allow you to override the host', function () {
    var lob = require('../lib')('api_key');
    lob.setHost('new endpoint');
    return expect(lob.endpoint).to.eql('new endpoint');
  });
});
