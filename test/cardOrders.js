'use strict';

const Fs = require('fs');
const file = Fs.readFileSync(`${__dirname}/assets/card.pdf`);

describe('cardOrders', () => {

  describe('list', () => {

    it('lists card orders given a card id', (done) => {
      Lob.cards.create({
        description: 'Test Card',
        front: file,
        back: file,
        size: '2.125x3.375'
      }, (err, res) => {
        Lob.cardOrders.list(res.id, null, (err2, res2) => {
          expect(res2.object).to.eql('list');
          done();
        });
      });
    });

  });

  describe('create', () => {

    it('creates a card order', (done) => {
      Lob.cards.create({
        description: 'Test Card',
        front: file,
        back: file,
        size: '2.125x3.375'
      }, (err, res) => {
        const cardOrderParams = {
          quantity: 10000
        };
        Lob.cardOrders.create(res.id, cardOrderParams, (err2, res2) => {
          expect(res2.object).to.eql('card_order');
          done();
        });
      });

    });

  });

});
