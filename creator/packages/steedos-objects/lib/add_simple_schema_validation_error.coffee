SimpleSchema.RegEx.code = new RegExp('^[a-zA-Z_][a-zA-Z0-9_]*$')

if Meteor.isClient
	Meteor.startup ()->
		_regExMessages = SimpleSchema._globalMessages.regEx || []
		_regExMessages.push {exp: SimpleSchema.RegEx.code, msg: "[label] Can only start with letters, _, and can only contain letters, numbers, _"}
		SimpleSchema.messages({
			regEx: _regExMessages,
		})