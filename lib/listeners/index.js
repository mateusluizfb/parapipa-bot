const Discord = require("discord.js")
const commandDispatcher = require('./command_listener.js')
const voiceStateUpdateHandler = require('./voice_state_update_listener.js')

function subscribe(client) {
  client.on('message', commandDispatcher)
  client.on('voiceStateUpdate', voiceStateUpdateHandler)
}

module.exports = {
  start: () => {
    const client = new Discord.Client()
    subscribe(client)
    client.login(process.env.BOT_TOKEN)
  }
}
