'use strict';

const bluebird = require('bluebird');
const parse    = require('csv-parse');
const fs       = require('fs');

const lobFactory = require('../../lib/index.js');
const Lob        = new lobFactory('YOUR_API_KEY');
const input      = fs.readFileSync(`${__dirname}/input.csv`, { encoding: 'utf-8' });
const frontHtml  = fs.readFileSync(`${__dirname}/postcard_front.html`, { encoding: 'utf-8' });
const backHtml   = fs.readFileSync(`${__dirname}/postcard_back.html`, { encoding: 'utf-8' });

const CONCURRENCY = 5;

parse(input, (err, rows) => {
  if (err) {
    return console.log(err);
  }
  bluebird.map(rows, (row) => {
    return Lob.postcards.create({
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
      size: '4x6',
      front: frontHtml,
      back: backHtml,
      merge_variables: {
        background_image: row[1],
        background_color: row[2],
        name: row[0],
        car: row[3],
        mileage: row[4]
      },
      metadata: {
        name: row[0],
        campaign_id: 'campaign_234'
      }
    }, (err, postcard) => {
      if (err) {
        return console.log(err);
      }
      console.log(`Postcard to ${postcard.to.name} sent! View it here: ${postcard.url}`);
    });
  }, { concurrency: CONCURRENCY });
});
