const { SESSION_SECRET, REDIS_PORT: port, REDIS_HOST: host } = require('dotenv-extended').load()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const passport = require('passport')
const configure = require('./configure')
const routes = require('./routes')

module.exports = function auth (server) {
  configure()

  server
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(session({ store: new RedisStore({ port, host }), secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
    .use(passport.initialize())
    .use(passport.session())
    .use('/auth', routes)

  return server
}
