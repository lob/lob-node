
module.exports = class Jobs extends require "./common"
	constructor: (@api) ->
		@path = "jobs"
		this

	create: (_object, callback) ->
		for _i, _o of _object.objects?
			_object["object#{ ++_i }"] = _o

		delete _object.objects
		@api.request "POST", @path, _object, callback
		this