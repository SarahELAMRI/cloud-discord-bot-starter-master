const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var spotifyApi = new SpotifyWebApi({
  clientId : 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
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
        spotifyApi.setAccessToken(data.body['access_token'])
        if (msg.content.match('!spotify help*')) {
          msg.channel.sendMessage('Taper !spotify track suivi de la recherche')
          msg.channel.sendMessage('Taper !spotify artiste suivi de la recherche')
          msg.channel.sendMessage('Taper !spotify album suivi de la recherche')
          //Pour tous 
          msg.channel.sendMessage('Taper !spotify suivi de la recherche')
        
  // Instruction Chanson
        } else if (msg.content.match('!spotify track *') & !msg.content.match('Taper !spotify track suivi de la recherche*')) {
          track = msg.content.substring(msg.content.lastIndexOf('!spotify track ') + '!spotify track '.length, msg.content.length)
          spotifyApi.searchTracks(track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des chansons : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.tracks.items[i].name + '" de ' + data.body.tracks.items[i].artists[0].name)
              }
            }, function (err) {
              console.error(err)
            })
  //Instruction Artiste
        } else if (msg.content.match('!spotify artiste *') & !msg.content.match('Taper !spotify artiste suivi de la recherche*')) {
          track = msg.content.substring(msg.content.lastIndexOf('!spotify artiste ') + '!spotify artiste '.length, msg.content.length)
          spotifyApi.searchArtists(track)
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
        } else if (msg.content.match('!spotify album *') & !msg.content.match('Taper !spotify album suivi de la recherche*')) {
          track = msg.content.substring(msg.content.lastIndexOf('!spotify album ') + '!spotify album '.length, msg.content.length)
          spotifyApi.searchTracks('album:' + track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des albums : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.tracks.items[0].album.name + '" de ' + data.body.tracks.items[i].album.artists[0].name)
              }
            }, function (err) {
              console.error(err)
            })
          
 //Instruction pour la recherche avec chanson, artiste et album 
        } else if (msg.content.match('!spotify *') & !msg.content.match('Taper !spotify suivi de la recherche*')) {
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
        }
      // fin partie avec les trois paramètres
      }, function (err) {
        console.log('Something went wrong when retrieving an access token', err.message)
      })
  }
}
)
client.login(config.token)
