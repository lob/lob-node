'use strict';

const converter = require('json-2-csv');
const fs        = require('fs');
const moment    = require('moment');
const { parse } = require('csv-parse');

const LobFactory = require('../../lib/index.js');
const lob        = new LobFactory('YOUR_API_KEY');

const successFd = fs.openSync(`${__dirname}/success.csv`, 'w');
const errorFd = fs.openSync(`${__dirname}/error.csv`, 'w');
const letterTemplate = fs.readFileSync(`${__dirname}/letter_template.html`).toString();

const companyInfo = {
  name: 'Deluxe Virgina Realty',
  address_line1: '185 Berry St.',
  address_line2: 'Ste 170',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: 94107,
  address_country: 'US'
};

const parser = fs.createReadStream(`${__dirname}/input.csv`).pipe(parse({ columns: true }));

parser.on('data', (client) => {

  const name = client.name;
  const amount = parseFloat(client.amount).toFixed(2);
  const address = {
    recipient: name,
    primary_line: client.primary_line,
    secondary_line: client.secondary_line,
    city: client.city,
    state: client.state,
    zip_code: client.zip_code
  };

  lob.usVerifications.verify(address)
    .then((verifiedAddress) => {
      return lob.letters.create({
        description: `Automated Past Due Bill for ${name}`,
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
          name,
          amountDue: amount
        },
        color: true
      });
    })
    .then((letter) => {
      console.log(`Successfully sent a letter to ${client.name}`);
      client.letter_id = letter.id;
      client.letter_url = letter.url;
      converter.json2csv(client, { prependHeader: false })
        .then((csv) => fs.writeSync(successFd, `${csv  }\n`))
        .catch((err2) => {
          console.error('Error writing to success file:', err2);
        });
    })
    .catch(() => {
      console.log(`Could not send letter to ${client.name}`);
      converter.json2csv(client, { prependHeader: false })
        .then((csv) => fs.writeSync(errorFd, `${csv  }\n`))
        .catch((err2) => {
          console.error('Error writing to error file:', err2);
        });
    });
});

parser.on('error', (err) => {
  console.error('CSV parse error:', err);
});
