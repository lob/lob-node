var LOB_API_KEY = NODE_ENV.LOB_API_KEY || 'YOUR_LOB_API_KEY';

//var LOB = new (require('../lib/main')) (LOB_API_KEY);
var LOB = require('../lib/main');

//LOB = new LOB({key: LOB_API_KEY});
//LOB = new LOB({endpoint: 'https://api.lob.com/v1/', key: LOB_API_KEY});
LOB = new LOB(LOB_API_KEY);

/*
 * JOBS Endpoint 
 */

// List All Jobs with default offset:0, count:0
/**/
LOB.jobs.list(function(err, data) {
	console.log(err, data);
});
/**/

// List Jobs with offset:10, count:5
/**
LOB.jobs.list(10, 5, function(err, res) {
	console.log(err, res);
});
/**/

// Retrieve a particular job JOB_ID = "job_*" (required)
/**
LOB.jobs.get("job_f6f4c0c3f6338136", function(err, res) {
	console.log(err, res);
});
/**/

// Creating a job with objects

/**
LOB.jobs.create({
	name: "Testing",
	from: "adr_71d64099e6729996",
	to:{
		name: "Harry Zhang",
	    email: "harry@lob.com",
	    phone: "5555555555",
	    address_line1: "123 Test Street",
	    address_line2: "Unit 199",
	    address_city: "Mountain View",
	    address_state: "CA",
	    address_zip: "94085",
	    address_country: "US",
	},
	objects: [
		{
			name: "GO BLUE",
			file: "https://www.lob.com/goblue.pdf",
			setting_id: 100
		},
		"obj_fe40799250bac8f6"
	]
}, function(err, res) {
	console.log(err, res);
});
/**/