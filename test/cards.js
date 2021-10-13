'use strict';

const Fs = require('fs');
const file = Fs.readFileSync(`${__dirname}/assets/card.pdf`);

describe('cards', () => {

  describe('list', () => {

    it('returns a list of cards', (done) => {
      Lob.cards.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        done();
      });
    });

    it('filters cards', (done) => {
      Lob.cards.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves a card', (done) => {
      Lob.cards.create({
        description: 'Test Card',
        front: file,
        back: file,
        size: '2.125x3.375',
      }, (err, res) => {
        Lob.cards.retrieve(res.id, () => {
          expect(res.object).to.eql('card');
          done();
        });
      });
    });

  });

  describe('create', () => {

    it('creates a card with a local file', (done) => {
      const filePath = `${__dirname}/assets/card.pdf`;

      Lob.cards.create({
        description: 'Test Card',
        front: Fs.createReadStream(filePath),
        back: Fs.createReadStream(filePath),
        size: '2.125x3.375',
      }, (err, res) => {
        expect(res.object).to.eql('card');
        done();
      });
    });

    it('creates a card with a buffer', (done) => {
      Lob.cards.create({
        description: 'Test Card',
        front: file,
        back: file,
        size: '2.125x3.375',
      }, (err, res) => {
        expect(res.object).to.eql('card');
        done();
      });
    });

    it('creates a card with a url', (done) => {
      const url = 'https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf';

      Lob.cards.create({
        description: 'Test Card',
        front: url,
        back: url,
        size: '2.125x3.375',
      }, (err, res) => {
        expect(res.object).to.eql('card');
        done();
      });
    });

    it('creates a card with only a front', (done) => {
      Lob.cards.create({
        description: 'Test Card',
        front: file,
        size: '2.125x3.375',
      }, (err,res) => {
        expect(res.object).to.eql('card');
        done();
      });
    });
    
    it('errors with missing front', (done) => {
      Lob.cards.create({
        description: 'Test Card',
        back: file,
        size: '2.125x3.375',
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

  });

  describe('delete', () => {

    it('deletes a card', (done) => {
      Lob.cards.create({
        description: 'Test Card',
        front: file,
        back: file,
        size: '2.125x3.375',
      }, (err, res) => {
        Lob.cards.delete(res.id, (err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
