var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var Should;
Should = require('should');
/* jshint camelcase: false */
describe('Objects', function() {
  describe('list', function() {
    it('should have correct defaults', function(done) {
      Lob.objects.list(function(err, res) {
        res.should.have.property('object');
        res.should.have.property('data');
        res.data.should.be.instanceof(Array);
        res.data.length.should.eql(10);
        res.should.have.property('count');
        res.should.have.property('next_url');
        res.next_url.should.eql('https://api.lob.com/' +
        'v1/objects?count=10&offset=10');
        res.should.have.property('previous_url');
        res.object.should.eql('list');
        res.count.should.eql(10);
        return done();
      });
    });
    it('should let you limit the count', function(done) {
       Lob.objects.list(0, 5, function(err, res) {
         res.count.should.eql(5);
         return done();
       });
     });
     it('should let you shift the offset', function(done) {
       Lob.objects.list(0, 10, function(err, res) {
         var object1 = res.data[9].id;
         Lob.objects.list(9, 1, function(err, res) {
           var object2 = res.data[0].id;
           object1.should.eql(object2);
           return done();
         });
       });
     });
  });
  describe('create', function() {
    it('should succeed with default POST request', function(done) {
      var name = 'Test Object';
      var file = 'https://www.lob.com/goblue.pdf';
      var settingId = '100';
      Lob.objects.create({
        name: name,
        file: file,
        setting_id: settingId,
      }, function(err, res) {
        res.should.have.property('id');
        res.should.have.property('name');
        res.name.should.eql(name);
        res.should.have.property('quantity');
        res.quantity.should.eql(1);
        res.should.have.property('full_bleed');
        res.full_bleed.should.eql(0);
        res.should.have.property('double_sided');
        res.double_sided.should.eql(0);
        res.should.have.property('setting');
        res.setting.id.should.eql(settingId);
        res.should.have.property('date_created');
        res.should.have.property('date_modified');
        res.should.have.property('object');
        res.object.should.eql('object');
        return done();
      });
    });
    it('should allow correct overrides', function(done) {
      var name = 'Test Object';
      var file = 'https://www.lob.com/goblue.pdf';
      var settingId = '100';
      var quantity = '2';
      var doubleSided = '1';
      var fullBleed = '0';
      Lob.objects.create({
        name: name,
        file: file,
        setting_id: settingId,
        quantity: quantity,
        double_sided: doubleSided,
        full_bleed: fullBleed
      }, function(err, res) {
        res.should.have.property('id');
        res.should.have.property('name');
        res.name.should.eql(name);
        res.should.have.property('quantity');
        res.quantity.should.eql(quantity);
        res.should.have.property('full_bleed');
        res.full_bleed.should.eql(fullBleed);
        res.should.have.property('double_sided');
        res.double_sided.should.eql(doubleSided);
        res.should.have.property('setting');
        res.setting.id.should.eql(settingId);
        res.should.have.property('date_created');
        res.should.have.property('date_modified');
        res.should.have.property('object');
        res.object.should.eql('object');
        return done();
      });
    });
    it('should succeed using an object local file', function(done) {
      var name = 'Test Object';
      var file = '@' + __dirname + '/assets/8.5x11.pdf';
      var settingId = '100';
      Lob.objects.create({
        name: name,
        file: file,
        setting_id: settingId,
      }, function(err, res) {
        res.should.have.property('id');
        res.should.have.property('name');
        res.name.should.eql(name);
        res.should.have.property('quantity');
        res.quantity.should.eql(1);
        res.should.have.property('full_bleed');
        res.full_bleed.should.eql(0);
        res.should.have.property('double_sided');
        res.double_sided.should.eql(0);
        res.should.have.property('setting');
        res.setting.id.should.eql(settingId);
        res.should.have.property('date_created');
        res.should.have.property('date_modified');
        res.should.have.property('object');
        res.object.should.eql('object');
        return done();
      });
    });
    it('should error when file is not given', function(done) {
      var name = 'Test Object';
      var settingId = '100';
      var quantity = '2';
      var doubleSided = '1';
      var fullBleed = '0';
      Lob.objects.create({
        name: name,
        setting_id: settingId,
        quantity: quantity,
        double_sided: doubleSided,
        full_bleed: fullBleed
      }, function(err, res) {
        err.should.be.instanceof(Array);
        return done();
      });
    });
    it('should error when setting_id is not given', function(done) {
      var name = 'Test Object';
      var file = 'https://www.lob.com/goblue.pdf';
      var quantity = '2';
      var doubleSided = '1';
      var fullBleed = '0';
      Lob.objects.create({
        name: name,
        file: file,
        quantity: quantity,
        double_sided: doubleSided,
        full_bleed: fullBleed
      }, function(err, res) {
        err.should.be.instanceof(Array);
        return done();
      });
    });
    describe('get', function() {
      it('should have correct defaults', function(done) {
        var name = 'Test Object';
        var file = 'https://www.lob.com/goblue.pdf';
        var settingId = '100';
        Lob.objects.create({
          name: name,
          file: file,
          setting_id: settingId,
        }, function(err, res) {
          Lob.objects.get(res.id, function(err2, res2) {
            res.should.eql(res2);
            return done();
          });
        });
      });
      it('should throw an error with an invalid id', function(done) {
        Lob.objects.get('badId', function(err, res) {
          err.should.be.ok;
          return done();
        });
      });
    });
  });
});
/* jshint camelcase: true */
