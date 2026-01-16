'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

describe('cardOrders', () => {

  describe('list', () => {

    it('lists card orders given a card id', (done) => {
      const cardId = fixtures.CARD.id;

      mockLob()
        .post('/v1/cards')
        .reply(200, fixtures.CARD);

      mockLob()
        .get(`/v1/cards/${  cardId  }/orders`)
        .query(true)
        .reply(200, fixtures.list([fixtures.CARD_ORDER], 1));

      Lob.cards.create({
        description: 'Test Card',
        front: Buffer.from('test'),
        back: Buffer.from('test'),
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
      const cardId = fixtures.CARD.id;

      mockLob()
        .post('/v1/cards')
        .reply(200, fixtures.CARD);

      mockLob()
        .post(`/v1/cards/${  cardId  }/orders`)
        .reply(200, fixtures.CARD_ORDER);

      Lob.cards.create({
        description: 'Test Card',
        front: Buffer.from('test'),
        back: Buffer.from('test'),
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
