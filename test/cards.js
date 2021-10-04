'use strict';

const Fs = require('fs');
const file = Fs.readFileSync(`${__dirname}/assets/card_horizontal_2_125x3_375.pdf`);

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

    // describe('cursor', () => {

    //   let token;

    //   beforeEach(async () => {
    //     const list = await Lob.cards.list();
    //     token = new URLSearchParams(list.next_url).get('after');
    //   });

    //   it('filters cards by before', async () => {
    //     const res = await Lob.cards.list({ before: token });

    //     expect(res.object).to.eql('list');
    //     expect(res.data).to.be.instanceof(Array);
    //   });

    //   it('filters cards by after', async () => {
    //     const res = await Lob.cards.list({ after: token });

    //     expect(res.object).to.eql('list');
    //     expect(res.data).to.be.instanceof(Array);
    //   });

    // });

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
      const filePath = `${__dirname}/assets/card_horizontal_2_125x3_375.pdf`;

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
    
    it('errors with missing front', (done) => {
      Lob.cards.create({
        description: 'Test Card',
        back: file,
        message: 'This is the message',
        size: '2.125x3.375',
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

    it('errors with missing back', (done) => {
      Lob.cards.create({
        description: 'Test Card',
        front: file,
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
