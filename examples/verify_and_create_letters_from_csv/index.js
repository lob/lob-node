'use strict';

var converter = require('json-2-csv');
var fs       = require('fs');
var moment   = require('moment');
var parse    = require('csv-parse');

var LobFactory = require('../../lib/index.js');
var Lob        = new LobFactory('test_fd34e1b5ea86a597ec89f7f2e46940c874d');

var inputFile = fs.createReadStream(__dirname + '/input.csv');
var successFd = fs.openSync(__dirname + '/success.csv', 'w');
var errorFd = fs.openSync(__dirname + '/error.csv', 'w');
var letterTemplate = fs.readFileSync(__dirname + '/letter_template.html').toString();

var companyInfo = {
  name: 'Deluxe Virgina Realty',
  address_line1: '185 Berry St.',
  address_line2: 'Ste 170',
  address_city: 'San Francsisco',
  address_state: 'CA',
  address_zip: 94107,
  address_country: 'US'
};

var parser = parse({ columns: true }, function (err, data) {
  if (err) {
    return console.log(err);
  }

  data.forEach(function (client) {

    var name = client.name;
    var amount = parseFloat(client.amount).toFixed(2);
    var address = {
      address_line1: client.address1,
      address_line2: client.address2,
      address_city: client.city,
      address_state: client.state,
      address_zip: client.zip,
      address_country: 'US'
    };

    Lob.verification.verify(address)
    .then(function (verifiedAddress) {
      return Lob.letters.create({
        description: 'Automated Past Due Bill for ' + name,
        to: {
          name: name,
          address_line1: verifiedAddress.address.address_line1,
          address_line2: verifiedAddress.address.address_line12,
          address_city: verifiedAddress.address.address_city,
          address_state: verifiedAddress.address.address_state,
          address_zip: verifiedAddress.address.address_zip,
          address_country: 'US'
        },
        from: companyInfo,
        file: letterTemplate,
        data: {
          date: moment().format('LL'),
          name: name,
          amountDue: amount
        },
        color: true
      });
    })
    .then(function (letter) {
      console.log('Successfully sent a letter to ' +  client.name);
      client.letter_id = letter.id;
      client.letter_url = letter.url;
      converter.json2csv(client, function (err, csv) {
        if (err) {
          throw err;
        }
        fs.write(successFd, csv);
      }, { PREPEND_HEADER: false });
    })
    .catch(function () {
      console.log('Could not send letter to ' +  client.name);
      converter.json2csv(client, function (err, csv) {
        if (err) {
          throw err;
        }
        fs.write(errorFd, csv);
      }, { PREPEND_HEADER: false });
    });
  });

});

inputFile.pipe(parser);
