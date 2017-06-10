//const Discord = require('discord.js')
//const config = require('./config.js')
//const client = new Discord.Client()

//var translate = require('@google-cloud/translate')({
//  projectId:'platinum-lead-116015',
//  key: 'AIzaSyBrWCsacfWvZ3NFtioEM42wkVwxTwwPG-g'
//})
//var options = {
//  from: 'en',
  //to: 'es'
//};


// https://www.npmjs.com/package/@google-cloud/translate

//var elem

//client.on('ready', () => {
//  console.log(`Logged in as ${client.user.username}!`)
//})

//client.on('message', msg => {
//  if (msg.content === 'hello') {
//    msg.channel.sendMessage('Hello to you too, fellow !')
//  }
 // if (msg.content === 'trad') {
      //console.log(msg.content)
      //console.log('la')
      //elem = msg.content.substring(msg.content.lastIndexOf('!trad ') + '!trad '.length, msg.content.length)
 //   translate.translate('Hello', options, function(err, translation) {
 // if (!err) {
    // translation = 'Hola'
 //   msg.channel.sendMessage(translation)
 // }
  //    msg.channel.sendMessage(translation)
  //  })
//}
      //translate.translate(elem, 'en', function (err, translation) {
       // if (!err) {
        //  msg.channel.sendMessage(translation)
     //   }
     // })
   //}
//})

//client.login(config.token)

const Discord = require('discord.js')
const config = require('./config.js')
// const translate = require('./services/translate.js')
const client = new Discord.Client()
var googleTranslate = require('google-translate')('AIzaSyBrWCsacfWvZ3NFtioEM42wkVwxTwwPG-g') // APPEL API GOOGLE TRANSLATE

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
  var text = msg.content // CONTENU DU MESSAGE POSTE
  if (text.substr(0, 9) === 'translate') { // SI LE MSG COMMENCE PAR translate
    console.log('loopOK')
    var lang = text.substring(10, 12) // LE CODE LANGUE EST LES 2 CARACTERES SUIVANTS
    console.log(lang)
    googleTranslate.translate(text.substr(13), text.substring(10, 12), function (err, translation) { // FONCTION DU TRADUCTION GOOGLE
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
