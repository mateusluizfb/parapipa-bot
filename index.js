const express = require('express')
const app = express()
const dispatcher = require('./lib/dispatcher')
require('dotenv').config()

app.listen(process.env.PORT || 3000, () => {

  console.log("Starting Bot")
  console.log(`Token: ${process.env.BOT_TOKEN}`)
  console.log(`For user ${process.env.USER_ID}`)

  dispatcher();
})
