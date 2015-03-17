'use strict';

var fs = require('fs'), resources = {};

fs.readdir('./lib/resources', function(err, resources) {
  var resource, i = 0, l = resources.length;

  for(; i < l; i++) {
    resource = resources[i];

    if(resource === 'index.js' || resource.indexOf('.js') < 0 || resource.indexOf('_base.js')) {
      continue;
    }

    resources[resource] = require('./' + resource);
  }
});

module.exports = resources;
