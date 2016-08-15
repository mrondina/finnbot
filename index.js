'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
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
app.get('/webhook/', function(req, res) {
	if(req.query['hub.verify_token'] === 'glob_verify_my_access') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// spin up the server to listen
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for(let i=0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if(event.message && event.message.text) {
			let text = event.message.text
			sendTextMessage(sender, "Yeah, boi! I hear you say: " + text.substring(0, 200))
		}
	}
	res.sendStatus(200)
})

const token = "EAACRdZCXOqCIBABrn9QnRA360g0cX8gs6Dfa52R34DH60wZA5yklHvZBFYpkqZAGOr4mMxqBIRoKA0kHWv0lXzQBQ8zHFg7imJOFXTGQQEZAJC6ElEFGK7tcnFRLTSg8lZABZAysv38XpDwgVZA5Hy0CRtRlReawIELS6ZBb4o1dqoAZDZD"
