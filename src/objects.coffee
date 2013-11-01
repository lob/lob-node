
fs = require "fs"

module.exports = class Objects extends require "./common"
	constructor: (@api) ->
		@path = "objects"
		this

	create: (_object, callback) ->
		if "@" is _object.file.substr 0, 1
			_object.file = fs.createReadStream _object.file.substr 1
			@api.request "POST_FORM", @path, _object, callback
		else
			@api.request "POST", @path, _object, callback
		this

	
	delete: (_id, callback) ->
		if typeof _id isnt "string"
			if typeof _id is "function"
				callback = _id
			if typeof callback is "function"
				callback "ID can not be empty for this operation", null
			else
				throw new Error "ID can not be empty for this operation, Callback is empty"
			this
		else
			@api.request "DELETE", "#{ @path }/#{ _id }", {}, callback
			this