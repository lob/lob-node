'use strict';

// Create a horizontal 2.125x3.375 card with a custom PDF front and back

const fs = require('fs');

const lobFactory = require('../lib/index.js');
const Lob = new lobFactory('YOUR_API_KEY'); // Replace YOUR_API_KEY with your own API key

const frontFile = fs.readFileSync(`${__dirname}/cards/card.pdf`) // Replace with your own custom PDF front
const backFile = fs.readFileSync(`${__dirname}/cards/card.pdf`) // Replace with your own custom PDF back

Lob.cards.create({
  description: 'My Card',
  front: frontFile,
  back: backFile,
  size: '2.125x3.375'
}, (err, card) => {
  if (err) {
    console.log(err);
  } else {
    console.log('The Lob API responded with this card object: ', card);
  }
  
});