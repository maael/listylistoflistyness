const { BLIZZARD_CALLBACK_URL, PROTOCOL, HOST, PORT, BLIZZARD_KEY, BLIZZARD_SECRET } = require('dotenv-extended').load()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BnetStrategy = require('passport-bnet').Strategy
const User = require('./model')

module.exports = function configure () {
  /* Battle.net */
  const callbackURL = BLIZZARD_CALLBACK_URL || `${PROTOCOL}://${HOST}:${PORT}/auth/bnet/callback`

  passport.use(new BnetStrategy({
    clientID: BLIZZARD_KEY,
    clientSecret: BLIZZARD_SECRET,
    callbackURL,
    region: 'eu',
    scope: [ 'wow.profile' ],
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
    if (!req.user) return done(null, profile)
    User.associateBattleNet(req.user, profile, (err, user) => {
      console.log('err', err)
      if (err) return done(err)
      console.log('new user', req.user._id, user)
      done(null, profile)
    })
  }))

  /* Local */
  passport.use(new LocalStrategy(User.authenticate()))

  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())
}
