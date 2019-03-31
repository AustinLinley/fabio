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
   (fb_input) {

      if (fb_input.includes("NES")) { retString = "Nintendo does what Segadon't. Ha see what i did there." }
      if (fb_input.includes("!Game")) { retString = "Is it game time already?" }
      if (fb_input.includes("!Bro")) { retString = "Bro Fist" }
      if (fb_input.includes("!Sega")) { retString = "Can stay being a publisher" }

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

  randomFabio: function() {
    var fabioFabio = []
    fabioFabio[0]  = "Fabio"
    fabioFabio[1]  = "Super Mario Bros."
    fabioFabio[2]  = "Super Mario Bros. 2"
    fabioFabio[3]  = "Super Mario Bros. 3"
    fabioFabio[4]  = "Mega Man"
    fabioFabio[5]  = "Mega Man 2"
    fabioFabio[6]  = "Mega Man 3"
    fabioFabio[7]  = "Mega Man 4"
    fabioFabio[8]  = "Mega Man 5"
    fabioFabio[9]  = "Mega Man 6"
    fabioFabio[10] = "The Legend of Zelda"
    fabioFabio[11] = "Zelda II: The Adventure of Link"
    fabioFabio[12] = "https://www.youtube.com/watch?v=xTElIdBy3vY"
    fabioFabio[13] = "Adventure Island"
    fabioFabio[14] = "Adventure Island II"
    fabioFabio[15] = "Castlevania"
    fabioFabio[16] = "Castlevania II: Simon's Quest"
    fabioFabio[17] = "Castlevania III: Dracula's Curse"
    fabioFabio[18] = "Donkey Kong - Arcade Classics Series"
    fabioFabio[19] = "Donkey Kong"
    fabioFabio[20] = "Donkey Kong Jr."
    fabioFabio[21] = "Donkey Kong 3"
    fabioFabio[22] = "Donkey Kong Jr. Math"
    fabioFabio[23] = "Excitebike"

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
