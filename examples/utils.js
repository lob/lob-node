var LOB_API_KEY = NODE_ENV.LOB_API_KEY || 'YOUR_LOB_API_KEY';

var LOB = new (require('../lib/main')) (LOB_API_KEY);

// Get list of Countries
/**
LOB.utils.countries(function(err, res) {
	console.log(err, res);
});
/**/


// Verify an Address
/**
LOB.utils.verify({
	address_line1: "220 William T Morrissey Boulevard",
    address_city: "Boston",
    address_state: "MA",
}, function(err, res) {
	console.log(err, res);
});
/**/