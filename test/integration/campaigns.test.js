'use strict';

describe('Integration: Campaigns (Live Key Required)', function () {

  this.timeout(INTEGRATION_TIMEOUT);

  let createdCampaignId;

  before(function () {
    if (!HAS_LIVE_KEY) {
      this.skip();
    }
  });

  describe('create', () => {

    it('creates a campaign', (done) => {
      LiveLob.campaigns.create({
        name: 'Integration Test Campaign',
        schedule_type: 'immediate'
      }, (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.property('id');
        expect(res.id).to.match(/^cmp_/);
        expect(res.name).to.eql('Integration Test Campaign');
        createdCampaignId = res.id;
        done();
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves a created campaign', function (done) {
      if (!createdCampaignId) {
        return this.skip();
      }
      LiveLob.campaigns.retrieve(createdCampaignId, (err, res) => {
        expect(err).to.not.exist;
        expect(res.id).to.eql(createdCampaignId);
        done();
      });
    });

  });

  describe('list', () => {

    it('returns a list of campaigns', (done) => {
      LiveLob.campaigns.list({ limit: 5 }, (err, res) => {
        expect(err).to.not.exist;
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        done();
      });
    });

  });

  describe('delete', () => {

    it('deletes a created campaign', function (done) {
      if (!createdCampaignId) {
        return this.skip();
      }
      LiveLob.campaigns.delete(createdCampaignId, (err, res) => {
        expect(err).to.not.exist;
        expect(res.id).to.eql(createdCampaignId);
        expect(res.deleted).to.eql(true);
        done();
      });
    });

  });

});
