'use strict';

// Create a card order for an existing card

const fs = require('fs');

const lobFactory = require('../lib/index.js');
const Lob = new lobFactory('YOUR_API_KEY'); // Replace YOUR_API_KEY with your own API key

const cardId = 'YOUR_CARD_ID'; // Replace YOUR_CARD_ID with the Card ID you'd like to place an order for

Lob.cardOrders.create(cardId, {
  'quantity': 10000
}, (err, cardOrder) => {
  if (err) {
    console.log(err);
  } else {
    console.log('The Lob API responded with this cardOrder object: ', cardOrder);
  }
  
});