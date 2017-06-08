const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var translate = require('@google-cloud/translate')({
  key: 'AIzaSyCMbHLobaf5DZpKTucV9_7WvtxxKX7Q4S0'
})

// https://www.npmjs.com/package/@google-cloud/translate

//var elem

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
  if (msg.content.match('trad')) {
      //console.log(msg.content)
      //console.log('la')
      //elem = msg.content.substring(msg.content.lastIndexOf('!trad ') + '!trad '.length, msg.content.length)
    translate.translate('Bonjour', 'en', function(err, translation) {
  if (!err) {
    // translation = 'Hola'
    msg.channel.sendMessage(translation)
  }
      
    })
}
      //translate.translate(elem, 'en', function (err, translation) {
       // if (!err) {
        //  msg.channel.sendMessage(translation)
     //   }
     // })
   //}
}
)

client.login(config.token)
