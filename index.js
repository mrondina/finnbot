'use strict'


const bodyParser = require('body-parser')
const express = require('express')
const request = require('request')

const config = require('./config')
var FB = require('./connectors/facebook')
var Bot = require('./bot')

const PORT = process.env.PORT || 3000;

// let's start the server
var app = express()
app.set('port', PORT)

app.listen(app.get('port'), function() {
	console.log('Running on port ', app.get('port'))
})

// parse the body
app.use(bodyParser.json())

// index page
app.get('/', function(req, res) {
	res.send('Yo, boi! My name is Finn the Robot')
})

// Facebook Webhook setup
app.get('/webhook', function(req, res) {
	if(req.query['hub.verify_token'] === config.FB_VERIFY_TOKEN) {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// send messages to facebook
app.post('/webhook', function(req, res) {
	var entry = FB.getMessageEntry(req.body)
	// validate the message
	if(entry && entry.message) {
		if(entry.message.attachments) {
		// not smart enough for attachments
		FB.newMessage(entry.sender.id, "Cool! I wish I could see it, but I'm not that advanced yet")
		} else {
			Bot.read(entry.sender.id, entry.message.text, function(sender, reply) {
				FB.newMessage(sender, reply)
			})
		}
	}
	res.sendStatus(200)
})