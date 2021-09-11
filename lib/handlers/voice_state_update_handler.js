const path = require("path")

module.exports = (oldState, newState) => {
  if (newState.member.user.id == process.env.USER_ID) {

    let voiceChannel = newState.member.voice.channel
    if(voiceChannel == null) return

    voiceChannel.join(voiceChannel).then(connection =>{
      console.log('Playing sound');
      const dispatcher = connection.play(path.join(__dirname, '../fixtures/sounds/minion.mp3'))
      dispatcher.on("finish", end => { voiceChannel.leave() })
    }).catch(err => console.log(err))
  }
}
