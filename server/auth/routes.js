const { JWT_TOKEN_SECRET } = require('dotenv-extended').load()
const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('./model')

const router = express.Router()

/* Local */

function getToken (user) {
  return jwt.sign(user, JWT_TOKEN_SECRET)
}

router.post('/login',
  (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return res.status(500).json({ err: err.message })
      if (!user) return res.status(400).json({ message: 'User does not exist' })

      req.login(user, (err) => {
        if (err) return res.status(500).json({ err: err.message })

        const token = getToken(user.toObject())
        return res.json({ user, token })
      })
    })(req, res)
  }
)

router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) return res.status(500).json({ user, err: err.message })

    passport.authenticate('local')(req, res, () => {
      const token = getToken(user.toObject())
      res.json({ user, token })
    })
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.json({ result: 'ok' })
})

router.get('/refresh', (req, res) => {
  if (req.user) {
    User.findById(req.user._id, (err, user) => {
      if (err) return res.status(500).json({ err: err.message, user: req.user })
      res.json(user)
    })
  } else {
    res.status(400).json({ err: 'No user' })
  }
})

/* Battle.net */

router.get('/bnet', (req, res) => {
  passport.authorize('bnet', (err, user, info) => {
    console.log('bnet auth with', err, user, info)
  })(req, res)
})

router.get('/bnet/callback', (req, res) => {
  console.log('got', req.url, req.body)
  passport.authorize('bnet')(req, res, () => {
    console.log('authed this bitch', req.url, req.body)
    res.redirect('/')
  })
})

router.delete('/revoke/:userId/:bnetId', (req, res) => {
  const { userId, bnetId } = req.params
  User.revokeBattlenet(userId, bnetId, (err, user) => {
    if (err) return res.status(500).json({ user, err: err.message })
    res.json({ user, token: getToken(user) })
  })
})

module.exports = router
