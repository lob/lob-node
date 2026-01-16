'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

describe('cards', () => {

  describe('list', () => {

    it('returns a list of cards', (done) => {
      mockLob()
        .get('/v1/cards')
        .query(true)
        .reply(200, fixtures.list([fixtures.CARD], 1));

      Lob.cards.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        done();
      });
    });

    it('filters cards', (done) => {
      mockLob()
        .get('/v1/cards')
        .query({ limit: 1 })
        .reply(200, fixtures.list([fixtures.CARD], 1));

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
      const cardId = fixtures.CARD.id;

      mockLob()
        .post('/v1/cards')
        .reply(200, fixtures.CARD);

      mockLob()
        .get(`/v1/cards/${  cardId}`)
        .reply(200, fixtures.CARD);

      Lob.cards.create({
        description: 'Test Card',
        front: Buffer.from('test'),
        back: Buffer.from('test'),
        size: '2.125x3.375'
      }, (err, res) => {
        Lob.cards.retrieve(res.id, () => {
          expect(res.object).to.eql('card');
          done();
        });
      });
    });

  });

  describe('update', () => {

    it('updates a card', (done) => {
      const cardId = fixtures.CARD.id;
      const updatedCard = fixtures.clone(fixtures.CARD, { description: 'Test Card Updated Desc' });

      mockLob()
        .post('/v1/cards')
        .reply(200, fixtures.CARD);

      mockLob()
        .post(`/v1/cards/${  cardId}`)
        .reply(200, updatedCard);

      Lob.cards.create({
        description: 'Test Card',
        front: Buffer.from('test'),
        back: Buffer.from('test'),
        size: '2.125x3.375'
      }, (err, res) => {
        Lob.cards.update(res.id, { description: 'Test Card Updated Desc' }, (err2, res2) => {
          expect(res2.object).to.eql('card');
          expect(res2.description).to.eql('Test Card Updated Desc');
          done();
        });
      });
    });

  });

  describe('create', () => {

    it('creates a card with a local file', (done) => {
      mockLob()
        .post('/v1/cards')
        .reply(200, fixtures.CARD);

      Lob.cards.create({
        description: 'Test Card',
        front: '<h1>Test Front</h1>',
        back: '<h1>Test Back</h1>',
        size: '2.125x3.375'
      }, (err, res) => {
        expect(res.object).to.eql('card');
        done();
      });
    });

    it('creates a card with a buffer', (done) => {
      mockLob()
        .post('/v1/cards')
        .reply(200, fixtures.CARD);

      Lob.cards.create({
        description: 'Test Card',
        front: Buffer.from('test'),
        back: Buffer.from('test'),
        size: '2.125x3.375'
      }, (err, res) => {
        expect(res.object).to.eql('card');
        done();
      });
    });

    it('creates a card with a url', (done) => {
      mockLob()
        .post('/v1/cards')
        .reply(200, fixtures.CARD);

      Lob.cards.create({
        description: 'Test Card',
        front: 'https://example.com/card.pdf',
        back: 'https://example.com/card.pdf',
        size: '2.125x3.375'
      }, (err, res) => {
        expect(res.object).to.eql('card');
        done();
      });
    });

    it('creates a card with only a front', (done) => {
      mockLob()
        .post('/v1/cards')
        .reply(200, fixtures.CARD);

      Lob.cards.create({
        description: 'Test Card',
        front: Buffer.from('test'),
        size: '2.125x3.375'
      }, (err, res) => {
        expect(res.object).to.eql('card');
        done();
      });
    });

    it('errors with missing front', (done) => {
      mockLob()
        .post('/v1/cards')
        .reply(422, fixtures.error('front is required', 422));

      Lob.cards.create({
        description: 'Test Card',
        back: Buffer.from('test'),
        size: '2.125x3.375'
      }, (err) => {
        expect(err).to.be.an.instanceOf(Object);
        done();
      });
    });

  });

  describe('delete', () => {

    it('deletes a card', (done) => {
      const cardId = fixtures.CARD.id;

      mockLob()
        .post('/v1/cards')
        .reply(200, fixtures.CARD);

      mockLob()
        .delete(`/v1/cards/${  cardId}`)
        .reply(200, fixtures.deleted(cardId));

      Lob.cards.create({
        description: 'Test Card',
        front: Buffer.from('test'),
        back: Buffer.from('test'),
        size: '2.125x3.375'
      }, (err, res) => {
        Lob.cards.delete(res.id, (err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
