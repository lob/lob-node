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
  front: '@/path/to/local/file',
  back: 'https://www.lob.com/areaback.pdf',
  routes: ['94107-C031', '94158-C031'], // required
  target_type: 'all', // optional
  full_bleed: 1 // optional
}, function (err, res) {
  console.log(err, res);
})
