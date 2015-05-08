'use strict';

var parse = require('csv-parse');
var fs    = require('fs');

var lobFactory = require('../../lib/index.js');
var Lob        = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var input      = fs.readFileSync(__dirname + '/input.csv', { encoding: 'utf-8' });
var frontHtml  = fs.readFileSync(__dirname + '/postcard_front.html', { encoding: 'utf-8' });
var backHtml   = fs.readFileSync(__dirname + '/postcard_back.html', { encoding: 'utf-8' });

parse(input, function (err, rows) {
  if (err) {
    return console.log(err);
  }
  for (var i = 0, l = rows.length; i < l; i++) {
    var row = rows[i];
    Lob.postcards.create({
      to: {
        name: row[5],
        address_line1: row[6],
        address_line2: row[7],
        address_city: row[8],
        address_state: row[9],
        address_zip: row[10],
        address_country: row[11]
      },
      from: {
        name: 'Lob',
        address_line1: '123 Main Street',
        address_city: 'San Francisco',
        address_state: 'CA',
        address_zip: '94185',
        address_country: 'US'
      },
      setting: 1002,
      front: frontHtml,
      back: backHtml,
      data: {
        background_image: row[1],
        background_color: row[2],
        name: row[0],
        car: row[3],
        mileage: row[4]
      }
    }, function (err, postcard) {
      if (err) {
        return console.log(err);
      }
      console.log('Postcard to ' + postcard.to.name + ' sent! View it here: ' + postcard.url);
    })
  }
});
