const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

//$ npm install youtube-node


var YouTube = require('youtube-node')

var youTube = new YouTube()

youTube.setKey('AIzaSyBVQcdqQnbBH8jtfLAqOWfcqf3Lz5CDqlA') // clé API Youtube

var titre

// Instructions bot 
client.on('ready', () => {
	    console.log(`Logged in as ${client.user.username}!`)
	})


client.on('message', msg => {
    if (msg.content.lastIndexOf('!youtube') !== -1) {
          titre = msg.content.substring(msg.content.lastIndexOf('!youtube ') + '!youtube '.length, msg.content.length)
            youTube.search(titre,3, function(error, result) {
                     if (error) {
                           console.log(error);
                     }
                       else {
			       for (var i = 0; i < 3; i++) {
			       //console.log(JSON.stringify(result, null, 2))
			       msg.channel.send(result.items[i].snippet.title, msg)
			       }
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
