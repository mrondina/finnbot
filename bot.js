'use strict'

var config = require('./config')
var wit = require('./services/wit').getWit()

// Enable saving of user sessions
var sessions = {}

var findOrCreateSession = function(fbid) {
	var sessionId

	// does the session exist?
	Object.keys(sessions).forEach(k => {
		if(sessions[k].fbid === fbid) {
			sessionId = k
		}
	})

	// if there is no saved session
	if(!sessionId) {
		sessionId = new Date().toISOString()
		sessions[sessionId] = {
			fbid: fbid,
			context: {
				_fbid_: fbid
			}
		}
	}
	return sessionId
}

// set up the default greeting of the bot
var read = function(sender, message, reply) {
	if(message === 'hello') {
		// reply back
		message = 'Hey there! I&#39;m Finn the Robot.'
		reply(sender, message)
	} else {
		// first find the user
		var sessionId = findOrCreateSession(sender)
		// forward the message to Wit.ai engine
		// this runs all actions until none are left
		wit.runActions(
			sessionId,
			message,
			sessions[sessionId].context, // this the user's session state
			function(error, context) {
				if(error) {
					console.log('Wit says, oops! ', error)
				} else {
					// Wit.at has run the actions
					// Now it is ready for more messages
					console.log('Wit is awaiting further messages')
					
					// based on session state, it may need to reset the session
					// EX:
					// if(context['done']) {
					//	delete sessions[sessionId]
					// }

					// update user's current session state
					sessions[sessionId].context = context
				}
		})
	}
}

module.exports = {
	findOrCreateSession: findOrCreateSession,
	read: read,
}