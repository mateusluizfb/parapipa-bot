const Discord = require("discord.js")
const stateCommandsMessageListener = require('./message/state_commands_message_listener.js')
const playMinionSoundVoiceListener = require('./voiceStateUpdate/play_minion_sound_voice_listener.js')

function subscribe(client) {
  client.on('message', stateCommandsMessageListener)
  client.on('voiceStateUpdate', playMinionSoundVoiceListener)
}

module.exports = {
  start: () => {
    const client = new Discord.Client()
    subscribe(client)
    client.login(process.env.BOT_TOKEN)
  }
}
