var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var should = require('should');
var fs = require('fs');
/* jshint camelcase: false */
describe('Postcards', function () {
  describe('list', function () {
    it('should error with an invalid count or offset', function (done) {
      Lob.postcards.list({offset: 0,count: 1000}, function (err) {
        should.exist(err);
        done();
      });
    });
    it('should have the correct defaults', function (done) {
      Lob.postcards.list(function (err, res) {
        res.should.have.property('object');
        res.should.have.property('data');
        res.data.should.be.instanceof(Array);
        res.data.length.should.eql(10);
        res.should.have.property('count');
        res.should.have.property('next_url');
        res.next_url.should.eql('https://api.lob.com/' +
          'v1/postcards?count=10&offset=10');
        res.should.have.property('previous_url');
        res.object.should.eql('list');
        res.count.should.eql(10);
        done();
      });
    });
    it('should let you limit the count', function (done) {
      Lob.postcards.list({offset: 0}, function (err, res) {
        res.count.should.eql(10);
        done();
      });
    });
    it('should let you limit the count', function (done) {
      Lob.postcards.list({count: 5, offset: 0}, function (err, res) {
        res.count.should.eql(5);
        done();
      });
    });
    it('should let you shift the offset', function (done) {
      Lob.postcards.list({offset: 5,count: 1}, function (err, res1) {
        Lob.postcards.list({offset: 10,count: 1}, function (err, res2) {
          res1.should.not.eql(res2);
          done();
        });
      });
    });
  });
  describe('get', function () {
    it('should have the correct defaults', function (done) {
      Lob.postcards.create({
        name: 'Test Postcard',
        to: {
          name: 'Lob',
          email: 'support@lob.com',
          address_line1: '123 Main Street',
          address_line2: 'Apartment A',
          address_city: 'San Francisco',
          address_state: 'CA',
          address_zip: '94158',
          address_country: 'US'
        },
        front: 'https://www.lob.com/test.pdf',
        back: 'https://www.lob.com/test.pdf'
      }, function (err, res) {
        Lob.postcards.retrieve(res.id, function (err2, res2) {
          res.should.eql(res2);
          done();
        });
      });
    });
    it('should throw an error with an invalid id', function (done) {
      Lob.postcards.retrieve('badId', function (err) {
        should.exist(err);
        done();
      });
    });
  });
  describe('create', function () {
    it('should succeed using address and remote file', function (done) {
      var address;
      Lob.addresses.list({offset: 0,count: 1}, function (err, res) {
        address = res.data[0].id;
        Lob.postcards.create({
          name: 'Test Postcard',
          to: address,
          front: 'https://www.lob.com/test.pdf',
          back: 'https://www.lob.com/test.pdf'
        }, function (err, res) {
          res.object.should.eql('postcard');
          done();
        });
      });
    });
    it('should succeed using address and file and message', function (done) {
      var address;
      Lob.addresses.list({offset: 0,count: 1}, function (err, res) {
        address = res.data[0].id;
        Lob.postcards.create({
          name: 'Test Postcard',
          to: address,
          front: 'https://www.lob.com/test.pdf',
          message: 'This is the message'
        }, function (err, res) {
          res.object.should.eql('postcard');
          done();
        });
      });
    });
    it('should error with bad address', function (done) {
      var address = 'kjkjk';
      Lob.postcards.create({
        name: 'Test Postcard',
        to: address,
        front: 'https://www.lob.com/test.pdf',
        message: 'This is the message'
      }, function (err) {
        err.should.be.an.instanceOf(Object);
        done();
      });
    });
    it('should succeed using address and local file', function (done) {
      var filePath = '@' + __dirname + '/assets/4x6.pdf';
      var address;
      Lob.addresses.list({offset: 0, count: 1}, function (err, res) {
        address = res.data[0].id;
        Lob.postcards.create({
          name: 'Test Postcard',
          to: address,
          front: filePath,
          back: filePath
        }, function (err, res) {
          res.object.should.eql('postcard');
          done();
        });
      });
    });
    it('should succeed using address and buffers', function (done) {
      var file = fs.readFileSync(__dirname + '/assets/4x6.pdf');
      var front = file;
      var back = file;
      var address;
      Lob.addresses.list({offset: 0, count: 1}, function (err, res) {
        address = res.data[0].id;
        Lob.postcards.create({
          name: 'Test Postcard',
          to: address,
          front: front,
          back: back
        }, function (err, res) {
          res.object.should.eql('postcard');
          done();
        });
      });
    });
  });
});
/* jshint camelcase: true */
