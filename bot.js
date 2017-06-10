const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var googleTranslate = require('google-translate')('AIzaSyDigkouz1Xs0GvSmTDERMrMsX5kiVxtRmY')
//Pour se connecter à l'API google translate

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return
   // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.content === 'hello') {
      // If message is hello, post hello too
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
  var text = msg.content
  //Affecte text au message poste
  if (msg.content.match('help')) {
      //Aide pour la forme du message a taper
      msg.channel.send('Exemple trad en maison pour traduire maison en anglais')
}
  if (text.substr(0,4) === 'trad') {
      //Condition: message doit commencer par trad
      
    console.log('la')
    var lang = text.substring(5, 7)
    //deux lettres suivant trad indiquent la langue de traduction
    console.log(lang)
    googleTranslate.translate(text.substr(8), text.substring(5, 7), function (err, translation) {
        //Fonction de google translate permettant la traduction avec comme arguments le mot a traduire, la langue de traduction
      if (err) {
        console.log('Error', err)
      }
      console.log(translation)
      if (typeof translation === 'undefined') { // Si le mot suivant trad n'est pas compris
        msg.channel.send('Langue non supportée') // Message d'erreur
      } else {
        msg.channel.send(translation.translatedText) // Renvoie le(s) mot(s) traduit(s)
      }
    })
  }
})
client.login(config.token)
