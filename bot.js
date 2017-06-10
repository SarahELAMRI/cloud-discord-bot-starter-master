const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

//https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c08

const Twitter = require('twitter')
//info compte twitter et bot 
//https://apps.twitter.com/app/13890179/keys
const clientTwitter = new Twitter({
  consumer_key: 'TQ70nj7GRuTqixlKfvQ6OEv8z',
  consumer_secret: 'H2gvkxWBYhv3j4AYAg3VepqvZJlYGXZ0jsdRbBDtbg1jMSidLR',
  access_token_key: '871798636858019841-asbpxQTGadx6AeEef5jq1weGkFllbAY',
  access_token_secret: 'TqBhzV3kta7whL0VjS80TKlRq8GZBpL6uqAmjZIrc3CXD'
})

const params = {screen_name: 'nodejs'}
clientTwitter.get('statuses/user_timeline', params, function (error, tweets, response) {
  if (!error) {
    console.log(tweets)
  }
})
  clientTwitter.get('search/tweets', {q: 'sarah_alvine'}, function webhook (error, tweets, response) {
  if (error) throw error
  const hook = new Discord.WebhookClient('', 'MzEzNjQ3NjQzMTIzMzg0MzIy.DA2eFg.p68DBnRVtBQUXsyEcnmABUIMrCc')
  var webhook = tweets.statuses[0].text
  
  })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Verification bot et channel
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return
  
 if(msg.content ==='Mytweets') {
  clientTwitter.get('search/tweets', {q: 'sarah_alvine'}, function webhook (error, tweets, response) {
    if (error) throw error
    var webhook = tweets.statuses[0].text
    console.log(webhook)
    msg.channel.sendMessage(webhook)
    msg.channel.sendMessage(response)
    msg.channel.sendMessage(tweets)
    
  })
 }
 


  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
  //Poste Vive Twitter si message = twitter
   if (msg.content === 'twitter') {
    clientTwitter.post('statuses/update', {status: 'Vive twitter'}, function (error, tweet, response) {
      if (error) throw error
      console.log(tweet)
      console.log(response)
      msg.channel.sendMessage('Ton tweet est publié')
    })
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
})

client.login(config.token)
