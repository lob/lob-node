'use strict';

var fs = require('fs');

var ADDRESS = {
  name: 'Lob',
  email: 'support@lob.com',
  address_line1: '123 Main Street',
  address_line2: 'Apartment A',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: '94158',
  address_country: 'US'
};
var DESCRIPTION = 'Test Job';
var OBJECT = {
  description: 'GO BLUE',
  file: '<h1>Test Job</h1>',
  setting: 500
};

describe('jobs', function () {

  describe('list', function () {

    it('returns a list of jobs', function (done) {
      Lob.jobs.list(function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('filters jobs', function (done) {
      Lob.jobs.list({ count: 1 }, function (err, res) {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

  });

  describe('retrieve', function () {

    it('retrieves a job', function (done) {
      Lob.jobs.create({
        description: DESCRIPTION,
        from: ADDRESS,
        to: ADDRESS,
        objects: [OBJECT]
      }, function (err, res) {
        Lob.jobs.retrieve(res.id, function (err2, res2) {
          expect(res2.description).to.eql(DESCRIPTION);
          done();
        });
      });
    });

  });

  describe('create', function () {

    it('creates a job with address and object ids', function (done) {
      Lob.addresses.create(ADDRESS, function (err, address) {
        Lob.objects.create(OBJECT, function (err, object) {
          Lob.jobs.create({
            to: address.id,
            from: address.id,
            objects: object.id
          }, function (err, res) {
            expect(res.object).to.eql('job');
            done();
          });
        });
      });
    });

    it('creates a job with inline address and object', function (done) {
      Lob.jobs.create({
        from: ADDRESS,
        to: ADDRESS,
        objects: [OBJECT]
      }, function (err, res) {
        expect(res.object).to.eql('job');
        done();
      });
    });

    it('creates a multi-object job', function (done) {
      Lob.jobs.create({
        from: ADDRESS,
        to: ADDRESS,
        objects: [OBJECT, OBJECT]
      }, function (err, res) {
        expect(res.object).to.eql('job');
        expect(res.objects.length).to.eql(2);
        done();
      });
    });

    it('creates a job with a local file', function (done) {
      var filePath = __dirname + '/assets/4_25x6_25.pdf';
      Lob.jobs.create({
        description: 'Test Job',
        from: ADDRESS,
        to: ADDRESS,
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

    it('creates a job with a remote file', function (done) {
      Lob.jobs.create({
        from: ADDRESS,
        to: ADDRESS,
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

    it('creates a job from a buffer', function (done) {
      var file = fs.readFileSync(__dirname + '/assets/4_25x6_25.pdf');
      Lob.jobs.create({
        from: ADDRESS,
        to: ADDRESS,
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

    it('creates a job from a multi-object buffer', function (done) {
      var file = fs.readFileSync(__dirname + '/assets/4_25x6_25.pdf');
      Lob.jobs.create({
        from: ADDRESS,
        to: ADDRESS,
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

    it('errors on an object without a file', function (done) {
      Lob.jobs.create({
        from: ADDRESS,
        to: ADDRESS,
        objects: [{ setting: 200 }]
      }, function (err) {
        expect(err).to.exist;
        done();
      });
    });

  });

});
