'use strict';

var fs      = require('fs');
var chai    = require('chai');
var expect  = chai.expect;

var API_KEY = 'test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc';
var Lob     = require('../lib/index.js')(API_KEY);

describe('Letters', function () {

  describe('list', function () {
    it('should error with an invalid count or offset', function (done) {
      Lob.letters.list({ offset: 0,count: 1000 }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have the correct defaults', function (done) {
      Lob.letters.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
          'v1/letters?count=10&offset=10');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('should default count to 10', function (done) {
      Lob.letters.list({ offset: 0 }, function (err, res) {
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('should let you limit the count', function (done) {
      Lob.letters.list({ count: 5, offset: 0 }, function (err, res) {
        expect(res.count).to.eql(5);
        done();
      });
    });

    it('should let you shift the offset', function (done) {
      Lob.letters.list({ offset: 5,count: 1 }, function (err, res1) {
        Lob.letters.list({ offset: 10,count: 1 }, function (err, res2) {
          expect(res1).to.not.eql(res2);
          done();
        });
      });
    });
  });

  describe('retrieve', function () {
    it('should have the correct defaults', function (done) {
      var address = {
        name: 'Lob',
        email: 'support@lob.com',
        address_line1: '123 Main Street',
        address_line2: 'Apartment A',
        address_city: 'San Francisco',
        address_state: 'CA',
        address_zip: '94158',
        address_country: 'US'
      };
      Lob.letters.create({
        description: 'Test Letter',
        to: address,
        from: address,
        color: true,
        file: '<h1>Test Letter</h1>'
      }, function (err, res) {
        Lob.letters.retrieve(res.id, function (err2, res2) {
          expect(res2.object).to.eql('letter');
          done();
        });
      });
    });

    it('should throw an error with an invalid id', function (done) {
      Lob.letters.retrieve('ltr_nonexistent', function (err) {
        expect(err).to.exist;
        done();
      });
    });
  });

  describe('create', function () {
    it('should succeed using address and remote file', function (done) {
      Lob.addresses.list({ offset: 0, count: 1 }, function (err, res) {
        var address = res.data[0].id;
        Lob.letters.create({
          description: 'Test Letter',
          to: address,
          from: address,
          color: true,
          file: 'https://lob.com/goblue.pdf'
        }, function (err, res) {
          expect(res.object).to.eql('letter');
          done();
        });
      });
    });

    it('should succeed using inline address and remote file', function (done) {
      Lob.addresses.list({ offset: 0, count: 1 }, function (err, res) {
        var address = res.data[0].id;
        Lob.letters.create({
          description: 'Test Letter',
          to: address,
          from: address,
          color: true,
          file: 'https://lob.com/goblue.pdf'
        }, function (err, res) {
          expect(res.object).to.eql('letter');
          done();
        });
      });
    });

    it('should error with missing file', function (done) {
      Lob.addresses.list({ offset: 0, count: 1 }, function (err, res) {
        var address = res.data[0].id;
        Lob.letters.create({
          description: 'Test Letter',
          to: address,
          from: address
        }, function (err) {
          expect(err).to.be.an.instanceOf(Object);
          done();
        });
      });
    });

    it('should error with bad address', function (done) {
      var address = 'adr_nonexistent';

      Lob.letters.create({
        description: 'Test Letter',
        to: address,
        from: address,
        file: 'https://lob.com/goblue.pdf'
      }, function (err) {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

    it('should succeed using address and local file', function (done) {
      var filePath = __dirname + '/assets/8.5x11.pdf';

      Lob.addresses.list({ offset: 0, count: 1 }, function (err, res) {
        var address = res.data[0].id;

        Lob.letters.create({
          description: 'Test Letter',
          to: address,
          from: address,
          file: fs.createReadStream(filePath),
          color: true
        }, function (err, res) {
          expect(res.object).to.eql('letter');
          done();
        });
      });
    });

    it('should succeed using inline address and local file', function (done) {
      var filePath = __dirname + '/assets/8.5x11.pdf';

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

      Lob.letters.create({
        description: 'Test Letter',
        to: address,
        from: address,
        color: true,
        file: fs.createReadStream(filePath)
      }, function (err, res) {
        expect(res.object).to.eql('letter');
        done();
      });
    });

    it('should succeed using address and buffers', function (done) {
      var file = fs.readFileSync(__dirname + '/assets/8.5x11.pdf');

      Lob.addresses.list({ offset: 0, count: 1 }, function (err, res) {
        var address = res.data[0].id;
        Lob.letters.create({
          description: 'Test Letter',
          to: address,
          from: address,
          file: file,
          color: false
        }, function (err, res) {
          expect(res.object).to.eql('letter');
          done();
        });
      });
    });

    it('should succeed with an inline address containing a null value',
    function (done) {
      Lob.letters.create({
        to: {
          name: 'Peter Nagel',
          phone: null,
          address_line1: '1389 Jefferson Street',
          address_line2: 'Unit A201',
          address_city: 'Oakland',
          address_state: 'CA',
          address_zip: '94612'
        },
        from: {
          name: 'Peter Nagel',
          email: null,
          address_line1: '1389 Jefferson Street',
          address_line2: 'Unit A201',
          address_city: 'Oakland',
          address_state: 'CA',
          address_zip: '94612'
        },
        color: false,
        file: '<h1>Test Letter</h1>'
      }, function (err, res) {
        expect(res.object).to.eql('letter');
        done();
      });
    });
  });
});
