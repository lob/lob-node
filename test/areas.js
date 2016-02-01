'use strict';

var fs = require('fs');

var AREA = {
  description: 'Test Area',
  routes: ['94158-C001', '94107-C031'],
  front: '<h1>Test Area Front</h1>',
  back: '<h1>Test Area Back</h1>',
  target_type: 'residential'
};

describe('areas', function () {

  describe('list', function () {

    it('returns a list of areas', function (done) {
      Lob.areas.list(function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('filters areas', function (done) {
      Lob.areas.list({ limit: 1 }, function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

  });

  describe('retrieve', function () {

    it('retrieves an area', function (done) {
      Lob.areas.create(AREA, function (err, res) {
        Lob.areas.retrieve(res.id, function (err, res) {
          expect(res.object).to.eql('area');
          done();
        });
      });
    });

  });

  describe('create', function () {

    it('creates an area', function (done) {
      Lob.areas.create(AREA, function (err, res) {
        expect(res.object).to.eql('area');
        done();
      });
    });

    it('creates an area from a local file', function (done) {
      var filePath = __dirname + '/assets/areaback.pdf';
      Lob.areas.create({
        description: 'Test Area',
        routes: ['94158-C001', '94107-C031'],
        front: fs.createReadStream(filePath),
        back: fs.createReadStream(filePath)
      }, function (err, res) {
        expect(res.object).to.eql('area');
        done();
      });
    });

    it('creates an area from a buffer', function (done) {
      fs.readFile(__dirname + '/assets/areaback.pdf', function (err, file) {
        Lob.areas.create({
          description: 'Test Area',
          routes: ['94158-C001'],
          front: file,
          back: file
        }, function (err, res) {
          expect(res.object).to.eql('area');
          done();
        });
      });
    });

    it('errors if front is missing', function (done) {
      Lob.areas.create({
        description: 'Test Area',
        routes: ['94158-C001', '94107-C031'],
        back: '<h1>Test Area Back</h1>',
        target_type: 'residential'
      }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('errors if back is missing', function (done) {
      Lob.areas.create({
        description: 'Test Area',
        routes: ['94158-C001', '94107-C031'],
        front: '<h1>Test Area Front</h1>',
        target_type: 'residential'
      }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

  });

});
