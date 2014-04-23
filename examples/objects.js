var Lob = require('../lib/lob');
Lob = new Lob('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
/* jshint camelcase: false */
/*
 * Objects Endpoint
 */

// List All Objects with default offset:0, count:0
/**/
Lob.objects.list(function (err, res) {
  console.log(err, res);
});
/**/

// List Objects with count:10, offset:5
//
Lob.objects.list({count: 10, offset: 5}, function (err, res) {
  console.log(err, res);
});
/**/

// Retrieve a particular object OBJECT_ID = "obj_*" (required)
//
Lob.objects.retrieve('obj_1d1188df1e8d6427', function (err, res) {
  console.log(err, res);
});
/**/

// Creating an Object with local file
//
Lob.objects.create({
  name: 'My First Object',
  file: '@/home/Downloads/goblue.pdf',
  setting_id: 100
}, function (err, res) {
  console.log(err, res);
});
/**/

// Creating an Object with remote file
//
Lob.objects.create({
  name: 'My First Object',
  file: 'https://www.Lob.com/goblue.pdf',
  setting_id: 100
}, function (err, res) {
  console.log(err, res);
});
/**/

// Delete an Object
//
Lob.objects.delete('obj_1d1188df1e8d6427', function (err, res) {
  console.log(err, res);
});
/**/
