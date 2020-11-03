'use strict';

const Fs = require('fs');

const ADDRESS =  {
  name: 'Lob',
  email: 'support@lob.com',
  address_line1: '123 Main Street',
  address_line2: 'Apartment A',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: '94158',
  address_country: 'US'
};

describe('postcards', () => {

  describe('list', () => {

    it('returns a list of postcards', (done) => {
      Lob.postcards.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        done();
      });
    });

    it('filters postcards', (done) => {
      Lob.postcards.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

    describe('cursor', () => {

      let token;

      beforeEach(async () => {
        const list = await Lob.postcards.list();
        token = new URLSearchParams(list.next_url).get('after');
      });

      it('filters postcards by before', async () => {
        const res = await Lob.postcards.list({ before: token });

        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
      });

      it('filters postcards by after', async () => {
        const res = await Lob.postcards.list({ after: token });

        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
      });

    });

  });

  describe('retrieve', () => {

    it('retrieves a postcard', (done) => {
      Lob.postcards.create({
        to: ADDRESS,
        front: '<h1>Test Postcard Front</h1>',
        back: '<h1>Test Postcard Back</h1>'
      }, (err, res) => {
        Lob.postcards.retrieve(res.id, () => {
          expect(res.object).to.eql('postcard');
          done();
        });
      });
    });

  });

  describe('create', () => {

    it('creates a postcard with a local file', (done) => {
      const filePath = `${__dirname}/assets/4_25x6_25.pdf`;

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: Fs.createReadStream(filePath),
        back: Fs.createReadStream(filePath)
      }, (err, res) => {
        expect(res.object).to.eql('postcard');
        done();
      });
    });

    it('creates a postcard with a buffer', (done) => {
      const file = Fs.readFileSync(`${__dirname}/assets/4_25x6_25.pdf`);

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: file,
        back: file
      }, (err, res) => {
        expect(res.object).to.eql('postcard');
        done();
      });
    });

    it('creates a postcard with a merge variable conditional', (done) => {
      const html = `<html>{{#is_awesome}}You're awesome!{{/is_awesome}}</html>`;

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: html,
        back: html,
        merge_variables: {
          is_awesome: true
        }
      }, (err, res) => {
        expect(res.object).to.eql('postcard');
        expect(res.merge_variables.is_awesome).to.be.true;
        done();
      });
    });

    it('errors with missing front', (done) => {
      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        back: '<h1>Test Postcard Back</h1>',
        message: 'This is the message'
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

    it('errors with missing back', (done) => {
      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: '<h1>Test Postcard Back</h1>'
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

  });

  describe('delete', () => {

    it('deletes a postcard', (done) => {
      const file = Fs.readFileSync(`${__dirname}/assets/4_25x6_25.pdf`);

      Lob.postcards.create({
        description: 'Test Postcard',
        to: ADDRESS,
        front: file,
        back: file
      }, (err, res) => {
        Lob.postcards.delete(res.id, (err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
