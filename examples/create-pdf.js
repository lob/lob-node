var fs         = require('fs');
var lobFactory = require('../lib/index.js');
var Lob        = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var pdfkit     = require('pdfkit');

var POINTS_PER_INCH = 72; // 72 PostScript Points per Inch

function createPostcardFront (done) {
  var pdf = new pdfkit({
    size: [POINTS_PER_INCH * 6.25, POINTS_PER_INCH * 4.25],
    margin: 0
  });

  var frontStream = fs.createWriteStream('/tmp/lob_postcard_front.pdf');
  frontStream.on('close', function () {
    var pdfBuffer = fs.readFileSync('/tmp/lob_postcard_front.pdf');
    fs.unlinkSync('/tmp/lob_postcard_front.pdf');
    done(pdfBuffer);
  });

  pdf.pipe(frontStream);

  pdf.image(__dirname + '/../test/assets/logo.jpg', 75, 20, {
    width: 300
  });

  pdf
    .fontSize(54)
    .fillColor('blue')
    .text('Go Blue!', 125, 225);

  pdf.save().end();
};

function createPostcard (done) {
  createPostcardFront(function (res) {
    Lob.postcards.create({
      description: 'Test Postcard',
      to: 'adr_0f79b269e7d49f7d',
      front: res,
      message: 'Enjoy your postcard from Lob!'
    }, function (err, res) {
      done(res);
    });
  });
}

createPostcard(function (res) {
  console.log('View your created PDF here: ' + res.url);
});
