'use strict';

const CAMPAIGN = {
  name: 'My test campaign',
  description: 'Created via lob-node SDK',
  schedule_type: 'immediate'
};

describe('campaigns', () => {

  describe('list', () => {

    it('returns a list of campaigns', (done) => {
      Lob.campaigns.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        return done();
      });
    });

    it('filters campaigns', (done) => {
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

    let campaign;

    afterEach(async () => {
      await Lob.campaigns.delete(campaign.id);
    });

    it('creates a campaign', (done) => {
      Lob.campaigns.create(CAMPAIGN, (err, res) => {
        campaign = res;
        expect(res).to.have.property('id');
        expect(res.name).to.eql(CAMPAIGN.name);
        expect(res.description).to.eql(CAMPAIGN.description);
        expect(res.schedule_type).to.eql(CAMPAIGN.schedule_type);
        return done();
      });
    });

  });

  describe('retrieve', () => {

    let campaign;

    beforeEach(async () => {
      campaign = await Lob.campaigns.create(CAMPAIGN);
    });

    afterEach(async () => {
      await Lob.campaigns.delete(campaign.id);
    });

    it('retrieves a campaign', (done) => {
      Lob.campaigns.retrieve(campaign.id, (err, res) => {
        expect(res).to.include(CAMPAIGN);
        return done();
      });
    });

  });

  describe('delete', () => {

    let campaign;

    beforeEach(async () => {
      campaign = await Lob.campaigns.create(CAMPAIGN);
    });

    it('deletes a campaign', (done) => {
      Lob.campaigns.delete(campaign.id, (err, res) => {
        expect(res.deleted).to.eql(true);
        return done();
      });
    });

  });

});
