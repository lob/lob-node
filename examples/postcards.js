var LOB_API_KEY = NODE_ENV.LOB_API_KEY || 'YOUR_LOB_API_KEY';

var LOB = new (require('../lib/main')) (LOB_API_KEY);

/*
 * Postcards Endpoint 
 */

// List All Postcards with default offset:0, count:0
/**/
LOB.postcards.list(function(err, res) {
	console.log(err, res);
});
/**/

// Retrieve a particular postcard by POSTCARD_ID = "psc_*" (required)
/**
LOB.postcards.get("psc_056fdd2b4a11a169", function(err, res) {
	console.log(err, res);
});
/**/

// Creating PostCard with local file
/**
LOB.postcards.create({
    name: "TEST_POSTCARD",
    to: "adr_3b5fe0b76713a6e8",
    front: "@/home/sankaran/Downloads/postcardfront.pdf",
    back: "@/home/sankaran/Downloads/postcardback.pdf"
}, function(err, res) {
	console.log(err, res);
});
/**/

// Creating an PostCard with remote file
/**
LOB.postcards.create({
    name: "TEST_POSTCARD",
    to: "adr_3b5fe0b76713a6e8",
    front: "https://www.lob.com/postcardfront.pdf",
    back: "https://www.lob.com/postcardback.pdf"
}, function(err, res) {
	console.log(err, res);
});
/**/

// Creating an PostCard with local, remote file
/**
LOB.postcards.create({
    name: "TEST_POSTCARD",
    to: "adr_3b5fe0b76713a6e8",
    front: "@/home/sankaran/Downloads/postcardfront.pdf",
    back: "https://www.lob.com/postcardback.pdf"
}, function(err, res) {
	console.log(err, res);
});
/**/
