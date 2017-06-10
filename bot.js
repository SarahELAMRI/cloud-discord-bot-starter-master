const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

//$ npm install youtube-node


var YouTube = require('youtube-node');

var youTube = new YouTube();

youTube.setKey('AIzaSyBWTMi3IPxFmIe1yaVg7lcHEmztQm5m0oc'); // clé API Youtube

var track

// Instructions bot 
client.on('message', msg => {
    if (msg.content.match('!youtube *') & !msg.content.match('Taper !youtube suivi de la recherche*')) {
          track = msg.content.substring(msg.content.lastIndexOf('!youtube ') + '!youtube '.length, msg.content.length)
      
//recherche des 3 resultats
youTube.search( track , 3, function(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(result, null, 3));
  }
  
});
      
}

client.login(config.token)
