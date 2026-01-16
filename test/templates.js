'use strict';

const mockLob = mocks.mockLob;
const fixtures = mocks.fixtures;

const EXAMPLE_TEMPLATE = {
  html: '<html><body><h1>Hello World</h1></body></html>',
  description: 'My New Template'
};

describe('templates', () => {

  describe('list', () => {

    it('returns a list of saved templates', (done) => {
      mockLob()
        .get('/v1/templates')
        .query(true)
        .reply(200, fixtures.list([fixtures.TEMPLATE], 1));

      Lob.templates.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        return done();
      });
    });

    it('filters templates', (done) => {
      mockLob()
        .get('/v1/templates')
        .query({ limit: 1 })
        .reply(200, fixtures.list([fixtures.TEMPLATE], 1));

      Lob.templates.list({ limit: 1 }, (err, res) => {
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        return done();
      });
    });

  });

  describe('create', () => {

    it('creates a new template', (done) => {
      const templateResponse = fixtures.clone(fixtures.TEMPLATE, {
        description: EXAMPLE_TEMPLATE.description
      });

      mockLob()
        .post('/v1/templates')
        .reply(200, templateResponse);

      Lob.templates.create(EXAMPLE_TEMPLATE, (err, res) => {
        expect(res.object).to.eql('template');
        expect(res.description).to.eql(EXAMPLE_TEMPLATE.description);
        return done();
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves a template', (done) => {
      const templateId = fixtures.TEMPLATE.id;
      const templateResponse = fixtures.clone(fixtures.TEMPLATE, {
        description: EXAMPLE_TEMPLATE.description,
        published_version: {}
      });

      mockLob()
        .post('/v1/templates')
        .reply(200, templateResponse);

      mockLob()
        .get(`/v1/templates/${  templateId}`)
        .reply(200, templateResponse);

      Lob.templates.create(EXAMPLE_TEMPLATE, (_err, res) => {
        Lob.templates.retrieve(res.id, (_err2, res2) => {
          expect(res2.description).to.eql(EXAMPLE_TEMPLATE.description);
          expect(res2.id).to.eql(res.id);
          expect(res2.object).to.eql('template');
          expect(res2.published_version).to.be.instanceof(Object);
          return done();
        });
      });
    });

  });

  describe('delete', () => {

    it('deletes a template', (done) => {
      const templateId = fixtures.TEMPLATE.id;

      mockLob()
        .post('/v1/templates')
        .reply(200, fixtures.TEMPLATE);

      mockLob()
        .delete(`/v1/templates/${  templateId}`)
        .reply(200, fixtures.deleted(templateId));

      Lob.templates.create(EXAMPLE_TEMPLATE, (_err, res) => {
        Lob.templates.delete(res.id, (_err2, res2) => {
          expect(res2.deleted).to.eql(true);
          expect(res2.id).to.eql(res.id);
          return done();
        });
      });
    });

  });

});
