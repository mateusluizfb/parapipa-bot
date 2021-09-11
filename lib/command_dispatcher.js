const Discord = require("discord.js")
const client = new Discord.Client()
const path = require("path")

let BOT_TOGGLE = true;

function toggleBotOn(message) {
  BOT_TOGGLE = true
  const emoji = client.emojis.cache.find(emoji => emoji.name === "rodney")
  message.channel.send(`ParapipaBot ligado ${emoji}`)
}

function toggleBotOff(message) {
  BOT_TOGGLE = false
  const emoji = client.emojis.cache.find(emoji => emoji.name === "rodinelson")
  message.channel.send(`ParapipaBot desligado ${emoji}`)
}

function showHelpInstructions(message) {
  message.channel.send('Parapipa parapupa! Mande parapipa-ligar ou parapipa-desligar!! E parapipa-agora para ver o estado atual :)')
}

function showCurrentStatus(message) {
  message.channel.send(`Parapipa parapupa está: ${BOT_TOGGLE}`)
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

module.exports = () => {
  client.on('message', message => {
    if(ignoreMessage(message))
      return;

    command = extractCommand(message)

    const commandToRun = {
      '-ligar': () => toggleBotOn(message),
      '-desligar': () => toggleBotOff(message),
      '-help': () => showHelpInstructions(message),
      '-agora': () => showCurrentStatus(message)
    }[command]

    commandToRun()
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
        const dispatcher = connection.play(path.join(__dirname, './sounds/minion.mp3'))
        console.log('playing sound');
        dispatcher.on("finish", end => { voiceChannel.leave() })
    }).catch(err => console.log(err))

      return
    }
    return
  })

  client.login(process.env.BOT_TOKEN)
}
