var lobFactory = require('../lib/index.js');
var Lob = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var chai   = require('chai');
var expect = chai.expect;
var fs     = require('fs');

/* jshint camelcase: false */
/*jshint expr: true*/
describe('Areas', function () {
  describe('list', function () {
    it('should error with an invalid count or offset', function (done) {
      Lob.areas.list({offset: 0,count: 1000}, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have the correct defaults', function (done) {
      Lob.areas.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
          'v1/areas?count=10&offset=10');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(10);
        done();
      });
    });
    it('should let you limit the count', function (done) {
      Lob.areas.list({offset: 0}, function (err, res) {
        expect(res.count).to.eql(10);
        done();
      });
    });
    it('should let you limit the count', function (done) {
      Lob.areas.list({count: 5, offset: 0}, function (err, res) {
        expect(res.count).to.eql(5);
        done();
      });
    });
    it('should let you shift the offset', function (done) {
      Lob.areas.list({offset: 5,count: 1}, function (err, res1) {
        Lob.areas.list({offset: 10,count: 1}, function (err, res2) {
          expect(res1).to.not.eql(res2);
          done();
        });
      });
    });
  });
  describe('get', function () {
    it('should have the correct defaults', function (done) {
      Lob.areas.create({
        name: 'Test Area',
        routes: ['94158-C001', '94107-C031'],
        front: 'https://www.lob.com/sam_back_template.pdf',
        back: 'https://www.lob.com/sam_back_template.pdf'
      }, function (err, res) {
        Lob.areas.retrieve(res.id, function (err2, res2) {
          expect(res).to.eql(res2);
          done();
        });
      });
    });

    it('should throw an error with an invalid id', function (done) {
      Lob.areas.retrieve('badId', function (err) {
        expect(err).to.exist;
        done();
      });
    });

  });
  describe('create', function () {
    it('should succeed using address and remote file', function (done) {
      var address;
      Lob.addresses.list({offset: 0,count: 1}, function (err, res) {
        address = res.data[0].id;
        Lob.areas.create({
          name: 'Test Area',
          routes: ['94158-C001', '94107-C031'],
          front: 'https://www.lob.com/sam_back_template.pdf',
          back: 'https://www.lob.com/sam_back_template.pdf'
        }, function (err, res) {
          expect(res.object).to.eql('area');
          done();
        });
      });
    });
    it('should succeed using address, url and target_type', function (done) {
      Lob.areas.create({
        name: 'Test Area',
        routes: ['94158-C001', '94107-C031'],
        front: 'https://www.lob.com/sam_back_template.pdf',
        back: 'https://www.lob.com/sam_back_template.pdf',
        target_type: 'residential'
      }, function (err, res) {
        expect(res.object).to.eql('area');
        done();
      });
    });

    it('should succeed with full_bleed specified', function (done) {
      Lob.areas.create({
        name: 'Test Area',
        routes: ['94158-C001', '94107-C031'],
        front: 'https://www.lob.com/sam_back_template.pdf',
        back: 'https://www.lob.com/sam_back_template.pdf',
        full_bleed: 1
      }, function (err, res) {
        expect(res.object).to.eql('area');
        done();
      });
    });
    it('should error with bad routes', function (done) {
      Lob.areas.create({
        name: 'Test Area',
        routes: ['this route is bananas', 'B A N A N A S'],
        front: 'https://www.lob.com/sam_back_template.pdf',
        back: 'https://www.lob.com/sam_back_template.pdf'
      }, function (err) {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });
    it('should succeed using address and local file', function (done) {
      var filePath = '@' + __dirname + '/assets/sam_back_template.pdf';
      Lob.areas.create({
        name: 'Test Area',
        routes: ['94158-C001', '94107-C031'],
        front: filePath,
        back: filePath
      }, function (err, res) {
        expect(res.object).to.eql('area');
        done();
      });
    });
    it('should succeed using address and buffers', function (done) {
      fs.readFile(__dirname + '/assets/sam_back_template.pdf',
        function (err, file) {
        Lob.areas.create({
          name: 'Test Area',
          routes: ['94158-C001'],
          front: file,
          back: file
        }, function (err, res) {
          expect(res.object).to.eql('area');
          done();
        });
      });
    });
  });
});
/*jshint expr: false*/
/* jshint camelcase: true */
