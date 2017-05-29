const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
});

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return
  
    function defineRequest() {
    // See full sample for buildApiRequest() code, which is not 
// specific to a particular youtube or youtube method.

var YouTube = require('youtube-node');

var youTube = new YouTube();

youTube.setKey('AIzaSyBWTMi3IPxFmIe1yaVg7lcHEmztQm5m0oc'); // clé obtenu avec google 
  // ajouter avriable de recherche  
// If message is nom de la recherche, post results
  if (msg.content === 'hello') { // remplacer hello par la variable de recherche
    
youTube.search('World War z Trailer', 3, function(error, result) { // changer avec la recherche
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(result, null, 3));
  }
});
    msg.channel.sendMessage('Here is the result of your research, fellow !')
  } 
})

client.login(config.token)
