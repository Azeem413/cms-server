const express = require('express')
const app = express()

const { DB_URL, PORT } = require('./config')
//MIDDILWARES
require('./middlewares/server.middleware')(app, express)
//Passport Config.

//start
require('./start/db')(DB_URL)
require('./start/routes')(app)

const port = PORT || 5000
require('http')
  .createServer(app)
  .listen(port, () => {
    console.clear()
    console.log(`Listening at port ${port}`)
  })
