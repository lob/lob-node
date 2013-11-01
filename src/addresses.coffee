
module.exports = class Address extends require "./common"
	constructor: (@api) ->
		@path = "addresses"
		this

	create: (_object, callback) ->
		for _i, _o of _object.address_lines?
			_object["address_line#{ ++_i }"] = _o

		delete _object.address_lines
		@api.request "POST", @path, _object, callback
		this

	update: (_id, _object, callback) ->
		if typeof _id isnt "string"
			if typeof _id is "function"
				callback = _id
			else if typeof _object is "function"
				callback = _object

			if typeof callback is "function"
				callback "ID can not be empty for this operation", null
			else
				throw new Error "ID can not be empty for this operation, Callback is empty"
			this
		else
			@api.request "POST", "#{ @path }/#{ _id }", _object, callback
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


	verify: (_object, callback) ->
		if typeof _object isnt "object"
			if typeof _object is "function"
				callback = _object
			if typeof callback is "function"
				callback "Object can not be empty", null
			else
				throw new Error "Object, Callback can not be empty"
			this
		else
			for _i, _o of _object.address_lines?
				_object["address_line#{ ++_i }"] = _o

			delete _object.address_lines
			@api.request "POST", "verify", _object, callback
			this