var LOB_API_KEY = NODE_ENV.LOB_API_KEY || 'YOUR_LOB_API_KEY';

var LOB = new (require('../lib/main')) (LOB_API_KEY);

/*
 * Packagings Endpoint 
 */

// List All packagings
/**/
LOB.packagings.list(function(err, res) {
	console.log(err, res);
});
/**/

// Retrieve a particular packaging by PACKAGING_ID (required)
/**
LOB.packagings.get("2", function(err, res) {
	console.log(err, res);
});
/**/