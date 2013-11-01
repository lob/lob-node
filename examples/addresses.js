var LOB_API_KEY = NODE_ENV.LOB_API_KEY || 'YOUR_LOB_API_KEY';

var LOB = new (require('../lib/main')) (LOB_API_KEY);

/*
 * Addresses Endpoint 
 */

// List All Addresses with default offset:0, count:0
/**
LOB.addresses.list(function(err, res) {
	console.log(err, res);
});
/**/

// List Addreses with offset:10, count:5
/**
LOB.addresses.list(10, 5, function(err, res) {
	console.log(err, res);
});
/**/

// Retrieve a particular address ADDRESS_ID = "adr_*" (required)
/**
LOB.addresses.get("adr_cda562558b71ff93", function(err, res) {
	console.log(err, res);
});
/**/

// Creating an Address Object

/**
LOB.addresses.create({
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
/**/

// Update an Address Object
/**/
LOB.addresses.update("adr_3b5fe0b76713a6e8", {
	name: "Sankaran Kaliappan",
    email: "mail@sankarank.in",
    phone: "+91 (973)-111 5163",
    address_state: "KARNATAKA",
    address_zip: "560029"
}, function(err, res) {
	console.log(err, res);
});
/**/

// Delete an Address Object
/**
LOB.addresses.delete("adr_71d64099e6729996", function(err, res) {
	console.log(err, res);
});
/**/

// Verify an Address
/**
LOB.addresses.verify({
	address_line1: "220 William T Morrissey Boulevard",
    address_city: "Boston",
    address_state: "MA",
}, function(err, res) {
	console.log(err, res);
});
/**/