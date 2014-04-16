var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var Should;
Should = require('should');
/* jshint camelcase: false */
describe('Jobs', function() {
  it('should handle an error with an invalid count or offset', function(done){
    Lob.jobs.list({offset: 0, count: 10000}, function(err, res) {
      err.should.be.ok;
      done();
    });
  });
  describe('list', function() {
    it('should have the correct defaults', function(done) {
      Lob.jobs.list(function(err, res) {
        res.should.have.property('object');
        res.should.have.property('data');
        res.data.should.be.instanceof(Array);
        res.data.length.should.eql(10);
        res.should.have.property('count');
        res.should.have.property('next_url');
        res.next_url.should.eql('https://api.lob.com/' +
          'v1/jobs?count=10&offset=10');
        res.should.have.property('previous_url');
        res.object.should.eql('list');
        res.count.should.eql(10);
        done();
      });
    });
    it('should let you limit the count', function(done) {
      Lob.jobs.list({offset: 0, count: 5}, function(err, res) {
        res.count.should.eql(5);
        done();
      });
    });
  });
  describe('retrieve', function() {
    it('should have the correct defaults', function(done) {
      Lob.jobs.create({
        name: 'Test Job',
        from: {
          name: 'Lob',
          email: 'support@lob.com',
          address_line1: '123 Main Street',
          address_line2: 'Apartment A',
          address_city: 'San Francisco',
          address_state: 'CA',
          address_zip: '94158',
          address_country: 'US'
        },
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
        objects: [
          {
            name: 'GO BLUE',
            file: 'https://www.lob.com/goblue.pdf',
            setting_id: 100
          }
        ]
      }, function(err, res) {
        Lob.jobs.retrieve(res.id, function(err2, res2) {
          res.should.eql(res2);
          done();
        });
      });
    });
    it('should throw an error with an invalid id', function(done) {
      Lob.jobs.retrieve('badId', function(err, res) {
        err.should.be.ok;
        done();
      });
    });
  });
  describe('create', function() {
    it('should succeed when using address and object ids',
      function(done) {
      var object;
      var address;
      Lob.addresses.list({count: 1, offset:0 }, function(err, res) {
        address = res.data[0].id;
        Lob.objects.list({count: 1, offset: 0 }, function(err, res) {
          object = res.data[0].id;
          Lob.jobs.create({
            name: 'Test',
            to: address,
            from: address,
            objects: [
              object
            ]
          }, function(err, res) {
            res.object.should.eql('job');
            done();
          });
        })
      });
    });
    it('should succeed using inline address and object', function(done) {
      Lob.jobs.create({
        name: 'Test Job',
        from: {
          name: 'Lob',
          email: 'support@lob.com',
          address_line1: '123 Main Street',
          address_line2: 'Apartment A',
          address_city: 'San Francisco',
          address_state: 'CA',
          address_zip: '94158',
          address_country: 'US'
        },
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
        objects: [
          {
            name: 'GO BLUE',
            file: 'https://www.lob.com/goblue.pdf',
            setting_id: 100
          }
        ]
      }, function(err, res) {
        res.object.should.eql('job');
        done();
      });
    });
    it('should succeed with a multi-object job', function(done) {
      Lob.jobs.create({
        name: 'Test Job',
        from: {
          name: 'Lob',
          email: 'support@lob.com',
          address_line1: '123 Main Street',
          address_line2: 'Apartment A',
          address_city: 'San Francisco',
          address_state: 'CA',
          address_zip: '94158',
          address_country: 'US'
        },
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
        objects: [
          {
            name: 'GO BLUE',
            file: 'https://www.lob.com/goblue.pdf',
            setting_id: 100
          },
          {
            name: 'TEST',
            file: 'https://www.lob.com/goblue.pdf',
            setting_id: 100
          }
        ]
      }, function(err, res) {
        Lob.jobs.retrieve(res.id, function(err2, res2) {
          res.objects.length.should.eql(2);
          res.should.eql(res2);
          done();
        });
      });
    });
    it('should succeed using an object local file', function(done) {
      var filePath = '@' + __dirname + '/assets/4x6.pdf';
      Lob.jobs.create({
        name: 'Test Job',
        from: {
          name: 'Lob',
          email: 'support@lob.com',
          address_line1: '123 Main Street',
          address_line2: 'Apartment A',
          address_city: 'San Francisco',
          address_state: 'CA',
          address_zip: '94158',
          address_country: 'US'
        },
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
        objects: [
          {
            name: 'GO BLUE',
            file: 'https://www.lob.com/test.pdf',
            setting_id: 201
          }
        ]
      }, function(err, res) {
        done();
      });
    });
  });
});
/* jshint camelcase: true */