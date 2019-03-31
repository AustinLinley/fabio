const bot_secret = require('./lib/bot-secret')
var fabiobot = require('./lib/bot');

var fabio_functions = require('./lib/fabiobot-functions');
var fabio = new fabiobot()

const MongoClient = require('mongodb').MongoClient
const db_url = bot_secret.mongo_url

const discord = require('discord.js')
const client = new discord.Client()

//const fabiobot = require("./lib/faboiobot-functions")
const catbotUserID = "FabioBot#2943"

// channels (probably shouldn't be hardcoded)
// maybe create a clever algorithm that searches for a channel named fabiobot
const chan_general = "421090801393598466"
const chan_catbot = "553047079031930890"
const chan_cleverbot = "548078165936046080"

const fs = require('fs');
const path = require('path');
const request = require('request');

var Sentiment = require('sentiment');
var sentiment = new Sentiment();

var fabiosFabio = []

var fabioReplies = getFabioReplies()

/*
process.on('uncaughtException', function(err) {
  logger.debug(err)

  // set discord client "now playing"
  client.user.setActivity(catbot.play("Dead"))
});
*/
var fabioChannel


client.on('ready', () => {
	var sayHello = true

	fabio.bot_name = "Fabio"
	fabio.bot_reply = "Fabio"
	fabio.bot_keywords = "nes,game"
	fabio.bot_rating = "G"
	fabio.bot_odds = .25
	fabio.bot_channel = chan_fabiobot
	fabio.bot_platform = "discord"
	fabio.replies = fabiosFabio
	fabio.log("Connected as fabiobot")

	// locate fabiobot channel
	client.guilds.forEach((guild) => {

		guild.channels.forEach((channel) => {
			//console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
			if (channel.name.includes("fabiobot")) {
				fabioChannel = channel
				// fabio.channel(channel) // this doesn't work and I don't know why
			}
		})
	})

	// set discord client "now playing"
	client.user.setActivity(fabio.play())

	// say hello
	if (sayHello) { fabio.say("Fabio", fabioChannel) }

})

// Welcome new members
client.on('guildMemberAdd', msg => {
	// locate fabiobot channel
	var genChannel
	client.guilds.forEach((guild) => {
		guild.channels.forEach((channel) => {
			//console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
			if (channel.name.includes("general")) {
				genChannel = channel
				// fabio.channel(channel) // this doesn't work and I don't know why
			}
		})
	})

	var msg = {}
	msg.text = "Hello"
	var greeting = fabio_functions.reply(fabio, {} ,msg);

  fabio.log("New User: " + greeting)
  fabio.log("<" + receivedMessage.channel.id + "> @fabiobot: " + greeting)

})


client.on('messageReactionAdd', (reaction, user) => {
	var username = user.username.toLowerCase()
	if (!(user.bot)) {

		var fabioFeeling = sentiment.analyze(reaction.emoji.name)
		console.log(reaction.emoji.name)
		console.log(fabioFeeling.score)

		var msg_author = reaction.message.author.username.toLowerCase()
		if (msg_author.includes("fabio")) {
			var reply
			if (fabioFeeling.score > 0) {
				var reply = "NES!"
			}

			if (fabioFeeling.score < 0) {
				var reply = "SEGA!"
			}

			if (fabioFeeling.score == 0) {
				reply = fabio_functions.reply(reaction.emoji.name)
			}

			var fabioEmotion = Math.random()
			if ((fabioEmotion < fabio.bot_odds) && (fabioFeeling.score != 0)) {
				var reply = fabioEmoji(fabioFeeling.score)
			}

			console.log("REPLY: ")
			console.log(reply)
			if (reply) {
				var fabio_treat = {}
				fabio_treat.text = reaction.emoji.name
				fabio_treat.user = reaction.message.author.id
				fabio_treat.score = fabioFeeling.score

				logTreat(fabio_treat)
				reaction.message.channel.send(reply)
			}
		}
	}
})

