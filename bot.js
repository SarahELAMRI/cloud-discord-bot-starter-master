const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()


var SpotifyWebApi = require('spotify-web-api-node')
var clientid = '685eba1d89104afda1af8026b9d43f90'
var clientSecret = '4015d54a8f004ba2b5048de3b7ab6310'
var spotifyApi = new SpotifyWebApi({
  clientId: clientid,
  clientSecret: clientSecret
})

var track
client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  if (msg.content.lastIndexOf('!spotify') !== -1) {
        spotifyApi.clientCredentialsGrant()
        then(function (data) {
   //     console.log('The access token expires in ' + data.body['expires_in'])
   //     console.log('The access token is ' + data.body['access_token'])
          spotifyApi.setAccessToken(data.body['access_token'])
 // }
          if (msg.content.match('!spotify *')) {
            track = msg.content.substring(msg.content.lastIndexOf('!spotify ') + '!spotify '.length, msg.content.length)
 // Recherche Albums
            spotifyApi.searchTracks('album:' + track)
              .then(function (data) {
              msg.channel.sendMessage('Top 3 des albums : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.tracks.items[i].album.name + '" de ' + data.body.tracks.items[i].artists[0].name)
              }
            }, function (err) {
              console.error(err)
            })
 // Recherche Chansons
          spotifyApi.searchTracks('track:' + track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des chansons : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.tracks.items[i].name + '" de ' + data.body.tracks.items[i].artists[0].name)
              }
            }, function (err) {
              console.error(err)
            })
 //Recherche Artistes
          spotifyApi.searchArtists(track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des artistes : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.artists.items[i].name + '"')
              }
            }, function (err) {
              console.error(err)
            })
      // fin partie avec les trois paramètres
      }
  })
  }
})
client.login(config.token)



const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

// https://github.com/thelinmichael/spotify-web-api-node
// Spotify //
var SpotifyWebApi = require('spotify-web-api-node')
var clientid = '132f44ff456c41d29d544a608b448bbd'
var clientSecret = '25d2c3ee445140bfa9aaa3d6bcdc194b'
var spotifyApi = new SpotifyWebApi({
  clientId: clientid,
  clientSecret: clientSecret
})
var track

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  if (msg.content.lastIndexOf('!spotify') !== -1) {
    spotifyApi.clientCredentialsGrant()
      .then(function (data) {
        console.log('The access token expires in ' + data.body['expires_in'])
        console.log('The access token is ' + data.body['access_token'])
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token'])
        else if (msg.content.match('!spotify *') & !msg.content.match('Taper !spotify et votre choix pour afficher le top 3*')) {
          track = msg.content.substring(msg.content.lastIndexOf('!spotify ') + '!spotify '.length, msg.content.length)
          spotifyApi.searchTracks('album:' + track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des albums pour votre recherche : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.tracks.items[i].album.name + '" de ' + data.body.tracks.items[i].artists[0].name)
              }
            }, function (err) {
              console.error(err)
            })
          spotifyApi.searchTracks('track:' + track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des chansons pour votre recherche : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.tracks.items[i].name + '" de ' + data.body.tracks.items[i].artists[0].name)
              }
            }, function (err) {
              console.error(err)
            })
          spotifyApi.searchArtists(track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des artists pour votre recherche : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.artists.items[i].name + '"')
              }
            }, function (err) {
              console.error(err)
            })
        }
      }, function (err) {
        console.log('Something went wrong when retrieving an access token', err.message)
      })
  }
}
)
client.login(config.token)
