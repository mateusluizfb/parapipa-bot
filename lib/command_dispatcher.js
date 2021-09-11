const stateHandler = require('./state_handler')

function toggleBotOn(message) {
  stateHandler.toggleOn()
  // const emoji = client.emojis.cache.find(emoji => emoji.name === "rodney")
  message.channel.send(`ParapipaBot ligado`)
}

function toggleBotOff(message) {
  stateHandler.toggleOff()
  // const emoji = client.emojis.cache.find(emoji => emoji.name === "rodinelson")
  message.channel.send(`ParapipaBot desligado`)
}

function showHelpInstructions(message) {
  message.channel.send('Parapipa parapupa! Mande parapipa-ligar ou parapipa-desligar!! E parapipa-agora para ver o estado atual :)')
}

function showCurrentStatus(message) {
  message.channel.send(`Parapipa parapupa está: ${stateHandler.currenState()}`)
}

function ignoreMessage(message) {
  prefix = 'parapipa'
  return (!message.content.startsWith(prefix) || message.author.bot)
}

function extractCommand(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  return command
}

module.exports = (message) => {
  if(ignoreMessage(message)) return;

  command = extractCommand(message)

  const commandToRun = {
    '-ligar': () => toggleBotOn(message),
    '-desligar': () => toggleBotOff(message),
    '-help': () => showHelpInstructions(message),
    '-agora': () => showCurrentStatus(message)
  }[command]

  if(!command) return

  commandToRun()
}
