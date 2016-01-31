'use strict';

var fs = require('fs');

describe('jobs', function () {

  describe('list', function () {

    it('should error with an invalid count or offset', function (done) {
      Lob.jobs.list({ offset: 0, count: 10000 }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have the correct defaults', function (done) {
      Lob.jobs.list(function (err, res) {
        expect(res).to.have.property('object');
        expect(res).to.have.property('data');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res).to.have.property('count');
        expect(res).to.have.property('next_url');
        expect(res.next_url).to.eql('https://api.lob.com/' +
                                    'v1/jobs?count=10&offset=10');
        expect(res).to.have.property('previous_url');
        expect(res.object).to.eql('list');
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('should let you limit the count', function (done) {
      Lob.jobs.list({ offset: 0, count: 5 }, function (err, res) {
        expect(res.count).to.eql(5);
        done();
      });
    });

    it('should let you limit the count', function (done) {
      Lob.jobs.list({ offset: 10 }, function (err, res) {
        expect(res.count).to.eql(10);
        done();
      });
    });

  });

  describe('retrieve', function () {

    it('should have the correct defaults', function (done) {
      Lob.jobs.create({
        description: 'Test Job',
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
            description: 'GO BLUE',
            file: '<h1>Test Job</h1>',
            setting: 200
          }
        ]
      }, function (err, res) {
        Lob.jobs.retrieve(res.id, function (err2, res2) {
          expect(res2.description).to.eql('Test Job');
          done();
        });
      });
    });

    it('should throw an error with an invalid id', function (done) {
      Lob.jobs.retrieve('badId', function (err) {
        expect(err).to.exist;
        done();
      });
    });

  });

  describe('create', function () {

    it('should succeed when using address and object ids', function (done) {
      Lob.addresses.list({ count: 1, offset: 0 }, function (err, res) {
        var address = res.data[0].id;

        Lob.objects.list({ count: 1, offset: 0 }, function (err, res) {
          var object = res.data[0].id;

          Lob.jobs.create({
            description: 'Test',
            to: address,
            from: address,
            objects: object
          }, function (err, res) {
            expect(res.object).to.eql('job');
            done();
          });
        });
      });
    });

    it('should return an error if file is missing', function (done) {
      Lob.jobs.create({
        description: 'Test Job',
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
            description: 'GO BLUE',
            setting: 100
          }
        ]
      }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should succeed using inline address and object', function (done) {
      Lob.jobs.create({
        description: 'Test Job',
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
            description: 'GO BLUE',
            file: '<h1>Test Job</h1>',
            setting: 200
          }
        ]
      }, function (err, res) {
        expect(res.object).to.eql('job');
        done();
      });
    });

    it('should succeed with a multi-object job', function (done) {
      Lob.jobs.create({
        description: 'Test Job',
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
            description: 'GO BLUE',
            file: '<h1>Test Job</h1>',
            setting: 500
          },
          {
            description: 'TEST',
            file: '<h1>Test Job</h1>',
            setting: 500
          }
        ]
      }, function (err, res) {
        expect(res.object).to.eql('job');
        expect(res.objects.length).to.eql(2);
        done();
      });
    });

    it('should fail on bad parameter', function (done) {
      Lob.jobs.create({
        description: 'Test Job',
        objects: [
          {
            description: 'GO BLUE',
            file: '<h1>Test Job</h1>',
            setting: 200
          },
          {
            description: 'TEST',
            file: '<h1>Test Job</h1>',
            setting: 200
          }
        ]
      }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should succeed using an object local file', function (done) {
      var filePath = __dirname + '/assets/4_25x6_25.pdf';
      Lob.jobs.create({
        description: 'Test Job',
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
            description: 'GO BLUE',
            file: fs.createReadStream(filePath),
            setting: 201
          }
        ]
      }, function (err, res) {
        expect(res.object).to.eql('job');
        done();
      });
    });

    it('should succeed using a remote file', function (done) {
      Lob.jobs.create({
        description: 'Test Job',
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
            description: 'GO BLUE',
            file: 'https://s3-us-west-2.amazonaws.com/' +
              'lob-assets/200_201_card.pdf',
            setting: 201
          }
        ]
      }, function (err, res) {
        expect(res.object).to.eql('job');
        done();
      });
    });

    it('should succeed using a buffer', function (done) {
      var file = fs.readFileSync(__dirname + '/assets/4_25x6_25.pdf');
      Lob.jobs.create({
        description: 'Test Job',
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
            description: 'GO BLUE',
            file: file,
            setting: 201
          }
        ]
      }, function (err, res) {
        expect(res.object).to.eql('job');
        done();
      });
    });

    it('should succeed with multi object', function (done) {
      var file = fs.readFileSync(__dirname + '/assets/4_25x6_25.pdf');
      Lob.jobs.create({
        description: 'Test Job',
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
            description: 'GO BLUE',
            file: file,
            setting: 500
          },
          {
            description: 'GO BLUE',
            file: file,
            setting: 500
          }
        ]
      }, function (err, res) {
        expect(res.object).to.eql('job');
        done();
      });
    });
  });

});
