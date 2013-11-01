var LOB_API_KEY = NODE_ENV.LOB_API_KEY || 'YOUR_LOB_API_KEY';

var LOB = new (require('../lib/main')) (LOB_API_KEY);

/*
 * Checks Endpoint 
 */

// List All Checks with default offset:0, count:0
/**
LOB.checks.list(function(err, res) {
	console.log(err, res);
});
/**/

// Retrieve a particular check by CHECK_ID = "chk_*" (required)
/**
LOB.checks.get("psc_056fdd2b4a11a169", function(err, res) {
	console.log(err, res);
});
/**/

// Creating Check
/**/
LOB.checks.create({
    name: "TEST_CHECK",
    check_number: "000000",
    bank_account: "bank_7a88fa3abe5e2da",
    to: "adr_3b5fe0b76713a6e8",
    amount: 100,
    memo: "testing"
}, function(err, res) {
	console.log(err, res);
});
/**/