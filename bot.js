const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

//$ npm install youtube-node


var YouTube = require('youtube-node')

var youTube = new YouTube()

youTube.setKey('AIzaSyBVQcdqQnbBH8jtfLAqOWfcqf3Lz5CDqlA') // clé API Youtube

var track

// Instructions bot 
client.on('ready', () => {
	    console.log(`Logged in as ${client.user.username}!`)
	})


client.on('message', msg => {
    if (msg.content.lastIndexOf('!youtube') !== -1) {
          track = msg.content.substring(msg.content.lastIndexOf('!youtube ') + '!youtube '.length, msg.content.length)
            youTube.search(track,3, function(error, result) {
                     if (error) {
                           console.log(error);
                     }
                       else {
			       msg.channel.sendMessage(result.snippet.text)
			}
	    })
    }
      
})

client.login(config.token)

      
//recherche des 3 resultats
//youTube.search( track , 3, function(error, result) {
//  if (error) {
//    console.log(error);
//  }
//  else {
//    console.log(JSON.stringify(result, null, 3));
//  }
  
//});
        
//autre essai
