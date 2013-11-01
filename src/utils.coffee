
module.exports = class Utils
	constructor: (@api) ->
		this

	countries: (callback) ->

		if typeof callback isnt "function" 
			throw new Error "Callback is not a function"
		else
			@api.request "GET", "countries", {}, callback
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