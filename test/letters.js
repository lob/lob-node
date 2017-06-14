'use strict';

var fs = require('fs');

var ADDRESS = {
  name: 'Lob',
  email: 'support@lob.com',
  address_line1: '123 Main Street',
  address_line2: 'Apartment A',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: '94158',
  address_country: 'US'
};

describe('letters', function () {

  describe('list', function () {

    it('returns a list of letters', function (done) {
      Lob.letters.list(function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('filters letters', function (done) {
      Lob.letters.list({ limit: 1 }, function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

  });

  describe('retrieve', function () {

    it('retrieves a letter', function (done) {
      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        color: true,
        file: '<h1>Test Letter</h1>'
      }, function (err, res) {
        Lob.letters.retrieve(res.id, function (err2, res2) {
          expect(res2.object).to.eql('letter');
          done();
        });
      });
    });

  });

  describe('create', function () {

    it('creates a letter with a local file', function (done) {
      var filePath = __dirname + '/assets/8.5x11.pdf';

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: fs.createReadStream(filePath),
        color: true
      }, function (err, res) {
        expect(res.object).to.eql('letter');
        done();
      });
    });

    it('creates a letter with a buffer', function (done) {
      var file = fs.readFileSync(__dirname + '/assets/8.5x11.pdf');

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: file,
        color: false
      }, function (err, res) {
        expect(res.object).to.eql('letter');
        done();
      });
    });

    it('errors with a missing file', function (done) {
      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS
      }, function (err) {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

  });

  describe('delete', function () {

    it('deletes a letter', function (done) {
      var filePath = __dirname + '/assets/8.5x11.pdf';
      
      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: fs.createReadStream(filePath),
        color: true
      }, function (err, res) {
        Lob.letters.delete(res.id, function (err2, res2) {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });
    
  });

});
