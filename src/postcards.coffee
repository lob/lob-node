
fs = require "fs"

module.exports = class Postcards extends require "./common"
	constructor: (@api) ->
		@path = "postcards"
		this

	create: (_object, callback) ->
		if "@" is _object.front.substr 0, 1 or "@" is _object.back.substr 0, 1

			if "@" is _object.front.substr 0, 1
				_object.front = fs.createReadStream _object.front.substr 1

			if "@" is _object.back.substr 0, 1
				_object.back = fs.createReadStream _object.back.substr 1

			@api.request "POST_FORM", @path, _object, callback
		else
			@api.request "POST", @path, _object, callback
		this