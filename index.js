'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// Server frontpage
app.get('/', function (req, res) {
    res.send('This is Finn the Robot')
});

// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'glob_verify_my_access') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Invalid verify token')
    }
})

// spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port ', app.get('port'))
})

// handler receiving messages
app.post('/webhook', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
        	let text = event.message.text
            sendTextMessage(sender, "Said yo mama, yo mama she said: " + text.substring(0,200))
        }
    }
    res.sendStatus(200)
})

const token = "EAACRdZCXOqCIBABrn9QnRA360g0cX8gs6Dfa52R34DH60wZA5yklHvZBFYpkqZAGOr4mMxqBIRoKA0kHWv0lXzQBQ8zHFg7imJOFXTGQQEZAJC6ElEFGK7tcnFRLTSg8lZABZAysv38XpDwgVZA5Hy0CRtRlReawIELS6ZBb4o1dqoAZDZD"

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}