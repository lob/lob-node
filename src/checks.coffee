
module.exports = class Checks extends require "./common"
	constructor: (@api) ->
		@path = "checks"
		this

	create: (_object, callback) ->
		@api.request "POST", @path, _object, callback
		this