const express = require('express')
const app = express()
const listener = require('./lib/listeners')
require('dotenv').config()

app.listen(process.env.PORT || 3000, () => {

  console.log("Starting Bot")
  console.log(`Token: ${process.env.BOT_TOKEN}`)

  listener();
})
