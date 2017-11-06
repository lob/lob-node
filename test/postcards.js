'use strict';

var fs = require('fs');

var ADDRESS =  {
  name: 'Lob',
  email: 'support@lob.com',
  address_line1: '123 Main Street',
  address_line2: 'Apartment A',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: '94158',
  address_country: 'US'
};

describe('postcards', function () {

  describe('list', function () {

    it('returns a list of postcards', function (done) {
      Lob.postcards.list(function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('filters postcards', function (done) {
      Lob.postcards.list({ limit: 1 }, function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

  });

  describe('retrieve', function () {

    it('retrieves a postcard', function (done) {
      Lob.postcards.create({
        to: ADDRESS,
        front: '<h1>Test Postcard Front</h1>',
        back: '<h1>Test Postcard Back</h1>'
      }, function (err, res) {
        Lob.postcards.retrieve(res.id, function () {
          expect(res.object).to.eql('postcard');
          done();
        });
      });
    });

  });

  describe('create', function () {

    it('creates a postcard with a local file', function (done) {
      var filePath = __dirname + '/assets/4_25x6_25.pdf';

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: fs.createReadStream(filePath),
        back: fs.createReadStream(filePath)
      }, function (err, res) {
        expect(res.object).to.eql('postcard');
        done();
      });
    });

    it('creates a postcard with a buffer', function (done) {
      var file = fs.readFileSync(__dirname + '/assets/4_25x6_25.pdf');

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: file,
        back: file
      }, function (err, res) {
        expect(res.object).to.eql('postcard');
        done();
      });
    });

    it('errors with missing front', function (done) {
      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        back: '<h1>Test Postcard Back</h1>',
        message: 'This is the message'
      }, function (err) {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

  });

  describe('delete', function () {

    it('deletes a postcard', function (done) {
      var file = fs.readFileSync(__dirname + '/assets/4_25x6_25.pdf');

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: file,
        back: file
      }, function (err, res) {
        Lob.postcards.delete(res.id, function (err2, res2) {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
