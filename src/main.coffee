request = require "request"
jobs = require "./jobs"
addresses = require "./addresses"
objects = require "./objects"
settings = require "./settings"
packagings = require "./packagings"
services = require "./services"
postcards = require "./postcards"
checks = require "./checks"
bank_accounts = require "./bank_accounts"
utils = require "./utils"

USER_AGENT = "LOB/node.js wrapper/1.0.0"

module.exports = class Main
	constructor: (config) ->
		if typeof config is "string"
			@config = {
				endpoint : "https://api.lob.com/v1/",
				key : config
			}

		else if typeof config is "object" and config.key?
			@config = {
				endpoint : if config.endpoint? then config.endoint else "https://api.lob.com/v1/"
				key : if config.key? then config.key else null
			}
		else
			throw new Error "API Key must be set"

		@jobs = new jobs this
		@addresses = new addresses this
		@objects = new objects this
		@settings = new settings this
		@packagings = new packagings this
		@services = new services this
		@postcards = new postcards this
		@checks = new checks this
		@bankAccounts = new bank_accounts this
		@utils = new utils this

	request: (method, path, data, callback) ->

		method = method.toUpperCase()

		request_object = {
			method : method.split("_")[0],
			uri : "#{ @config.endpoint }#{ path }",
			headers : {
				"Accept" : "application/json", 
				"Connection" : "close", 
				"User-Agent" : USER_AGENT
			},
			auth : {
				user : @config.key,
				pass : ":"
			}
		}

		if typeof data is "function"
			callback = data
		else if method is "GET"
			request_object.qs = data
		else if method is "POST"
			request_object.form = data

		r = request request_object, (err, res, body) ->
			#console.log res.req.res.request.body.toString()
			body = JSON.parse(body)
			if body.errors? and err is null
				err = body.errors
				delete body.errors
			callback err, body
			this

		if method is "POST_FORM"
			form = r.form()
			Object.keys(data).forEach (_k) ->
				form.append _k, data[_k]
			this