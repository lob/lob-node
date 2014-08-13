// List all routes for a set of zip codes
Lob.routes.list({
  zip_codes: ['94108', '94709', '94608']
}, function (err, res) {
  console.log(err, res);
});
