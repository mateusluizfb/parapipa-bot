const express = require('express')
const app = express()
const command_dispatcher = require('./lib/command_dispatcher')
require('dotenv').config()

app.listen(process.env.PORT || 3000, () => {

  console.log("Starting Bot")
  console.log(`Token: ${process.env.BOT_TOKEN}`)
  console.log(`For user ${process.env.USER_ID}`)

  command_dispatcher();
})
