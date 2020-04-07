'use strict';

const Fs = require('fs');

const ADDRESS = {
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
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
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

    describe('cursor', () => {

      let token;

      beforeEach(async () => {
        const list = await Lob.letters.list();
        token = new URLSearchParams(list.next_url).get('after');
      });

      it('filters letters by before', async () => {
        const res = await Lob.letters.list({ before: token });

        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
      });

      it('filters letters by after', async () => {
        const res = await Lob.letters.list({ after: token });

        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
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
      const filePath = `${__dirname}/assets/8.5x11.pdf`;

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: Fs.createReadStream(filePath),
        color: true
      }, (err, res) => {
        expect(res.object).to.eql('letter');
        done();
      });
    });

    it('creates a letter with a buffer', (done) => {
      const file = Fs.readFileSync(`${__dirname}/assets/8.5x11.pdf`);

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file,
        color: false
      }, (err, res) => {
        expect(res.object).to.eql('letter');
        done();
      });
    });

    it('creates a letter with undefined optional parameters', (done) => {
      const filePath = `${__dirname}/assets/8.5x11.pdf`;

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: Fs.createReadStream(filePath),
        color: false,
        extra_service: undefined
      }, (err, res) => {
        expect(res.object).to.eql('letter');
        done();
      });

    });

    it('creates a letter with a merge variable object', (done) => {
      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: '<html>{{user.name}}</html>',
        color: false,
        merge_variables: {
          user: {
            name: 'Nathan'
          }
        }
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
      const filePath = `${__dirname}/assets/8.5x11.pdf`;

      Lob.letters.create({
        description: 'Test Letter',
        to: ADDRESS,
        from: ADDRESS,
        file: Fs.createReadStream(filePath),
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
