describe('Init', function () {
  it('should error when no api key', function (done) {
    try {
      require('../lib/lob.js')();
    }
    catch (err){
      err.should.throw();
    }

    done();
  });
});
