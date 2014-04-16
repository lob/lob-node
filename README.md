# Lob-node [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]


Node.js wrapper for the [Lob.com](http://Lob.com) API.

## Installation

Lob-node can be installed through the npm:

```
$ npm install Lob
```
To build and install from the latest source:

```
$ git clone git@github.com:hisankaran/Lob-node.git
$ npm install Lob-node/
```

## Getting Started

In order to use the client, you must have an API key. To obtain your key, you need to first create an account at [Lob.com](https://www.semantics3.com/)

You can access your API access credentials from the [Accounts Page](https://www.Lob.com/account)

## Usage

### Initialization and configuration
---

```javascript
var Lob = new (require('Lob')) (Lob_API_KEY);
```
or

```javascript
var Lob = require('Lob');
Lob = new Lob(Lob_API_KEY);
```

or you can even pass as a config object

```javascript
Lob = new Lob({key: Lob_API_KEY});
Lob = new Lob({endpoint: 'https://api.lob.com/v1/', key: Lob_API_KEY});
```

### Single Print Service
---

#### Jobs

List All Jobs with default offset:0, count:0

```javascript
Lob.jobs.list(function(err, data) {
  console.log(err, data);
});
```

List Jobs with offset:10, count:5

```javascript
Lob.jobs.list(10, 5, function(err, res) {
  console.log(err, res);
});
```

Retrieve a particular job JOB_ID = "job_*" (required)

```javascript
Lob.jobs.get("job_f6f4c0c3f6338136", function(err, res) {
  console.log(err, res);
});
```

Creating a job with objects

```javascript
Lob.jobs.create({
  name: "Testing",
  from: "adr_71d64099e6729996",
  to:{
    name: "Harry Zhang",
      email: "harry@Lob.com",
      phone: "5555555555",
      address_line1: "123 Test Street",
      address_line2: "Unit 199",
      address_city: "Mountain View",
      address_state: "CA",
      address_zip: "94085",
      address_country: "US",
  },
  objects: [
    {
      name: "GO BLUE",
      file: "https://www.Lob.com/goblue.pdf",
      setting_id: 100
    },
    "obj_fe40799250bac8f6"
  ]
}, function(err, res) {
  console.log(err, res);
});
```

#### Addresses

List All Addresses with default offset:0, count:0

```javascript
Lob.addresses.list(function(err, res) {
  console.log(err, res);
});
```

List Addreses with offset:10, count:5

```javascript
Lob.addresses.list(10, 5, function(err, res) {
  console.log(err, res);
});
```

Retrieve a particular address ADDRESS_ID = "adr_*" (required)

```javascript
Lob.addresses.get("adr_cda562558b71ff93", function(err, res) {
  console.log(err, res);
});
```

Creating an Address Object

```javascript
Lob.addresses.create({
  name: "Sankaran K",
    email: "mail@sankarank.in",
    phone: "+919731115163",
    address_line1: "123 Test Street",
    address_line2: "Unit 199",
    address_city: "Bangalore",
    address_state: "KA",
    address_zip: "560039",
    address_country: "IN",
}, function(err, res) {
  console.log(err, res);
});
```

Update an Address Object

```javascript
Lob.addresses.update("adr_3b5fe0b76713a6e8", {
  name: "Sankaran Kaliappan",
    email: "mail@sankarank.in",
    phone: "+91 (973)-111 5163",
    address_state: "KARNATAKA",
    address_zip: "560029"
}, function(err, res) {
  console.log(err, res);
});
```

Delete an Address Object

```javascript
Lob.addresses.delete("adr_71d64099e6729996", function(err, res) {
  console.log(err, res);
});
```

Verify an Address

```javascript
Lob.addresses.verify({
  address_line1: "220 William T Morrissey Boulevard",
    address_city: "Boston",
    address_state: "MA",
}, function(err, res) {
  console.log(err, res);
});
```

#### Objects

List All Objects with default offset:0, count:0

```javascript
Lob.objects.list(function(err, res) {
  console.log(err, res);
});
```

List Objects with offset:10, count:5

```javascript
Lob.objects.list(10, 5, function(err, res) {
  console.log(err, res);
});
```

Retrieve a particular object OBJECT_ID = "obj_*" (required)

```javascript
Lob.objects.get("obj_1d1188df1e8d6427", function(err, res) {
  console.log(err, res);
});
```

Creating an Object with local file

```javascript
Lob.objects.create({
    name: "TEST_OBJECT",
    file: "@/home/sankaran/Downloads/goblue.pdf",
    setting_id: 100
}, function(err, res) {
  console.log(err, res);
});
```


Creating an Object with remote file

```javascript
Lob.objects.create({
    name: "TEST_OBJECT",
    file: "https://www.Lob.com/goblue.pdf",
    setting_id: 100
}, function(err, res) {
  console.log(err, res);
});
```

Delete an Object

```javascript
Lob.objects.delete("obj_1d1188df1e8d6427", function(err, res) {
  console.log(err, res);
});
```

#### Settings

List All settings

```javascript
Lob.settings.list(function(err, res) {
  console.log(err, res);
});
```

Retrieve a particular setting by SETTING_ID (required)

```javascript
Lob.settings.get("100", function(err, res) {
  console.log(err, res);
});
```

### Packagings

List All packagings

```javascript
Lob.packagings.list(function(err, res) {
  console.log(err, res);
});
```

Retrieve a particular packaging by PACKAGING_ID (required)

```javascript
Lob.packagings.get("2", function(err, res) {
  console.log(err, res);
});
```

#### Services

List All services

```javascript
Lob.services.list(function(err, res) {
  console.log(err, res);
});
```

Retrieve a particular service by SERVICE_ID (required)

```javascript
Lob.services.get("2", function(err, res) {
  console.log(err, res);
});
```
### Simple Postcard Service
---

#### Postcards

List All Postcards with default offset:0, count:0

```javascript
Lob.postcards.list(function(err, res) {
  console.log(err, res);
});
```

Retrieve a particular postcard by POSTCARD_ID = "psc_*" (required)

```javascript
Lob.postcards.get("psc_056fdd2b4a11a169", function(err, res) {
  console.log(err, res);
});
```

Creating PostCard with local file

```javascript
Lob.postcards.create({
    name: "TEST_POSTCARD",
    to: "adr_3b5fe0b76713a6e8",
    front: "@/home/sankaran/Downloads/postcardfront.pdf",
    back: "@/home/sankaran/Downloads/postcardback.pdf"
}, function(err, res) {
  console.log(err, res);
});
```

Creating an PostCard with remote file

```javascript
Lob.postcards.create({
    name: "TEST_POSTCARD",
    to: "adr_3b5fe0b76713a6e8",
    front: "https://www.Lob.com/postcardfront.pdf",
    back: "https://www.Lob.com/postcardback.pdf"
}, function(err, res) {
  console.log(err, res);
});
```

Creating an PostCard with local, remote file

```javascript
Lob.postcards.create({
    name: "TEST_POSTCARD",
    to: "adr_3b5fe0b76713a6e8",
    front: "@/home/sankaran/Downloads/postcardfront.pdf",
    back: "https://www.Lob.com/postcardback.pdf"
}, function(err, res) {
  console.log(err, res);
});
```

### Simple Check Service
---

#### Checks

List All Checks with default offset:0, count:0

```javascript
Lob.checks.list(function(err, res) {
  console.log(err, res);
});
```

Retrieve a particular check by CHECK_ID = "chk_*" (required)

```javascript
Lob.checks.get("psc_056fdd2b4a11a169", function(err, res) {
  console.log(err, res);
});
```

Creating Check

```javascript
Lob.checks.create({
    name: "TEST_CHECK",
    check_number: "000000",
    bank_account: "bank_7a88fa3abe5e2da",
    to: "adr_3b5fe0b76713a6e8",
    amount: 100,
    memo: "testing"
}, function(err, res) {
  console.log(err, res);
});
```

#### Bank Accounts

List All Accounts with default offset:0, count:0

```javascript
Lob.bankAccounts.list(function(err, res) {
  console.log(err, res);
});
```

Retrieve a particular Account by ACCOUNT_ID = "bank_*" (required)

```javascript
Lob.bankAccounts.get("bank_7a88fa3abe5e2da", function(err, res) {
  console.log(err, res);
});
```

Creating a Bank Account

```javascript
Lob.bankAccounts.create({
    routing_number: 123456789,
    account_number: 123456789,
    bank_code: 123456789,
    bank_address: {
      name: "Chase Bank",
      address_line1: "55 Edmonds",
      address_city: "Palo Alto",
      address_state: "CA",
      address_zip: "90081",
      address_country: "US"
    },
    account_address: {
      name: "Leore Avidar",
      address_line1: "123 Test Street",
      address_city: "Sunnyvale",
      address_state: "CA",
      address_zip: "94085",
      address_country: "US"
    }
}, function(err, res) {
  console.log(err, res);
});
```

### Utils
---

#### Address Verification

Verify an Address

```javascript
Lob.utils.verify({
  address_line1: "220 William T Morrissey Boulevard",
    address_city: "Boston",
    address_state: "MA",
}, function(err, res) {
  console.log(err, res);
});
```

### List of Countries

Get list of Countries
[npm-url]: https://npmjs.org/package/Lob
[npm-image]: https://badge.fury.io/js/Lob.svg
[travis-url]: https://travis-ci.org/Lob/Lob-node
[travis-image]: https://travis-ci.org/Lob/Lob-node.svg?branch=master
[depstat-url]: https://david-dm.org/Lob/Lob-node
[depstat-image]: https://david-dm.org/Lob/Lob-node.svg

```javascript
Lob.utils.countries(function(err, res) {
  console.log(err, res);
});
```
