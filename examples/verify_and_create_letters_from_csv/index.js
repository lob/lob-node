'use strict';

var converter = require('json-2-csv');
var fs       = require('fs');
var moment   = require('moment');
var parse    = require('csv-parse');

var LobFactory = require('../../lib/index.js');
var Lob        = new LobFactory('YOUR_API_KEY');

var inputFile = fs.createReadStream(__dirname + '/input.csv');
var successFd = fs.openSync(__dirname + '/success.csv', 'w');
var errorFd = fs.openSync(__dirname + '/error.csv', 'w');
var letterTemplate = fs.readFileSync(__dirname + '/letter_template.html').toString();

var companyInfo = {
  name: 'Deluxe Virgina Realty',
  address_line1: '185 Berry St.',
  address_line2: 'Ste 170',
  address_city: 'San Francisco',
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
      recipient: name,
      primary_line: client.primary_line,
      secondary_line: client.secondary_line,
      city: client.city,
      state: client.state,
      zip_code: client.zip_code
    };

    Lob.usVerifications.verify(address)
    .then(function (verifiedAddress) {
      return Lob.letters.create({
        description: 'Automated Past Due Bill for ' + name,
        to: {
          name: verifiedAddress.recipient,
          address_line1: verifiedAddress.primary_line,
          address_line2: verifiedAddress.secondary_line,
          address_city: verifiedAddress.components.city,
          address_state: verifiedAddress.components.state,
          address_zip: verifiedAddress.components.zip_code,
          address_country: 'US'
        },
        from: companyInfo,
        file: letterTemplate,
        merge_variables: {
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
