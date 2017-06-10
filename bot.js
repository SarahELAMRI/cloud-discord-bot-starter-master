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
  // Bot Spotify //
  if (msg.content.lastIndexOf('!spotify') !== -1) {
    spotifyApi.clientCredentialsGrant()
      .then(function (data) {
        console.log('The access token expires in ' + data.body['expires_in'])
        console.log('The access token is ' + data.body['access_token'])
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token'])
        track = msg.content.substring(msg.content.lastIndexOf('!spotify ') + '!spotify '.length, msg.content.length)
        spotifyApi.searchTracks('album:' + track)
          .then(function (data) {
          msg.channel.sendMessage('Top 3 des albums pour votre recherche : ' + track)
          for (var i = 0; i < 3; i++) {
            msg.channel.sendMessage('"' + data.body.tracks.items[i].album.name + '" de ' + data.body.tracks.items[i].artists[0].name)
          }
          })
    })
}
})
client.login(config.token)
