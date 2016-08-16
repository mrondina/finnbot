'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
//var Config = require('./config')
//var FB = require('./connectors/facebook')
//var Bot = require('./bot')

//The Server side
const app = express()

app.set('port', (process.env.PORT || 5000))


//Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))


//Process application json
app.use(bodyParser.json())

// Index routing
app.get('/', function(req, res) {
	res.send('Hey there, I am Finn the Robot')
})

// for Facebook's verification
app.get('/webhook', function(req, res) {
	if(req.query['hub.verify_token'] === 'glob_verify_my_access') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// spin up the server to listen
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

app.post('/webhook', function(req, res) {
	var entry = FB.getMessageEntry(req.body)
	// validate the message
	if(entry && entry.message) {
		if(entry.message.attachments) {
			// message attachments to be built out later, but have a default for it
			FB.newMessage(entry.sender.id, "Sweet! Wish I could see it, tho. I'm not that advanced, you know?")
		} else {
			// send it out for the bot to process
			Bot.read(entry.sender.id, entry.message.text, function(sender, reply) {
				FB.newMessage(sender, reply)
			})
		}
	}
	res.sendStatus(200)
})

const token = "EAACRdZCXOqCIBABrn9QnRA360g0cX8gs6Dfa52R34DH60wZA5yklHvZBFYpkqZAGOr4mMxqBIRoKA0kHWv0lXzQBQ8zHFg7imJOFXTGQQEZAJC6ElEFGK7tcnFRLTSg8lZABZAysv38XpDwgVZA5Hy0CRtRlReawIELS6ZBb4o1dqoAZDZD"


function sendTextMessage(sender, text) {
	let messageData = { text:text }
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: ( access_token:token ),
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if(error) {
			console.log('Error sending messages', error)
		} else if(response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

