const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
require('../config/passport')(passport)
module.exports = function (app, express) {
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())
  app.use(morgan('dev'))
  app.use(passport.initialize())
}
