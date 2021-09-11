const path = require("path")

function runUserStateTriggers(oldState, newState) {
  if (newState.member.user.id == process.env.USER_ID) {

    let voiceChannel = newState.member.voice.channel
    if(voiceChannel == null) return

    voiceChannel
      .join(voiceChannel)
      .then(connection => playMinionSound(connection, voiceChannel))
      .catch(err => console.log(err))
  }
}

function playMinionSound(connection, voiceChannel) {
  console.log('Playing sound');
  const dispatcher = connection.play(path.join(__dirname, '../fixtures/sounds/minion.mp3'))
  dispatcher.on("finish", end => { voiceChannel.leave() })
}

module.exports = (oldState, newState) => {
  runUserStateTriggers(oldState, newState)
}
