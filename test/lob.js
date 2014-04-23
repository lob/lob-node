var Lob = require('../lib/lob');

describe('Init', function () {
  it('should error when no api key', function (done) {
    try {
      new Lob();
    }
    catch (err){
      err.should.throw();
    }

    done();
  });
});
