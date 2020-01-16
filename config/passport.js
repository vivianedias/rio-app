const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const Candidate = mongoose.model('Candidate')
const keys = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      Candidate.findById(jwtPayload.id)
        .then(candidate => {
          if (candidate) {
            return done(null, candidate)
          }
          return done(null, false)
        })
        .catch(err => console.log(err))
    })
  )
}

