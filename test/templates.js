'use strict';

const { expect } = require('chai');

const EXAMPLE_TEMPLATE = {
  html: '<html><body><h1>Hello World</h1></body></html>',
  description: 'My New Template'
};
describe('templates', () => {

  describe('list', () => {
    it('returns a list of saved templates', (done) => {
      Lob.templates.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.be.at.most(10);
        expect(res.count).to.be.at.most(10);
        return done();
      });
    });

    it('filters templates', (done) => {
      Lob.templates.list({ limit: 1 }, (err, res) => {
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        return done();
      });
    });
  });

  describe('create', ()  => {
    it('creates a new template', (done) => {
      Lob.templates.create(EXAMPLE_TEMPLATE, (err, res) => {
        expect(res.object).to.eql('template');
        expect(res.description).to.eql(EXAMPLE_TEMPLATE.description);
        return done();
      });
    });
  });

  describe('retrieve', () => {
    it('retrieves a template', (done) => {
      Lob.templates.create(EXAMPLE_TEMPLATE, (err, res) => {
        Lob.templates.retrieve(res.id, (err, res2) => {
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
      Lob.templates.create(EXAMPLE_TEMPLATE, (err, res) => {
        Lob.templates.delete(res.id, (err, res2) => {
          expect(res2.deleted).to.eql(true);
          expect(res2.id).to.eql(res.id);
          return done();
        });
      });
    });
  });

});
