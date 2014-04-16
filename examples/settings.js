var Lob = require('../lib/Lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

/*
 * Settings Endpoint
 */

// List All settings
/**
Lob.settings.list(function(err, res) {
	console.log(err, res);
});
/**/

// Retrieve a particular setting by SETTING_ID (required)
/**
Lob.settings.get("100", function(err, res) {
	console.log(err, res);
});
/**/
