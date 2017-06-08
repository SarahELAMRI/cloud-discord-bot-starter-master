const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var translate = require('@google-cloud/translate')({
  projectId:'platinum-lead-116015',
  key: 'AIzaSyBrWCsacfWvZ3NFtioEM42wkVwxTwwPG-g'
})
var options = {
  from: 'en',
  to: 'es'
};


// https://www.npmjs.com/package/@google-cloud/translate

//var elem

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
  if (msg.content === 'trad') {
      //console.log(msg.content)
      //console.log('la')
      //elem = msg.content.substring(msg.content.lastIndexOf('!trad ') + '!trad '.length, msg.content.length)
    translate.translate('Hello', options, function(err, translation) {
  if (!err) {
    // translation = 'Hola'
    msg.channel.sendMessage(translation)
  }
      msg.channel.sendMessage(translation)
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
