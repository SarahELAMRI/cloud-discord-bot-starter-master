const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()



const Twitter = require('twitter')
//info compte twitter et bot 
const clientTwitter = new Twitter({
  consumer_key: 'TQ70nj7GRuTqixlKfvQ6OEv8z',
  consumer_secret: 'H2gvkxWBYhv3j4AYAg3VepqvZJlYGXZ0jsdRbBDtbg1jMSidLR',
  access_token_key: '871798636858019841-asbpxQTGadx6AeEef5jq1weGkFllbAY',
  access_token_secret: 'TqBhzV3kta7whL0VjS80TKlRq8GZBpL6uqAmjZIrc3CXD'
})
//Pour se connecter à l'API google translate
var googleTranslate = require('google-translate')('AIzaSyDigkouz1Xs0GvSmTDERMrMsX5kiVxtRmY')
// Spotify //
var SpotifyWebApi = require('spotify-web-api-node')
var clientid = '132f44ff456c41d29d544a608b448bbd'
var clientSecret = '25d2c3ee445140bfa9aaa3d6bcdc194b'
var spotifyApi = new SpotifyWebApi({
  clientId: clientid,
  clientSecret: clientSecret
})
//CONNECTION A L'API YOUTUBE
var YouTube = require('youtube-node')

var youTube = new YouTube()

youTube.setKey('AIzaSyBVQcdqQnbBH8jtfLAqOWfcqf3Lz5CDqlA') // clé API Youtube

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Verification bot et channel
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return
  //ON RECUPERE LES TWEETS MENTIONNANT L'ID DU COMPTE TWITTER
 if(msg.content ==='Mytweets') {
  clientTwitter.get('search/tweets', {q: 'sarah_alvine'}, function webhook (error, tweets, response) {
    if (error) throw error
    msg.channel.send(tweets.statuses[0].text)
    
  })
 }
 


  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
 // tweet du bot avec vérification du nombre de caractères
  if (msg.content.match('!twit*') !== null) {
    const tweety = msg.content.substring(6, msg.content.length)
    if (tweety.length <= 140) {
      clientTwitter.post('statuses/update', {status: tweety}, function (error, tweet, response) {
        if (error) throw error
        console.log(tweet)
        console.log(response)
        msg.channel.sendMessage('Ton tweet a été publié!')
      })
    } else {
      msg.channel.sendMessage('Ton tweet contient plus de 140 caractères.')
    }
  }
  
  //Bot google Traduction
	//Affecte la variable text au message posté
  var text = msg.content
	  //si le message est help
	  if (msg.content.match('help')) {
	      //Aide pour la forme du message a taper
	      msg.channel.send('Exemple trad en maison pour traduire maison en anglais')
	}
	//Condition: message doit commencer par trad
	  if (text.substr(0,4) === 'trad') {
	      
	    console.log('la')
	    var lang = text.substring(5, 7)  //deux lettres suivant trad indiquent la langue de traduction
	    console.log(lang)
	    googleTranslate.translate(text.substr(8), text.substring(5, 7), function (err, translation) {
	        //Fonction de google translate permettant la traduction avec comme arguments le mot a traduire, la langue de traduction
	      if (err) { //en cas d'erreur
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
	//BOT SPOTIFY
	var track
	//SI LE MESSAGE COMMENCE PAR !SPOTIFY
	if (msg.content.lastIndexOf('!spotify') !== -1) {
    spotifyApi.clientCredentialsGrant()
      .then(function (data) {
        console.log('The access token expires in ' + data.body['expires_in'])
        console.log('The access token is ' + data.body['access_token']) //ON SAUVEGARDE L'ACCESS TOKEN
        spotifyApi.setAccessToken(data.body['access_token'])
	    //Track varaible qu'on affecte à ce qui suit !spotify
        track = msg.content.substring(msg.content.lastIndexOf('!spotify ') + '!spotify '.length, msg.content.length)
	    //RECHERCHE ALBUMS
        spotifyApi.searchTracks('album:' + track)
          .then(function (data) {
          msg.channel.sendMessage('Top 3 des albums pour votre recherche : ' + track)
		//Boucle pour affichage de 3 résultats
          for (var i = 0; i < 3; i++) {
            msg.channel.sendMessage('"' + data.body.tracks.items[i].album.name + '" de ' + data.body.tracks.items[i].artists[0].name)
          }
          })
	    //RECHERCHE ARTISTES
	    spotifyApi.searchArtists(track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des artists pour votre recherche : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.artists.items[i].name + '"')
              }
            })
	    //RECHERCHE CHANSONS
	    spotifyApi.searchTracks('track:' + track)
            .then(function (data) {
              msg.channel.sendMessage('Top 3 des chansons pour votre recherche : ' + track)
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.tracks.items[i].name + '" de ' + data.body.tracks.items[i].artists[0].name)
              }
            })
    })
}
	//BOT YOUTUBE
	var titre
	//Message doit commencer par !youtube
	if (msg.content.lastIndexOf('!youtube') !== -1) {
          titre = msg.content.substring(msg.content.lastIndexOf('!youtube ') + '!youtube '.length, msg.content.length)
		//fonction api youtube de recherche
            youTube.search(titre,3, function(error, result) {
                     if (error) {
                           console.log(error);
                     }
                       else {
			       for (var i = 0; i < 3; i++) {
			       msg.channel.send(result.items[i].snippet.title, msg) //On affiche les titres des vidéos youtube trouvés
			       }
			}
	    })
    }
})

client.login(config.token)
