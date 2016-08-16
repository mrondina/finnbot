'use strict'

var Config = require('../config')
var FB = require('../connectors/facebook')
var Wit = require('node-wit').Wit
var request = require('request')

var firstEntityValue = function(entities, entity) {
	var val = entities && entities[entity] &&
			  Array.isArray(entities[entity]) &&
			  entities[entity].length > 0 &&
			  entities[entity[0]].firstEntityValue
		if(!val) {
			return null
		}
		return typeof vall === 'object' ? val.value : val
}

var actions = {
	say(sessionId, context, message, cb) {
		// testing mode: run cb() and return
		if(require.main === module) {
			cb()
			return
		}

		console.log('WIT WANTS TO TALK TO: ', context._fbid_)
		console.log('WIT HAS SOMETHING TO SAY: ', message)
		console.log('WIT HAS A CONTEXT: ', context)

		if(checkURL(message)) {
			FB.newMessage(context._fbid_, message, true)
		} else {
			FB.newMessage(context._fbid_, message)
		}

		cb()
	},

	merge(sessionId, context, entities, message, cb) {
		// delete story

		// store the first location the person provided
		var loc = firstEntityValue(entities, 'location')
		if(loc) {
			context.loc = loc
		}

		reset the Ooo map story
		delete context.Ooo

		// retrieve the category
		var category = firstEntityValue(entities, 'category')
		if(category) {
			context.cat = category
		}

		// retrieve sentiment
		var sentiment = firstEntityValue(entities, 'sentiment')
		if(sentiment) {
			context.ack = sentiment === 'positive' ? 'Sweet, dude!' : 'Dang! Sorry to hear that'
		} else {
			delete context.ack
		}

		cb(context)
	}, 

	error(sessionId, context, error) {
		console.log(error.message)
	}, 

	// list of functions Wit.ai can execute
	// leave as a placeholder for future ideas that call out to other services

}

// SETUP Wit.ai
var getWit = function() {
	console.log('INITIALIZING WIT')
	return new Wit(Config.WIT_TOKEN, actions)
}

module.exports = {
	getWit: getWit,
}

// BOT TESTING MODE
if(require.main === module) {
	console.log('Bot testing mode initialized')
	var client = getWit()
	client.interactive()
}

// Check is URL is an image
var checkURL = function(url) {
	return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

// List of Pics to send
var allPics = {
	family: [
		'http://imgur.com/gallery/Xt4IMFV',
		'https://pbs.twimg.com/profile_images/1850759664/image.jpg',
		'http://vignette2.wikia.nocookie.net/adventuretimewithfinnandjake/images/c/c9/603138_454321168018988_647044807_n.png/revision/latest?cb=20140624024310',
		'http://img.wallpaperfolder.com/f/7B6E78CE5AE2/jake-dog-and-icons.png',
		'https://media.giphy.com/media/daUOBsa1OztxC/giphy.gif',
		'https://media.giphy.com/media/grxSbqtDPlADm/giphy.gif',
		'https://media.giphy.com/media/IMSq59ySKydYQ/giphy.gif',
		],
	Ooo: [
		'http://vignette3.wikia.nocookie.net/adventuretimewithfinnandjake/images/7/7e/AT_earth2.jpg/revision/latest?cb=20110217221247',
		'http://www.myteespot.com/images/Images_d/img_Mu2E0L.jpg',
		'http://stuffpoint.com/adventure-time/image/403658-adventure-time-adventure-time-landscapes-22.jpg',
		],
	default: [
		'https://media.giphy.com/media/rOTGSPxvJJY7m/giphy.gif'
		],
}:

