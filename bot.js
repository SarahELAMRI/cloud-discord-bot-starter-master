const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
// clé pour API
var API_KEY = 'AIzaSyCvwWHyl3-w3fVPCgOrWbfqWFTi7fxJ_yg'

var translate = require('@google-cloud/translate')({
  key: API_KEY
})


var tx

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  if (msg.content.match('!traduire *')) {
    console.log(msg.content)
    if (msg.content.match('!traduire help*')) {
      msg.channel.sendMessage('Taper !traduire Votre_texte traduction du texte en anglais')
    } else if (msg.content.match('!traduire lg:[A-Za-z][A-Za-z] *') && !msg.content.match('Taper !traduire Votre_texte traduction du texte en anglais')) {
      tx = msg.content.substring(11, msg.content.length)
      console.log(msg.content)
      console.log('ici')
      var language = msg.content.substring(9, 11, msg.content.length)
      translate.translate(tx, language, function (err, translation) {
        if (!err) {
          msg.channel.sendMessage(translation)
        }
      })
    } else if (msg.content.match('!traduire*') && !msg.content.match('Taper !traduire Votre_texte traduction du texte en anglais')) {
      console.log(msg.content)
      console.log('la')
      tx = msg.content.substring(msg.content.lastIndexOf('!traduire ') + '!traduire '.length, msg.content.length)
      translate.translate(tx, 'en', function (err, translation) {
        if (!err) {
          msg.channel.sendMessage(translation)
        }
      })
    }
  }
}
)

client.login(config.token)
