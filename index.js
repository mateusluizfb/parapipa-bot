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
    prefix = 'parapipa'
  	if (!message.content.startsWith(prefix) || message.author.bot) return;

  	const args = message.content.slice(prefix.length).trim().split(/ +/);
  	const command = args.shift().toLowerCase();

  	if (command === '-ligar') {
      BOT_TOGGLE = true
      const emoji = client.emojis.cache.find(emoji => emoji.name === "rodney")
  		message.channel.send(`ParapipaBot ligado ${emoji}`);
  	} else if (command === '-desligar') {
      BOT_TOGGLE = false
      const emoji = client.emojis.cache.find(emoji => emoji.name === "rodinelson")
      message.channel.send(`ParapipaBot desligado ${emoji}`);
  	} else if (command === '-help') {
      message.channel.send('Parapipa parapupa! Mande parapipa-ligar ou parapipa-desligar!! E parapipa-agora para ver o estado atual :)');
    } else if (command === '-agora') {
      message.channel.send(`Parapipa parapupa está: ${BOT_TOGGLE}`);
    }
  });


  client.on('voiceStateUpdate', (oldState, newState) => {
    console.log("User logged:")
    console.log(newState.member.user)

    if (newState.member.user.id == process.env.USER_ID) {
      console.log("Issuing sound for user:")
      console.log(newState.member.user)

      let voiceChannel = newState.member.voice.channel
      if(voiceChannel == null || BOT_TOGGLE == false) return

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
