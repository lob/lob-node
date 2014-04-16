var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

/*
 * Packagings Endpoint
 */

// List All packagings
/**/
Lob.packagings.list(function(err, res) {
	console.log(err, res);
});
/**/

// Retrieve a particular packaging by PACKAGING_ID (required)
/**
Lob.packagings.get("2", function(err, res) {
	console.log(err, res);
});
/**/
