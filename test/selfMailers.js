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

describe('self mailers', () => {

  describe('list', () => {

    it('returns a list of self mailers', (done) => {
      Lob.selfMailers.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        done();
      });
    });

    it('filters self mailers', (done) => {
      Lob.selfMailers.list({ limit: 1 }, (err, res) => {
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
        const list = await Lob.selfMailers.list();
        token = new URLSearchParams(list.next_url).get('after');
      });

      it('filters selfMailers by before', async () => {
        const res = await Lob.selfMailers.list({ before: token });

        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
      });

      it('filters self mailers by after', async () => {
        const res = await Lob.selfMailers.list({ after: token });

        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
      });

    });

  });

  describe('retrieve', () => {

    it('retrieves a self mailer', (done) => {
      Lob.selfMailers.create({
        to: ADDRESS,
        outside: '<h1>Test Self Mailer Outside</h1>',
        inside: '<h1>Test Self Mailer Inside</h1>'
      }, (err, res) => {
        Lob.selfMailers.retrieve(res.id, () => {
          expect(res.object).to.eql('self_mailer');
          done();
        });
      });
    });

  });

  describe('create', () => {

    it('creates a self mailer with a local file', (done) => {
      const outside = Fs.createReadStream(`${__dirname}/assets/sfm-6x18-outside.pdf`);
      const inside = Fs.createReadStream(`${__dirname}/assets/sfm-6x18-inside.pdf`);

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: outside,
        inside: inside,
      }, (err, res) => {
        expect(res.object).to.eql('self_mailer');
        done();
      });
    });

    it('creates a 12x9 self mailer with a local file', (done) => {
      const outside = Fs.createReadStream(`${__dirname}/assets/sfm-12x9-outside.pdf`);
      const inside = Fs.createReadStream(`${__dirname}/assets/sfm-12x9-inside.pdf`);

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: outside,
        inside: inside,
        size: '12x9_bifold',
      }, (err, res) => {
        expect(res.object).to.eql('self_mailer');
        done();
      });
    });

    it('creates a self mailer with a buffer', (done) => {
      const outside = Fs.readFileSync(`${__dirname}/assets/sfm-6x18-outside.pdf`);
      const inside = Fs.readFileSync(`${__dirname}/assets/sfm-6x18-inside.pdf`);

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: outside,
        inside: inside
      }, (err, res) => {
        expect(res.object).to.eql('self_mailer');
        done();
      });
    });

    it('creates a self mailer with a merge variable conditional', (done) => {
      const html = `<html>{{#is_awesome}}You're awesome!{{/is_awesome}}</html>`;

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: html,
        inside: html,
        merge_variables: {
          is_awesome: true
        }
      }, (err, res) => {
        expect(res.object).to.eql('self_mailer');
        expect(res.merge_variables.is_awesome).to.be.true;
        done();
      });
    });

    it('errors with missing outside', (done) => {
      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        inside: '<h1>Test Self Mailer Inside</h1>',
        message: 'This is the message'
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

    it('errors with missing inside', (done) => {
      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: '<h1>Test Self Mailer Outside</h1>'
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

  });

  describe('delete', () => {

    it('deletes a self mailer', (done) => {
      const outside = Fs.readFileSync(`${__dirname}/assets/sfm-6x18-outside.pdf`);
      const inside = Fs.readFileSync(`${__dirname}/assets/sfm-6x18-inside.pdf`);

      Lob.selfMailers.create({
        description: 'Test Self Mailer',
        to: ADDRESS,
        outside: outside,
        inside: inside
      }, (err, res) => {
        Lob.selfMailers.delete(res.id, (err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
