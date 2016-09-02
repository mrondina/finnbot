'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

var config = require('./config')
var FB = require('./connectors/facebook')
var Bot = require('./bot')

const PORT = process.env.PORT || 5000;

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

// to send messages to facebook
app.post('/webhooks', function (req, res) {
  var entry = FB.getMessageEntry(req.body)
  // IS THE ENTRY A VALID MESSAGE?
  if (entry && entry.message) {
    if (entry.message.attachments) {
      // NOT SMART ENOUGH FOR ATTACHMENTS YET
      FB.newMessage(entry.sender.id, "Cool! I wish I could see it, but I'm not that advanced yet")
    } else {
      // SEND TO BOT FOR PROCESSING
      Bot.read(entry.sender.id, entry.message.text, function (sender, reply) {
        FB.newMessage(sender, reply)
      })
    }
  }
  res.sendStatus(200)
})