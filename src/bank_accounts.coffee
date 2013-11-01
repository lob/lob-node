
module.exports = class BankAccounts extends require "./common"
	constructor: (@api) ->
		@path = "bank_accounts"
		this

	create: (_object, callback) ->
		@api.request "POST", @path, _object, callback
		this