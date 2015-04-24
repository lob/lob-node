'use strict';

var fs        = require('fs');
var files     = fs.readdirSync(__dirname);
var resources = {};

for (var i = 0; i < files.length; i++) {
  var resource = files[i];

  if (resource === 'index.js' ||
     resource === 'resourceBase.js' ||
     resource.indexOf('.js') < 0) {
    continue;
  }

  resource = resource.replace('.js', '');
  resources[resource] = require('./' + resource);
}

module.exports = resources;
