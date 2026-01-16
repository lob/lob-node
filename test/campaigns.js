'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

const CAMPAIGN_INPUT = {
  name: 'My test campaign',
  description: 'Created via lob-node SDK',
  schedule_type: 'immediate'
};

describe('campaigns', () => {

  describe('list', () => {

    it('returns a list of campaigns', (done) => {
      mockLob()
        .get('/v1/campaigns')
        .query(true)
        .reply(200, fixtures.list([fixtures.CAMPAIGN], 1));

      Lob.campaigns.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        return done();
      });
    });

    it('filters campaigns', (done) => {
      mockLob()
        .get('/v1/campaigns')
        .query({ limit: 1 })
        .reply(200, fixtures.list([fixtures.CAMPAIGN], 1));

      Lob.campaigns.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        return done();
      });
    });

  });

  describe('create', () => {

    it('creates a campaign', (done) => {
      const campaignResponse = fixtures.clone(fixtures.CAMPAIGN, CAMPAIGN_INPUT);

      mockLob()
        .post('/v1/campaigns')
        .reply(200, campaignResponse);

      Lob.campaigns.create(CAMPAIGN_INPUT, (err, res) => {
        expect(res).to.have.property('id');
        expect(res.name).to.eql(CAMPAIGN_INPUT.name);
        expect(res.description).to.eql(CAMPAIGN_INPUT.description);
        expect(res.schedule_type).to.eql(CAMPAIGN_INPUT.schedule_type);
        return done();
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves a campaign', (done) => {
      const campaignId = fixtures.CAMPAIGN.id;
      const campaignResponse = fixtures.clone(fixtures.CAMPAIGN, CAMPAIGN_INPUT);

      mockLob()
        .post('/v1/campaigns')
        .reply(200, campaignResponse);

      mockLob()
        .get(`/v1/campaigns/${  campaignId}`)
        .reply(200, campaignResponse);

      Lob.campaigns.create(CAMPAIGN_INPUT, (_err, res) => {
        Lob.campaigns.retrieve(res.id, (_err2, res2) => {
          expect(res2.name).to.eql(CAMPAIGN_INPUT.name);
          expect(res2.description).to.eql(CAMPAIGN_INPUT.description);
          expect(res2.schedule_type).to.eql(CAMPAIGN_INPUT.schedule_type);
          return done();
        });
      });
    });

  });

  describe('delete', () => {

    it('deletes a campaign', (done) => {
      const campaignId = fixtures.CAMPAIGN.id;

      mockLob()
        .post('/v1/campaigns')
        .reply(200, fixtures.CAMPAIGN);

      mockLob()
        .delete(`/v1/campaigns/${  campaignId}`)
        .reply(200, fixtures.deleted(campaignId));

      Lob.campaigns.create(CAMPAIGN_INPUT, (_err, res) => {
        Lob.campaigns.delete(res.id, (_err2, res2) => {
          expect(res2.deleted).to.eql(true);
          return done();
        });
      });
    });

  });

});
