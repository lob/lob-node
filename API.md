#API Reference
- [`Lob.jobs`](#Lob-jobs)
  - [`Lob.jobs.retrieve(String id, Function done)`](#Lob-jobs-retrieve)
  - [`Lob.jobs.list(Object options, Function done)`](#Lob-jobs-list)
  - [`Lob.jobs.create(Object params, Function done)`](#Lob-jobs-create)
- [`Lob.addresses`](#Lob-addresses)
  - [`Lob.addresses.retrieve(String id, Function done)`](#Lob-addresses-retrieve)
  - [`Lob.addresses.delete(String id, Function done)`](#Lob-addresses-delete)
  - [`Lob.addresses.list(Object options, Function done)`](#Lob-addresses-list)
  - [`Lob.addresses.create(Object params, Function done)`](#Lob-addresses-create)
- [`Lob.verification`](#Lob-verification)
  - [`Lob.verification.verify(Object params, Function done)`](#Lob-verification-verify)
- [`Lob.states`](#Lob-states)
  - [`Lob.states.list(Object options, Function done)`](#Lob-states-list)
- [`Lob.countries`](#Lob-countries)
  - [`Lob.countries.list(Object options, Function done)`](#Lob-countries-list)
- [`Lob.objects`](#Lob-objects)
  - [`Lob.objects.retrieve(String id, Function done)`](#Lob-objects-retrieve)
  - [`Lob.objects.list(Object options, Function done)`](#Lob-objects-list)
  - [`Lob.objects.create(Object params, Function done)`](#Lob-objects-create)
  - [`Lob.objects.delete(String id, Function done)`](#Lob-objects-delete)
- [`Lob.settings`](#Lob-settings)
  - [`Lob.settings.retrieve(String id, Function done)`](#Lob-settings-retrieve)
  - [`Lob.settings.create(Object params, Function done)`](#Lob-settings-create)
- [`Lob.services`](#Lob-services)
  - [`Lob.services.retrieve(String id, Function done)`](#Lob-services-retrieve)
  - [`Lob.services.list(Object options, Function done)`](#Lob-services-list)
- [`Lob.postcards`](#Lob-postcards)
  - [`Lob.postcards.retrieve(String id, Function done)`](#Lob-postcards-retrieve)
  - [`Lob.postcards.list(Object options, Function done)`](#Lob-postcards-list)
  - [`Lob.postcards.create(Object params, Function done)`](#Lob-postcards-create)
- [`Lob.checks`](#Lob-checks)
  - [`Lob.checks.retrieve(String id, Function done)`](#Lob-checks-retrieve)
  - [`Lob.checks.list(Object options, Function done)`](#Lob-checks-list)
  - [`Lob.checks.create(Object params, Function done)`](#Lob-checks-create)
- [`Lob.bankAccounts`](#Lob-bankAccounts)
  - [`Lob.bankAccounts.retrieve(String id, Function done)`](#Lob-bankAccounts-retrieve)
  - [`Lob.bankAccounts.delete(String id, Function done)`](#Lob-bankAccounts-delete)
  - [`Lob.bankAccounts.list(Object options, Function done)`](#Lob-bankAccounts-list)
  - [`Lob.bankAccounts.create(Object params, Function done)`](#Lob-bankAccounts-create)
- [`Lob.areas`](#Lob-areas)
  - [`Lob.areas.retrieve(String id, Function done)`](#Lob-areas-retrieve)
  - [`Lob.areas.list(Object options, Function done)`](#Lob-areas-list)
  - [`Lob.areas.create(Object params, Function done)`](#Lob-areas-create)
- [`Lob.routes`](#Lob-routes)
  - [`Lob.routes.list(Object options, Function done)`](#Lob-routes-list)

###`Lob.jobs`<a name="Lob-jobs"></a>
#####`Lob.jobs.retrieve(String id, Function done)`<a name="Lob-jobs-retrieve"></a>
```
// Retrieve a particular job JOB_ID = "job_*" (required)
Lob.jobs.retrieve('job_f6f4c0c3f6338136', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.jobs.list(Object options, Function done)`<a name="Lob-jobs-list"></a>
```
// List Jobs with default offset:0, count:0
Lob.jobs.list(function (err, data) {
  console.log(err, data);
});

// List Jobs with offset:10, count:5
Lob.jobs.list({count: 5, options: 10}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.jobs.create(Object params, Function done)`<a name="Lob-jobs-create"></a>
```
//using ID's you already created
Lob.jobs.create({
  name: 'Lob Test Job',
  from: 'adr_71d64099e6729996', //Can pass an ID
  to: 'adr_71d64099e6729996',
  objects: ['obj_fe40799250bac8f6']
}, function (err, res) {
  console.log(err, res);
});

//using inline objects instead of IDs
Lob.jobs.create({
  name: 'Lob Test Job',
  from: {
    name: 'Jane Smith',
    email: 'jane@b.com',
    phone: '5555555555',
    address_line1: '123 Test Street',
    address_line2: 'Unit 199',
    address_city: 'Mountain View',
    address_state: 'CA',
    address_zip: '94085',
    address_country: 'US',
  },
  to: {
    name: 'Joe Smith',
    email: 'berry@Lob.com',
    phone: '5555555555',
    address_line1: '123 Test Street',
    address_line2: 'Unit 199',
    address_city: 'Mountain View',
    address_state: 'CA',
    address_zip: '94085',
    address_country: 'US',
  },
  objects: [
    {
      name: 'GO BLUE',
      file: 'https://www.Lob.com/goblue.pdf',
      setting_id: 100
    }
  ]
}, function (err, res) {
  console.log(err, res);
});
```
###`Lob.addresses`<a name="Lob-addresses"></a>
#####`Lob.addresses.retrieve(String id, Function done)`<a name="Lob-addresses-retrieve"></a>
```
// Retrieve a particular address address object
//
Lob.addresses.retrieve('adr_cda562558b71ff93', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.addresses.delete(String id, Function done)`<a name="Lob-addresses-delete"></a>
```
// Delete an Address Object (make sure it exists first)
//
Lob.addresses.delete('adr_71d64099e6729996', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.addresses.list(Object options, Function done)`<a name="Lob-addresses-list"></a>
```
// List All Addresses with default offset:0, count:0
//
Lob.addresses.list(function (err, res) {
  console.log(err, res);
});

// List Addreses with offset:10, count:5
//
Lob.addresses.list({count: 10, offset: 5}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.addresses.create(Object params, Function done)`<a name="Lob-addresses-create"></a>
```
Lob.addresses.create({
  name: 'Test Name',
  email: 'test@gmail.com',
  phone: '123456789',
  address_line1: '123 Test Street',
  address_line2: 'Unit 199',
  address_city: 'Chicago',
  address_state: 'IL',
  address_zip: '60012',
  address_country: 'US',
}, function (err, res) {
  console.log(err, res);
});
```
###`Lob.verification`<a name="Lob-verification"></a>
#####`Lob.verification.verify(Object params, Function done)`<a name="Lob-verification-verify"></a>
```
Lob.verification.verify({
  address_line1: '325 Berry Street',
  address_line2: 'Unit 211',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: '94158',
  address_country: 'US',
}, function (err, res) {
  console.log (err, res);
});
```
###`Lob.states`<a name="Lob-states"></a>
#####`Lob.states.list(Object options, Function done)`<a name="Lob-states-list"></a>
```
Lob.states.list(function (err, res) {
  console.log(err, res);
});
```
###`Lob.countries`<a name="Lob-countries"></a>
#####`Lob.countries.list(Object options, Function done)`<a name="Lob-countries-list"></a>
```
// List All Countries with defaults
//
Lob.countries.list(function (err, res) {
  console.log(err, res);
});
```
###`Lob.objects`<a name="Lob-objects"></a>
#####`Lob.objects.retrieve(String id, Function done)`<a name="Lob-objects-retrieve"></a>
```
// Retrieve a particular object OBJECT_ID = "obj_*" (required)
//
Lob.objects.retrieve('obj_1d1188df1e8d6427', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.objects.list(Object options, Function done)`<a name="Lob-objects-list"></a>
```
// List All Objects with default offset:0, count:0
//
Lob.objects.list(function (err, res) {
  console.log(err, res);
});

// List Objects with count:10, offset:5
//
Lob.objects.list({count: 10, offset: 5}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.objects.create(Object params, Function done)`<a name="Lob-objects-create"></a>
```
// Creating an Object with local file
//
Lob.objects.create({
  name: 'My First Object',
  file: '@/home/Downloads/goblue.pdf',
  setting_id: 100
}, function (err, res) {
  console.log(err, res);
});

// Creating an Object with remote file
//
Lob.objects.create({
  name: 'My First Object',
  file: 'https://www.Lob.com/goblue.pdf',
  setting_id: 100
}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.objects.delete(String id, Function done)`<a name="Lob-objects-delete"></a>
```
Lob.objects.delete('obj_1d1188df1e8d6427', function (err, res) {
  console.log(err, res);
});
```
###`Lob.settings`<a name="Lob-settings"></a>
#####`Lob.settings.retrieve(String id, Function done)`<a name="Lob-settings-retrieve"></a>
```
```
#####`Lob.settings.create(Object params, Function done)`<a name="Lob-settings-create"></a>
```
```
###`Lob.services`<a name="Lob-services"></a>
#####`Lob.services.retrieve(String id, Function done)`<a name="Lob-services-retrieve"></a>
```
// Retrieve a particular service object
//
Lob.services.retrieve('2', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.services.list(Object options, Function done)`<a name="Lob-services-list"></a>
```
// List All services
//
Lob.services.list(function (err, res) {
  console.log(err, res);
});
```
###`Lob.postcards`<a name="Lob-postcards"></a>
#####`Lob.postcards.retrieve(String id, Function done)`<a name="Lob-postcards-retrieve"></a>
```
// Retrieve a particular postcard object
//
Lob.postcards.retrieve('psc_056fdd2b4a11a169', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.postcards.list(Object options, Function done)`<a name="Lob-postcards-list"></a>
```
// List All Postcards with default offset:0, count:0
//
Lob.postcards.list(function (err, res) {
  console.log(err, res);
});

// List All Postcards with offset:10, count:5
//
Lob.postcards.list({offset: 10, count: 5}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.postcards.create(Object params, Function done)`<a name="Lob-postcards-create"></a>
```
// Creating PostCard with local file
//
Lob.postcards.create({
  name: 'Test Card',
  to: 'adr_3b5fe0b76713a6e8',
  front: '@/home/Downloads/postcardfront.pdf',
  back: '@/home/Downloads/postcardback.pdf'
}, function (err, res) {
  console.log(err, res);
});
/**/

// Creating a PostCard with remote file
//
Lob.postcards.create({
  name: 'My First Postcard',
  to: 'adr_3b5fe0b76713a6e8',
  front: 'https://www.Lob.com/postcardfront.pdf',
  back: 'https://www.Lob.com/postcardback.pdf'
}, function (err, res) {
  console.log(err, res);
});
/**/

// Creating a PostCard with local, remote file
//
Lob.postcards.create({
  name: 'My First Postcard',
  to: 'adr_3b5fe0b76713a6e8',
  front: 'https://www.Lob.com/postcardback.pdf',
  back: 'https://www.Lob.com/postcardback.pdf'
}, function (err, res) {
  console.log(err, res);
});
```
###`Lob.checks`<a name="Lob-checks"></a>
#####`Lob.checks.retrieve(String id, Function done)`<a name="Lob-checks-retrieve"></a>
```
// Retrieve a particular check object
//
Lob.checks.retrieve('psc_056fdd2b4a11a169', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.checks.list(Object options, Function done)`<a name="Lob-checks-list"></a>
```
// List All Checks with default offset:0, count:0
//
Lob.checks.list(function (err, res) {
  console.log(err, res);
});
/**/
```
#####`Lob.checks.create(Object params, Function done)`<a name="Lob-checks-create"></a>
```
// Creating Check
/**/
Lob.checks.create({
  name: 'Test Check',
  check_number: '10000',
  bank_account: 'bank_7a88fa3abe5e2da',
  to: 'adr_3b5fe0b76713a6e8',
  amount: 100,
  memo: 'THis is my first Check',
  message: 'this check is for laundry'
}, function (err, res) {
  console.log(err, res);
});
/**/
// Creating Check with Bank Account
/**/
Lob.bankAccounts.create({
  routing_number: '123456789',
  account_number: '123456788',
  bank_address: {
    name: 'Chase',
    address_line1: '123 Test Street',
    address_line2: 'Unit 199',
    address_city: 'Bangalore',
    address_state: 'KA',
    address_zip: '560039',
    address_country: 'IN',
  },
  account_address: {
    name: 'Lob.com',
    address_line1: '123 Test Street',
    address_line2: 'Unit 199',
    address_city: 'Bangalore',
    address_state: 'KA',
    address_zip: '560039',
    address_country: 'IN',
  }
}, function (err, res) {
  Lob.checks.create({
    name: 'TEST_CHECK',
    bank_account: res.id,
    to: 'adr_8613108bcfa00806',
    amount: 100,
    memo: 'test check'
  }, function (err, res2) {
    console.log(err, res2);
  });
});
/**/
```
###`Lob.bankAccounts`<a name="Lob-bankAccounts"></a>
#####`Lob.bankAccounts.retrieve(String id, Function done)`<a name="Lob-bankAccounts-retrieve"></a>
```
// Retrieve a particular Bank Account Object
//
Lob.bankAccounts.retrieve('bank_7a88fa3abe5e2da', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.bankAccounts.delete(String id, Function done)`<a name="Lob-bankAccounts-delete"></a>
```
// Deleting a bank account
Lob.bankAccounts.delete('bank_7a88fa3abe5e2da', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.bankAccounts.list(Object options, Function done)`<a name="Lob-bankAccounts-list"></a>
```
// List All Accounts with default offset:0, count:10
//
Lob.bankAccounts.list(function (err, res) {
  console.log(err, res);
});
```
#####`Lob.bankAccounts.create(Object params, Function done)`<a name="Lob-bankAccounts-create"></a>
```
// Creating a Bank Account
//
Lob.bankAccounts.create({
  routing_number: 123456789,
  account_number: 123456789,
  bank_code: 123456789,
  bank_address: {
    name: 'Chase Bank',
    address_line1: '55 Edmonds',
    address_city: 'Palo Alto',
    address_state: 'CA',
    address_zip: '90081',
    address_country: 'US'
  },
  account_address: {
    name: 'Leore Avidar',
    address_line1: '123 Test Street',
    address_city: 'Sunnyvale',
    address_state: 'CA',
    address_zip: '94085',
    address_country: 'US'
  }
}, function (err, res) {
  console.log(err, res);
});
```
###`Lob.areas`<a name="Lob-areas"></a>
#####`Lob.areas.retrieve(String id, Function done)`<a name="Lob-areas-retrieve"></a>
```
// Retrieve a particular Area
Lob.areas.retrieve('area_350e47ace201ee4', function (err, res) {
  console.log(err, res);
});
```
#####`Lob.areas.list(Object options, Function done)`<a name="Lob-areas-list"></a>
```
// List all areas with count: 5 and offset: 10
Lob.areas.list({count: 5, offset: 10}, function (err, res) {
  console.log(err, res);
});
```
#####`Lob.areas.create(Object params, Function done)`<a name="Lob-areas-create"></a>
```
// Create an area mailing with a mix of local and remote files
// You can mix and match (for example, both local or both remote)
Lob.areas.create({
  front: '@/path/to/local/file',
  back: 'https://www.lob.com/areaback.pdf',
  routes: ['94107-C031', '94158-C031'], // required
  target_type: 'all', // optional
  full_bleed: 1 // optional
}, function (err, res) {
  console.log(err, res);
})
```
###`Lob.routes`<a name="Lob-routes"></a>
#####`Lob.routes.list(Object options, Function done)`<a name="Lob-routes-list"></a>
```
// List all routes for a set of zip codes
Lob.routes.list({
  zip_codes: ['94108', '94709', '94608']
}, function (err, res) {
  console.log(err, res);
});
```
