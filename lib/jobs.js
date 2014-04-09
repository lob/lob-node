var fs = require('fs');
(function() {
  var Jobs,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = Jobs = (function(_super) {
    __extends(Jobs, _super);

    function Jobs(api) {
      this.api = api;
      this.path = "jobs";
      this;
    }

    Jobs.prototype.create = function(_object, callback) {
      var i, obj;
      var objects = _object.objects;
      var method = 'POST';
      for(i in objects) {
        obj = objects[i];
        if(obj.file.substr(0,1) === '@') {
          obj.file = fs.createReadStream(obj.file.substr(1));
          _object["object" + (++i)] = obj;
          method = 'POST_FORM';
        }
      }
      delete _object.objects;
      this.api.request(method, this.path, _object, callback);
      return this;
    };

    return Jobs;

  })(require("./common"));

}).call(this);