// Reply to messages
client.on('message', (receivedMessage) => {
	var silent = false
  var replyRequired = false

  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) { return } // catch and release

	// making a list, checking it once...
	for (var i = 0; i < naughty_list.length; i++) {
		var nl_item = naughty_list[i]
		if (receivedMessage.author.id == nl_item.user) {
			// user is on the naughty list
			console.log(nl_item)
			receivedMessage.react("💩")
		}
	}

	if (receivedMessage.author.bot == true) {

		// if it's the dog CHANGE THIS (mostly unused for fabio, other than bot no reply)
		if (receivedMessage.author.username == "DogBot") {
			var dogMsg = receivedMessage.content.toLowerCase()
			if ((dogMsg.includes("grr")) || (dogMsg.includes("bark"))) {
				// cat logs all negative dog messages
				receivedMessage.channel.fetchMessages({ limit: 2 }).then(messages => {
					lastMessage = messages.last()

					if (!(lastMessage.author.bot)) {
						logMessage(lastMessage)
					}
				})
				.catch(console.error)
			}
		}

		silent = true
		return
	} // ignore bots

	var msg = receivedMessage.content;
	cat.log(receivedMessage.channel + msg)

	if (receivedMessage.content.includes("fabio")) {
		// receivedMessage.react("🐤") // random fabio emoji
	}

	// Check if the bot's user was tagged in the message
	// Always reply to messages from any channel
	if (receivedMessage.isMentioned(client.user)) {
		// Get acknowledgement message from catbot
		var direct_input = receivedMessage.content.toLowerCase()
		var direct_output = "Fabio."

		// Log acknowledgement message
		var msg = receivedMessage.content.toLowerCase();

		// Really need to modularize this function... (Done!)
		if (msg.includes("!gif")) {
			silent = true
			fabio.gif(receivedMessage.channel, msg);
		}

		if (msg.includes("!sticker")) {
			silent = true
			fabio.sticker(receivedMessage.channel, msg);
		}

		if (msg.includes("!play")) {
			silent = true
			fabio.play(msg)
		}

		if (msg.includes("!treat")) {
			silent = true
			receivedMessage.channel.send(fabio_functions.randomTreatEmoji())
		}

		if (!(silent)) {
			fabio.say(fabio_functions.reply(receivedMessage.content),receivedMessage.channel)
		}
	} else {


	}


  // In the fabiobot channel
  if (receivedMessage.channel.id == chan_fabiobot) {
    replyRequired = true

    // get a message from cb
    var fb_input = receivedMessage.content.toLowerCase()

		var tmp_input = {}
		tmp_input.text = fb_input
    var fb_msg = fabio_functions.reply(fabio,receivedMessage.channel,tmp_input)
    var fb_output = []

    // incoming message cannot be blank
    if (fb_msg) {
      var outputFlag = false

      // log input message
      fabio.log("#fabiobot: " + receivedMessage.content)

			if (!(outputFlag)) {
				var tmpInput = {}
				tmpInput.text = cb_input
				fb_output.push(favbio_functions.reply(fabio, {}, tmpInput))
				outputFlag = true
			}

      // Output Message (if any)
      if (fb_output) {
        fabio.log("Potential output messages: " + fb_output)
      }

      // if ouput flag is set, check for output
      if (outputFlag) {
        var retString = ""
        var fabioCount = 0
        var notFabio = []

        if (fb_output) { // output array must exist
          for (var i = 0; i < fb_output.length; i++) {
            if (fb_output[i].toLowerCase().includes("fabio")) {
              // count meows for weighted average
              fabioCount++
            } else {
              // save "not fabios" for later
              if (fb_output[i]) {
                notFabio.push(fb_output[i])
              }
            }
          }

          // console.log("Fabio count: " + fabioCount)
          // console.log("Not Fabio: " + notFabio)

          if (fabioCount > 0) {
            // console.log("Positive Fabio Count")
            // There are fabios
            var outputRandom = Math.random()
            // weighted probability of # of fabios vs other responses
            if (notFabio.length > 0) {
              // console.log("Not fabio: " + retString)

              if (outputRandom < (fabioCount/10)) {
                // get random other reply
                var ret = Math.floor(Math.random() * notFabio.length)
                retString = notFabio[ret]
              } else {
								var tmpInput = {}
								tmpInput.text = notFabio[ret]
                retString = fabio_functions.reply(fabio, {}, tmpInput) // get generic reply
              }
            } else {
              //output is fabio
              retString = "Fabio"
            }

          } else {
            // no fabios to balance it out, just pick a reply at random
            if (notFabio.length > 0) {
              var ret = Math.floor(Math.random() * notFabio.length)
              retString = notfabio[ret]
            }
          }

					// ovrride output with sentiment analysis
					// but only on an overwhelming outpouring of emotion
					// aka a random chance... lol
					var randomFeels = Math.random()
					if (randomFeels < fabio.bot_odds) { // 25% chance
						var fabioFeels = fabioSentiment(receivedMessage.content)
						if (fabioFeels) {
							retString = fabioFeels
						}
					}

          fabio.log("<" + receivedMessage.channel.id + "> @fabiobot: " + retString)

          if ((retString) && (!(silent))) {
            receivedMessage.channel.send(retString)
          }

          // log suppressed message
          if (retString && (silent)) {
            fabio.log("<" + receivedMessage.channel.id + "> @fabiobot: (Message Suppressed) " + retString)
          }
        }
      }
    }
  } else {
    // React to "fabio" in messages outside of the fabiobot channel
    // This should probably be a different bot.
    /*
		var fabioEmoji = fabiobot.react(receivedMessage.content)
    if (fabioEmoji) {
      for (var i = 0; i < fabioEmoji.length; i++) {
        logger.info("Reacted to: <" + receivedMessage.channel.id + "> " + receivedMessage.content + " with emoji " + catEmoji[i])
        receivedMessage.react(fabioEmoji[i])
      }
    }
		*/

    // Cat always replies to direct messages in the catbot channel
    // I wonder how long that's going to last...
    if (receivedMessage.content.includes("553047079031930890")) { // why?
      fabio.log('@tagged')
      fabio_functions.reply(fabio, {}, receivedMessage.content)
      //receivedMessage.channel.send(cb_msg)
    }
  }

	/*
	var catEmoji = cat_functions.randomCatEmoji()
	if (catEmoji) {
		for (var i = 0; i < catEmoji.length; i++) {
			cat.log("Reacted to: <" + receivedMessage.channel.id + "> " + receivedMessage.content + " with emoji " + catEmoji[i])
			receivedMessage.react(catEmoji[i])
		}
	}
	*/

  // Check if the bot's user was tagged in the message
  if (receivedMessage.content.includes(client.user.toString())) {
    // Send acknowledgement message
    outputFlag = true
    fb_msg = fabio_functions.reply(fabio, {}, receivedMessage.content)
  }

  // Random global meom
  var randomGlobalReply = Math.random();
  if ((randomGlobalReply < .05) && (receivedMessage.channel.id != chan_fabiobot)) {
		fabio_functions.reply(receivedMessage.channel, receivedMessage.content)
    fabio.log("Random Global Reply: " + fb_msg + " to " + receivedMessage.content)
    receivedMessage.channel.send(fb_msg)
  }

  // console.log(receivedMessage.channel.id)
})

