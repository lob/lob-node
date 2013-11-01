var LOB_API_KEY = NODE_ENV.LOB_API_KEY || 'YOUR_LOB_API_KEY';

var LOB = new (require('../lib/main')) (LOB_API_KEY);

/*
 * Services Endpoint 
 */

// List All services
/**/
LOB.services.list(function(err, res) {
	console.log(err, res);
});
/**/

// Retrieve a particular service by SERVICE_ID (required)
/**
LOB.services.get("2", function(err, res) {
	console.log(err, res);
});
/**/