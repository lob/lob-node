'use strict';

var fs = require('fs');

var OBJECT = {
  description: 'Test Object',
  file: '<h1>Test Object</h1>',
  setting: 200
};

describe('objects', function () {

  describe('list', function () {

    it('returns a list of objects', function (done) {
      Lob.objects.list(function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('filters objects', function (done) {
      Lob.objects.list({ count: 1 }, function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

  });

  describe('retrieve', function () {

    it('returns an object', function (done) {
      Lob.objects.create(OBJECT, function (err, res) {
        Lob.objects.retrieve(res.id, function (err2, res2) {
          expect(res2.object).to.eql('object');
          done();
        });
      });
    });

  });

  describe('create', function () {

    it('creates an object with a local file', function (done) {
      var filePath = __dirname + '/assets/4_25x6_25.pdf';

      Lob.objects.create({
        description: 'Test Job',
        file: fs.createReadStream(filePath),
        setting: 201
      }, function (err, res) {
        expect(res.object).to.eql('object');
        done();
      });
    });

    it('creates an object with a buffer', function (done) {
      var file = fs.readFileSync(__dirname + '/assets/4_25x6_25.pdf');

      Lob.objects.create({
        description: 'Test Job',
        file: file,
        setting: 201
      }, function (err, res) {
        expect(res.object).to.eql('object');
        done();
      });
    });

  });

  describe('delete', function () {

    it('deletes an object', function (done) {
      Lob.objects.create(OBJECT, function (err, res) {
        Lob.objects.delete(res.id, function (err2, res2) {
          expect(res2.deleted).to.eql(true);
          done();
        });
      });
    });

  });

});
