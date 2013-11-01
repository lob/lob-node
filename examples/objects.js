var LOB_API_KEY = NODE_ENV.LOB_API_KEY || 'YOUR_LOB_API_KEY';

var LOB = new (require('../lib/main')) (LOB_API_KEY);

/*
 * Objects Endpoint 
 */

// List All Objects with default offset:0, count:0
/**/
LOB.objects.list(function(err, res) {
	console.log(err, res);
});
/**/

// List Objects with offset:10, count:5
/**
LOB.objects.list(10, 5, function(err, res) {
	console.log(err, res);
});
/**/

// Retrieve a particular object OBJECT_ID = "obj_*" (required)
/**
LOB.objects.get("obj_1d1188df1e8d6427", function(err, res) {
	console.log(err, res);
});
/**/

// Creating an Object with local file
/**
LOB.objects.create({
    name: "TEST_OBJECT",
    file: "@/home/sankaran/Downloads/goblue.pdf",
    setting_id: 100
}, function(err, res) {
	console.log(err, res);
});
/**/


// Creating an Object with remote file
/**
LOB.objects.create({
    name: "TEST_OBJECT",
    file: "https://www.lob.com/goblue.pdf",
    setting_id: 100
}, function(err, res) {
	console.log(err, res);
});
/**/

// Delete an Object
/**
LOB.objects.delete("obj_1d1188df1e8d6427", function(err, res) {
	console.log(err, res);
});
/**/