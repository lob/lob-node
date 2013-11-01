var LOB_API_KEY = NODE_ENV.LOB_API_KEY || 'YOUR_LOB_API_KEY';

var LOB = new (require('../lib/main')) (LOB_API_KEY);

/*
 * Bank Accounts Endpoint 
 */

// List All Accounts with default offset:0, count:0
/**
LOB.bankAccounts.list(function(err, res) {
	console.log(err, res);
});
/**/

// Retrieve a particular Account by ACCOUNT_ID = "bank_*" (required)
/**/
LOB.bankAccounts.get("bank_7a88fa3abe5e2da", function(err, res) {
	console.log(err, res);
});
/**/

// Creating Check
/**
LOB.bankAccounts.create({
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
/**/