
module.exports = class Commons
	constructor: (@api) ->
		this

	list: (offset = 0, count = 10, callback) ->
		data = {
			offset : offset,
			count : count
		}

		if typeof offset is "function"
			callback = offset
			data.offset = 0

		@api.request "GET", @path, data, callback
		this

	get: (_id, callback)->
		if typeof _id isnt "string"
			if typeof _id is "function"
				callback = _id 
			if typeof callback is "function"
				callback "ID can not be empty for this operation", null
			else
				throw new Error "ID can not be empty for this operation, Callback is empty"
			this
		else
			@api.request "GET", "#{ @path }/#{ _id }", {}, callback
			this