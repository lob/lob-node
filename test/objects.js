var fs      = require('fs');
var chai    = require('chai');
var expect  = chai.expect;

var API_KEY = 'test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc';
var Lob     = require('../lib/index.js')(API_KEY);

describe('Objects', function () {

  describe('list', function () {
    it('should error with an invalid count or offset', function (done) {
      Lob.objects.list({ offset: 0, count: 10000 }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have the correct defaults', function (done) {
      Lob.objects.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
                                    'v1/objects?count=10&offset=10');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('should let you limit the count', function (done) {
      Lob.objects.list({ offset: 0, count: 5 }, function (err, res) {
        expect(res.count).to.eql(5);
        done();
      });
    });

    it('should let you limit offset', function (done) {
      Lob.objects.list({ offset: 0 }, function (err, res) {
        expect(res.count).to.eql(10);
        done();
      });
    });
  });

  describe('retrieve', function () {
    it('should have the correct defaults', function (done) {
      Lob.objects.create({
        description: 'Test Object',
        file: '<h1>Test Object</h1>',
        setting: 200
      }, function (err, res) {
        Lob.objects.retrieve(res.id, function (err2, res2) {
          expect(res).to.contain.all.keys(res2);
          done();
        });
      });
    });

    it('should throw an error with an invalid id', function (done) {
      Lob.objects.retrieve('object_badId', function (err) {
        expect(err).to.exist;
        done();
      });
    });
  });

  describe('create', function () {
    it('should succeed using an object local file', function (done) {
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

    it('fail on bad parameter', function (done) {
      Lob.objects.create({
        description: 'Test Object',
        file: '<h1>Test Object</h1>'
      }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should succeed using a remote file', function (done) {
      Lob.objects.create({
        description: 'Test Job',
        file: 'https://s3-us-west-2.amazonaws.com/lob-assets/200_201_card.pdf',
        setting: 201
      }, function (err, res) {
        expect(res.object).to.eql('object');
        done();
      });
    });

    it('should succeed using a buffer', function (done) {
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
    it('should have the correct defaults', function (done) {
      Lob.objects.create({
        description: 'Test Object',
        file: '<h1>Test Object</h1>',
        setting: 200
      }, function (err, res) {
        Lob.objects.delete(res.id, function (err2, res2) {
          expect(res2.deleted).to.eql(true);
          done();
        });
      });
    });

    it('should throw an error with an invalid id', function (done) {
      Lob.objects.delete('object_badId', function (err) {
        expect(err).to.exist;
        done();
      });
    });
  });
});
