const Discord = require("discord.js")

const client = new Discord.Client()
client.login(process.env.BOT_TOKEN)

// install ffmpeg

client.on('voiceStateUpdate', (oldState, newState) => {
    // check for bot

    if (newState.member.user.username == 'Mateus Luiz') {
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
