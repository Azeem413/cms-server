const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
// const Faculty = require('../models/faculty.model');
const Student = require('../models/student.model')
const Admin = require('../models/admin.model')
const { JWT_SECRET } = require('./')
// const keys = require('./key');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = JWT_SECRET

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const student = await Student.findById(jwt_payload.id)
      const admin = await Admin.findById(jwt_payload.id)
      if (student) {
        return done(null, student)
      } else if (admin) {
        return done(null, admin)
      } else {
        console.log('Error')
      }
    })
  )
}
