const express = require('express')
const app = express()
require('dotenv').config()

let BOT_TOGGLE = false;

app.listen(process.env.PORT || 3000, () => {
  const Discord = require("discord.js")

  console.log("Starting Bot")
  console.log(`Token: ${process.env.BOT_TOKEN}`)
  console.log(`For user ${process.env.USER_ID}`)

  const client = new Discord.Client()

  client.on('message', message => {
  	if (!message.content.startsWith(prefix) || message.author.bot) return;

  	const args = message.content.slice(prefix.length).trim().split(/ +/);
  	const command = args.shift().toLowerCase();

  	if (command === 'parapipa-ligar') {
      BOT_TOGGLE = true
  		message.channel.send('ParapipaBot ligado.');
  	} else if (command === 'parapipa-desligar') {
      BOT_TOGGLE = false
  		message.channel.send('ParapipaBot desligado.');
  	} else if (command === 'parapipa-help') {
      message.channel.send('mande parapipa-ligar ou parapipa-desligar');
    }
  });


  client.on('voiceStateUpdate', (oldState, newState) => {
    console.log("User logged:")
    console.log(newState.member.user)

    if (newState.member.user.id == process.env.USER_ID) {
      console.log("Issuing sound for user:")
      console.log(newState.member.user)

      let voiceChannel = newState.member.voice.channel
      if(voiceChannel == null || BOT_TOGGLE == true) return

      voiceChannel.join(voiceChannel).then(connection =>{
        const dispatcher = connection.play('./minion.mp3')
        dispatcher.on("finish", end => { voiceChannel.leave() })
      }).catch(err => console.log(err))

      return
    }

    return
  })

  client.login(process.env.BOT_TOKEN)
})
