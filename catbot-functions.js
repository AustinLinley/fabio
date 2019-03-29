module.exports = {
  reply: function(msg) {
    var fb_input
    if (msg) { fb_input = msg.toString().toLowerCase() }

    // console.log("Reply message: " + msg)

    // return a random string sometimes, but mostly meow
    var weightedOdds = Math.random()
    var retString = "Fabio"
    if (weightedOdds < .25) {
      retString = this.randomFabio()
    }

    // randomly do nothing, .5% chance
    /* disabling because it keeps breaking stuff
    var randomlyDoNothing = Math.random();
    if (randomlyDoNothing < .05) {
      console.log("Randomly did nothing... like a cat")
      retString = ""
    }
    */

    // !commands
    if (fb_input) {

      if (fb_input.includes("!fish")) { retString = this.randomFishEmoji() }
      if (fb_input.includes("!treat")) { retString = this.randomTreatEmoji() }
      if (fb_input.includes("!purr")) { outputFlag = true; retString = "Purrr" }
      if (fb_input.includes("!pineapple")) { outputFlag = true; retString = ":pineapple:" }

    }

    return retString
  },

  play: function(msg) {
    var nowPlaying

    if (msg) {
      nowPlaying = msg
    } else {
      var nowPlaying = this.randomPlaying()
    }

    return nowPlaying
  },

    if (msg.includes("meow")) { emoji.push(this.randomCatEmoji()) }
    if (msg.includes("chat")) { emoji.push(this.randomCatEmoji()) }
    if (msg.includes("mew")) { emoji.push(this.randomCatEmoji()) }
    if ((msg.includes("cat")) && (!(msg.includes("catbot")))) { emoji.push(this.randomCatEmoji()) }
    if ((msg.includes("meow")) || (msg.includes("kitt"))) { emoji.push(this.randomCatEmoji()) }
    console.log(emoji)
    return emoji
  },

  randomFabio: function() {
    var catMeow = []
    catMeow[0]  = "Meow?"
    catMeow[1]  = "Purrrr"
    catMeow[2]  = "Mew"
    catMeow[3]  = "Mewtwo"
    catMeow[4]  = "Mrrrrow"
    catMeow[5]  = "Maowow"
    catMeow[6]  = "Mrrrrrreow"
    catMeow[7]  = "Ring-ding-ding-ding-dingeringeding! Wa-pa-pa-pa-pa-pa-pow!"
    catMeow[8]  = "You have cat to be kitten me"
    catMeow[9]  = "Prrrrrrrrr"
    catMeow[10] = "Moo"
    catMeow[11] = "I hate Mondays"
    catMeow[12] = "Feed me"
    catMeow[13] = "I love lasagna"
    catMeow[14] = "I'll see you in another life, when we are both cats"
    catMeow[15] = "Miau"
    catMeow[16] = "Nyan"
    catMeow[17] = "Meo"
    catMeow[18] = "Miaou"
    catMeow[19] = "Miao"
    catMeow[20] = "мяу-мяу"
    catMeow[21] = "мур-мур"
    catMeow[22] = "Woof!"
    catMeow[23] = "ニャー"

    var ret = Math.floor(Math.random() * fabioFabio.length)
    return fabioFabio[ret]
  },

  randomPlaying: function() {
    var fabioPlaying = []
    fabioPlaying[0]  = "After Burner"
    fabioPlaying[1]  = "Batman: The Video Game"
    fabioPlaying[2]  = "Blaster Master"
    fabioPlaying[3]  = "Demon Sword"
    fabioPlaying[4]  = "Destination Earthstar"
    fabioPlaying[5]  = "Duck Hunt"
    fabioPlaying[6]  = "Dynowarz: The Destruction of Spondylus"
    fabioPlaying[7]  = "Excitebike"
    fabioPlaying[8]  = "Faxanadu"
    fabioPlaying[9]  = "Gyromite"
    fabioPlaying[10] = "Ironsword: Wizards & Warriors II"
    fabioPlaying[11] = "King's Knight"
    fabioPlaying[12] = "Life Force"
    fabioPlaying[13] = "Mega Man 3"
    fabioPlaying[14] = "Mickey Mousecapade"
    fabioPlaying[15] = "Othello"
    fabioPlaying[16] = "Pin Bot"
    fabioPlaying[17] = "Pinball Quest"
    fabioPlaying[18] = "Quattro Sports"
    fabioPlaying[19] = "R.C. Pro-Am"
    fabioPlaying[20] = "Smash T.V."
    fabioPlaying[21] = "Star Voyager"
    fabioPlaying[22] = "Star Tropics"
    fabioPlaying[23] = "Super Mario Bros. / Duck Hunt / World Class Track Meet"
    fabioPlaying[24] = "Time Lord"
    fabioPlaying[25] = "Wizards & Warriors"

    var randomFabioPlaying = Math.floor(Math.random() * fabioPlaying.length)
    var retString = fabioPlaying[randomFabioPlaying]

    return retString
  }
}
