'use strict';

const ResourceBase = require('./resourceBase');

class CardOrders extends ResourceBase {

  constructor (config) {
    super('cards', config);
  }

  list (cardId, params, callback) {
    return this._transmit('GET', `${encodeURIComponent(cardId)}/orders`, null, params, null, callback);
  }

  create (cardId, params, headers, callback) {
    return this._transmit('POST', `${encodeURIComponent(cardId)}/orders`, null, params, headers, callback);
  }

}

module.exports = CardOrders;
