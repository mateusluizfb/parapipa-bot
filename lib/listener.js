const Discord = require("discord.js")
const commandDispatcher = require('./listeners/command_listener.js')
const voiceStateUpdateHandler = require('./listeners/voice_state_update_listener.js')

function subscribe(client) {
  client.on('message', commandDispatcher)
  client.on('voiceStateUpdate', voiceStateUpdateHandler)
}

module.exports = () => {
  const client = new Discord.Client()

  subscribe(client)

  client.login(process.env.BOT_TOKEN)
}
