var LOB_API_KEY = NODE_ENV.LOB_API_KEY || 'YOUR_LOB_API_KEY';

var LOB = new (require('../lib/main')) (LOB_API_KEY);

/*
 * Settings Endpoint 
 */

// List All settings
/**
LOB.settings.list(function(err, res) {
	console.log(err, res);
});
/**/

// Retrieve a particular setting by SETTING_ID (required)
/**/
LOB.settings.get("100", function(err, res) {
	console.log(err, res);
});
/**/