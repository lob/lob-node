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

describe('letters', () => {

  describe('list', () => {

    it('returns a list of letters', (done) => {
      Lob.letters.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('filters letters', (done) => {
      Lob.letters.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves a letter', (done) => {
      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        color: true,
        file: '<h1>Test Letter</h1>'
      }, (err, res) => {
        Lob.letters.retrieve(res.id, (err2, res2) => {
          expect(res2.object).to.eql('letter');
          done();
        });
      });
    });

  });

  describe('create', () => {

    it('creates a letter with a local file', (done) => {
      var filePath = `${__dirname}/assets/8.5x11.pdf`;

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: fs.createReadStream(filePath),
        color: true
      }, (err, res) => {
        expect(res.object).to.eql('letter');
        done();
      });
    });

    it('creates a letter with a buffer', (done) => {
      var file = fs.readFileSync(`${__dirname}/assets/8.5x11.pdf`);

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: file,
        color: false
      }, (err, res) => {
        expect(res.object).to.eql('letter');
        done();
      });
    });

    it('errors with a missing file', (done) => {
      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

  });

  describe('delete', () => {

    it('deletes a letter', (done) => {
      var filePath = `${__dirname}/assets/8.5x11.pdf`;

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: fs.createReadStream(filePath),
        color: true
      }, (err, res) => {
        Lob.letters.delete(res.id, (err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
