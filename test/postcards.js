'use strict';

var fs      = require('fs');
var chai    = require('chai');
var expect  = chai.expect;

var API_KEY = 'test_fd34e1b5ea86a597ec89f7f2e46940c874d';
var Lob     = require('../lib/index.js')(API_KEY);

describe('Postcards', function () {

  describe('list', function () {
    it('should error with an invalid count or offset', function (done) {
      Lob.postcards.list({ offset: 0,count: 1000 }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have the correct defaults', function (done) {
      Lob.postcards.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
          'v1/postcards?count=10&offset=10');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('should let you limit the count', function (done) {
      Lob.postcards.list({ offset: 0 }, function (err, res) {
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('should let you limit the count', function (done) {
      Lob.postcards.list({ count: 5, offset: 0 }, function (err, res) {
        expect(res.count).to.eql(5);
        done();
      });
    });

    it('should let you shift the offset', function (done) {
      Lob.postcards.list({ offset: 5,count: 1 }, function (err, res1) {
        Lob.postcards.list({ offset: 10,count: 1 }, function (err, res2) {
          expect(res1).to.not.eql(res2);
          done();
        });
      });
    });
  });

  describe('get', function () {
    it('should have the correct defaults', function (done) {
      Lob.postcards.create({
        description: 'Test Postcard',
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
        front: '<h1>Test Postcard Front</h1>',
        back: '<h1>Test Postcard Back</h1>'
      }, function (err, res) {
        Lob.postcards.retrieve(res.id, function () {
          expect(res.object).to.eql('postcard');
          done();
        });
      });
    });

    it('should throw an error with an invalid id', function (done) {
      Lob.postcards.retrieve('badId', function (err) {
        expect(err).to.exist;
        done();
      });
    });
  });

  describe('create', function () {
    it('should succeed using address and remote file', function (done) {
      Lob.addresses.list({ offset: 0, count: 1 }, function (err, res) {
        var address = res.data[0].id;
        Lob.postcards.create({
          description: 'Test Postcard',
          to: address,
          front: 'https://s3-us-west-2.amazonaws.com/' +
            'lob-assets/lob-postcard-front.pdf',
          back: 'https://s3-us-west-2.amazonaws.com/' +
            'lob-assets/lob-postcard-front.pdf'
        }, function (err, res) {
          expect(res.object).to.eql('postcard');
          done();
        });
      });
    });

    it('should succeed using address and file and message', function (done) {
      Lob.addresses.list({ offset: 0, count: 1 }, function (err, res) {
        var address = res.data[0].id;
        Lob.postcards.create({
          description: 'Test Postcard',
          to: address,
          front: '<h1>Test Postcard Front</h1>',
          message: 'This is the message'
        }, function (err, res) {
          expect(res.object).to.eql('postcard');
          done();
        });
      });
    });

    it('should error with missing front', function (done) {
      Lob.addresses.list({ offset: 0, count: 1 }, function (err, res) {
        var address = res.data[0].id;
        Lob.postcards.create({
          description: 'Test Postcard',
          to: address,
          back: '<h1>Test Postcard Back</h1>',
          message: 'This is the message'
        }, function (err) {
          expect(err).to.be.an.instanceOf(Object);
          done();
        });
      });
    });

    it('should error with bad address', function (done) {
      var address = 'kjkjk';

      Lob.postcards.create({
        description: 'Test Postcard',
        to: address,
        front: '<h1>Test Postcard Front</h1>',
        message: 'This is the message'
      }, function (err) {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

    it('should succeed using address and local file', function (done) {
      var filePath = __dirname + '/assets/4_25x6_25.pdf';

      Lob.addresses.list({ offset: 0, count: 1 }, function (err, res) {
        var address = res.data[0].id;

        Lob.postcards.create({
          description: 'Test Postcard',
          to: address,
          front: fs.createReadStream(filePath),
          back: fs.createReadStream(filePath)
        }, function (err, res) {
          expect(res.object).to.eql('postcard');
          done();
        });
      });
    });

    it('should succeed using inline address and local file', function (done) {
      var filePath = __dirname + '/assets/4_25x6_25.pdf';

      var address = {
        name: 'Grayson Chao',
        email: 'grayson@lob.com',
        phone: '5555555555',
        address_line1: '402 Test Street',
        address_line2: 'Floor LL',
        address_city: 'San Francisco',
        address_state: 'CA',
        address_zip: '94107',
        address_country: 'US'
      };

      Lob.postcards.create({
        description: 'Test Postcard',
        to: address,
        front: fs.createReadStream(filePath),
        back: fs.createReadStream(filePath)
      }, function (err, res) {
        expect(res.object).to.eql('postcard');
        done();
      });
    });

    it('should succeed using address and buffers', function (done) {
      var file = fs.readFileSync(__dirname + '/assets/4_25x6_25.pdf');
      var front = file;
      var back = file;

      Lob.addresses.list({ offset: 0, count: 1 }, function (err, res) {
        var address = res.data[0].id;
        Lob.postcards.create({
          description: 'Test Postcard',
          to: address,
          front: front,
          back: back
        }, function (err, res) {
          expect(res.object).to.eql('postcard');
          done();
        });
      });
    });

    it('should succeed with an inline address containing a null value',
    function (done) {
      Lob.postcards.create({
        to: {
          name: 'Peter Nagel',
          phone: null,
          address_line1: '1389 Jefferson Street',
          address_line2: 'Unit A201',
          address_city: 'Oakland',
          address_state: 'CA',
          address_zip: '94612'
        },
        front: '<h1>Test Postcard Front</h1>',
        back: '<h1>Test Postcard Back</h1>'
      }, function (err, res) {
        expect(res.object).to.eql('postcard');
        done();
      });
    });
  });
});
