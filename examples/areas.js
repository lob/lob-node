var lobFactory = require('../lib/index.js');
var Lob = new lobFactory('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

// Retrieve a particular Area
Lob.areas.retrieve('area_350e47ace201ee4', function (err, res) {
  console.log(err, res);
});

// List all areas with count: 5 and offset: 10
Lob.areas.list({count: 5, offset: 10}, function (err, res) {
  console.log(err, res);
});

// Create an area mailing with a mix of local and remote files
// You can mix and match (for example, both local or both remote)
Lob.areas.create({
  front: '@' + __dirname + '/../test/assets/4x6.pdf',
  back: 'https://www.lob.com/areaback.pdf',
  routes: ['94107-C031', '94158-C031'], // required
  target_type: 'all', // optional
  full_bleed: 1 // optional
}, function (err, res) {
  console.log(err, res);
})
