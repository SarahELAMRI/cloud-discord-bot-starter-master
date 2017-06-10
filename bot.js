const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var googleTranslate = require('google-translate')('AIzaSyDigkouz1Xs0GvSmTDERMrMsX5kiVxtRmY')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
  var text = msg.content
  if (msg.content.match('help')) {
      msg.channel.send('Exemple trad en maison pour traduire maison en anglais')
}
  if (text.substr(0,4) === 'trad') {
    console.log('la')
    var lang = text.substring(5, 7)
    console.log(lang)
    googleTranslate.translate(text.substr(8), text.substring(5, 7), function (err, translation) {
      if (err) {
        console.log('Error', err)
      }
      console.log(translation)
      if (typeof translation === 'undefined') { // SI LE CODE LANGUE N'EST PAS COMPRIS
        msg.channel.send('Langue non supportée') // RENVOI UN MESSAGE D'ERREUR
      } else {
        msg.channel.send(translation.translatedText) // POSTE LE MESSAGE TRADUIT
      }
    })
  }
})
client.login(config.token)
