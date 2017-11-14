'use strict';

const Fs = require('fs');

const AREA = {
  description: 'Test Area',
  routes: ['94158-C001', '94107-C031'],
  front: '<h1>Test Area Front</h1>',
  back: '<h1>Test Area Back</h1>',
  target_type: 'residential'
};

describe('areas', () => {

  describe('list', () => {

    it('returns a list of areas', (done) => {
      Lob.areas.list((err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(10);
        expect(res.count).to.eql(10);
        done();
      });
    });

    it('filters areas', (done) => {
      Lob.areas.list({ limit: 1 }, (err, res) => {
        expect(res.object).to.eql('list');
        expect(res.data).to.be.instanceof(Array);
        expect(res.data.length).to.eql(1);
        expect(res.count).to.eql(1);
        done();
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves an area', (done) => {
      Lob.areas.create(AREA, (err, res) => {
        Lob.areas.retrieve(res.id, (err, res) => {
          expect(res.object).to.eql('area');
          done();
        });
      });
    });

  });

  describe('create', () => {

    it('creates an area', (done) => {
      Lob.areas.create(AREA, (err, res) => {
        expect(res.object).to.eql('area');
        done();
      });
    });

    it('creates an area from a local file', (done) => {
      const filePath = `${__dirname}/assets/areaback.pdf`;
      Lob.areas.create({
        description: 'Test Area',
        routes: ['94158-C001', '94107-C031'],
        front: Fs.createReadStream(filePath),
        back: Fs.createReadStream(filePath)
      }, (err, res) => {
        expect(res.object).to.eql('area');
        done();
      });
    });

    it('creates an area from a buffer', (done) => {
      Fs.readFile(`${__dirname}/assets/areaback.pdf`, (err, file) => {
        Lob.areas.create({
          description: 'Test Area',
          routes: ['94158-C001'],
          front: file,
          back: file
        }, (err, res) => {
          expect(res.object).to.eql('area');
          done();
        });
      });
    });

    it('errors if front is missing', (done) => {
      Lob.areas.create({
        description: 'Test Area',
        routes: ['94158-C001', '94107-C031'],
        back: '<h1>Test Area Back</h1>',
        target_type: 'residential'
      }, (err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('errors if back is missing', (done) => {
      Lob.areas.create({
        description: 'Test Area',
        routes: ['94158-C001', '94107-C031'],
        front: '<h1>Test Area Front</h1>',
        target_type: 'residential'
      }, (err) => {
        expect(err).to.exist;
        done();
      });
    });

  });

});
