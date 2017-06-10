const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()


//$ npm i --save youtube-api
//$ npm install youtube-node

var YoutubeWebApi = require('youtube-web-api-node')
var clientid = 'AIzaSyBWTMi3IPxFmIe1yaVg7lcHEmztQm5m0oc'//clé API youtube

var youtubeApi = new YoutubeWebApi({
  clientId: clientid,
})
var track
//pas besoin de log in pour youtube
//client.on('ready', () => {
  //console.log(`Logged in as ${client.user.username}!`)
//})

client.on('message', msg => {
  if (msg.content.lastIndexOf('!spotify') !== -1) {
    youtubeApi.clientCredentialsGrant()
      .then(function (data) {
        console.log('The access token expires in ' + data.body['expires_in'])
        console.log('The access token is ' + data.body['access_token'])
        youtubeApi.setAccessToken(data.body['access_token'])
        if (msg.content.match('!youtube help*')) {
          msg.channel.sendMessage('Taper !youtube track suivi de la recherche')
          msg.channel.sendMessage('Taper !youtube artiste suivi de la recherche')
          msg.channel.sendMessage('Taper !youtube album suivi de la recherche')
          
  // Instruction Chanson
        } else if (msg.content.match('!youtube track *') & !msg.content.match('Taper !youtube track suivi de la recherche*')) {
          track = msg.content.substring(msg.content.lastIndexOf('!youtube track ') + '!youtube track '.length, msg.content.length)
          youtubeApi.searchTracks(track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des chansons : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.tracks.items[i].name + '" de ' + data.body.tracks.items[i].artists[0].name)
              }
            }, function (err) {
              console.error(err)
            })
  //Instruction Artiste
        } else if (msg.content.match('!youtube artiste *') & !msg.content.match('Taper !youtube artiste suivi de la recherche*')) {
          track = msg.content.substring(msg.content.lastIndexOf('!spotify artiste ') + '!spotify artiste '.length, msg.content.length)
          youtubeApi.searchArtists(track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des artistes : ' + track)
              for (var i = 0; i < 3; i++) {
                if (data.body.artists.items[i].genres[0] !== undefined) {
                  msg.channel.sendMessage('"' + data.body.artists.items[i].name + '" Genre : ' + data.body.artists.items[i].genres[0])
                } else {
                  msg.channel.sendMessage(data.body.artists.items[i].name)
                }
              }
            }, function (err) {
              console.error(err)
            })
  //Instructions Album
        } else if (msg.content.match('!youtube album *') & !msg.content.match('Taper !youtube album suivi de la recherche*')) {
          track = msg.content.substring(msg.content.lastIndexOf('!youtube album ') + '!youtube album '.length, msg.content.length)
          youtubeApi.searchTracks('album:' + track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des albums : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.tracks.items[0].album.name + '" de ' + data.body.tracks.items[i].album.artists[0].name)
              }
            }, function (err) {
              console.error(err)
            })
      }, function (err) {
        console.log('Something went wrong when retrieving an access token', err.message)
      })
  }
}
)
client.login(config.token)
