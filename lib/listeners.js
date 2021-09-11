const Discord = require("discord.js")
const commandDispatcher = require('./command_dispatcher.js')
const voiceStateUpdateHandler = require('./handlers/voice_state_update_handler.js')

function subscribe(client) {
  client.on('message', commandDispatcher)
  client.on('voiceStateUpdate', voiceStateUpdateHandler)
}

module.exports = () => {
  const client = new Discord.Client()

  subscribe(client)

  client.login(process.env.BOT_TOKEN)
}
