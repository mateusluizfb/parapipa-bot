let BOT_TOGGLE = false

module.exports = {
  toggleOn: () => { BOT_TOGGLE = true },
  toggleOff: () => { BOT_TOGGLE = false },
  currenState: () => BOT_TOGGLE
}
