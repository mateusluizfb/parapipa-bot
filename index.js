const express = require('express')
const app = express()
require('dotenv').config()

app.listen(process.env.PORT || 3000, () => {
  const Discord = require("discord.js")

  console.log("Starting Bot")
  console.log(`Token: ${process.env.BOT_TOKEN}`)
  console.log(`For user ${process.env.USER_ID}`)

  const client = new Discord.Client()

  client.on('voiceStateUpdate', (oldState, newState) => {
    console.log("User logged:")
    console.log(newState.member.user)

    if (newState.member.user.id == process.env.USER_ID) {
      console.log("Issuing sound for user:")
      console.log(newState.member.user)

      let voiceChannel = newState.member.voice.channel
      if(voiceChannel == null) return

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
