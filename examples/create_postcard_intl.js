"use strict";

/*
 * Create an international address, then send a postcard with a custom PDF back.
 * Run me! This example works out of the box, "batteries included".
 */

const fs = require("fs");

const lobFactory = require("../lib/index.js");
const Lob = new lobFactory("YOUR_API_KEY");

const file = fs.readFileSync(`${__dirname}/html/card.html`).toString();

// Create the from address
async function getFrom() {
  const from_address = await Lob.addresses.create({
    name: "Harry Zhang",
    email: "harry@lob.com",
    phone: "5555555555",
    address_line1: "2261 MARKET ST",
    address_line2: "",
    address_city: "SAN FRANCISCO",
    address_state: "CA",
    address_zip: "94114",
  });

  return from_address.id;
}

async function createPostcard() {
  const from_id = await getFrom();

  // Create the address
  Lob.addresses.create(
    {
      name: "Harry Zhang",
      email: "harry@lob.com",
      phone: "5555555555",
      address_line1: "370 WATER ST",
      address_line2: "",
      address_city: "SUMMERSIDE",
      address_state: "PRINCE EDWARD ISLAND",
      address_zip: "C1N 1C4",
      address_country: "CA",
    },
    (err, address) => {
      if (err) {
        console.log(err);
      } else {
        Lob.postcards.create(
          {
            description: "My Second Postcard",
            to: address.id,
            from: from_id,
            front: file,
            back: file,
            merge_variables: {
              name: "Robin",
            },
          },
          (err, postcard) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                "The Lob API responded with this postcard object: ",
                postcard
              );
            }
          }
        );
      }
    }
  );
}

createPostcard();