function fabioSentiment(msg) {
	// give the cat a mood

	var fabioSentiment = sentiment.analyze(msg)

	console.log(catSentiment)
	fabioReturnEmoji = fabioEmoji(fabioSentiment.score)

	if (fabioReturnEmoji) {
		console.log("Return: " + fabioReturnEmoji)
		return fabioReturnEmoji
	}
}

function fabioEmoji(score) {
	var retEmoji

	var Positive = ["😺","😸","😻","😹","😽"]
	var fabioNegative = ["🦁","😼","🙀","😿","😾"]

	//var catReturnEmoji = "🐈"

	// negative emotions
	if (score < 0) {
		if (score >= -5) {
			retEmoji = fabioNegative[((score -1) * -1)]
		} else {
			retEmoji = fabioNegative[4]
		}
	}
	//positive emotions
	var fabioReturnEmoji
	if (score > 0) {
		if (score <= 5) {
			retEmoji = fabioPositive[score -1]
		} else {
			retEmoji = fabioPositive[4]
		}
	}

	return retEmoji
}



function logMessage(message) {
	MongoClient.connect(db_url, function(err, client) {
		if (err) throw err

		//var dictionary_db = db.db("emuji")
		const collection = client.db("fabio").collection("messages")
		var msg = {}
		msg.date = Math.round(+new Date()/1000) // unix datestamp
		msg.user = message.author.id
		msg.text = message.content.toString()

		var result = collection.insertOne(msg, function(err,result) {
			if (err) throw err

			console.log("Logged: ")
			console.log(msg)

			return
		})
	})
}

function logTreat(fabio_treat) {
	var input_treat = fabio_treat
	MongoClient.connect(db_url, function(err, client) {
		if (err) throw err

		//var dictionary_db = db.db("emuji")
		const collection = client.db("fabio").collection("treats")
		var treat = {}
		treat.date = Math.round(+new Date()/1000) // unix datestamp
		treat.user = input_treat.user
		treat.text = input_treat.text
		treat.score = input_treat.score

		var result = collection.insertOne(treat, function(err,result) {
			if (err) throw err

			console.log("Logged: ")
			console.log(msg)

			return
		})
	})

}

function logDelete(message) {
	MongoClient.connect(db_url, function(err, client) {
		if (err) throw err

		//var dictionary_db = db.db("emuji")
		const collection = client.db("fabio").collection("deleted")
		var deleted = {}
		deleted.date = Math.round(+new Date()/1000) // unix datestamp
		deleted.user = message.author.id
		deleted.text = message.content.toString()
		deleted.platform = cat.bot_platform

		var result = collection.insertOne(deleted, function(err,result) {
			if (err) throw err

			console.log("Deleted: ")
			console.log(deleted)

			return
		})
	})
}


function loadNaughtyList(user = "") {
	var query = { }
	if (user) {
		query.user = user
	}

	var formatting = { date:1,user:1,text:1, _id:0}
		var initializePromise = fabio.getDataMongo("fabiobot","messages",query,formatting)
		initializePromise.then(function(result) {
				naughty_list = result
				console.log("Initialized naughty list");
				// Use user details from here
				return result
				resolve(result)
		}, function(err) {
				console.log(err);
		})
}

function getFabioReplies() {
	var query = { }
	var formatting = { }
		var initializePromise = fabio.getDataMongo("fabiobot","replies",query,formatting)
		initializePromise.then(function(result) {
				fabiosFabio = result
				console.log("Initialized fsbio replies");
				// Use user details from here
				//console.log(catsMeow)
				return result
				resolve(result)
		}, function(err) {
				console.log(err);
		})
}





client.login(bot_secret.bot_secret_token)
