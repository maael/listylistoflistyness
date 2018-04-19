const express = require('express')
const tracked = require('./tracked')
const imgcache = require('./imgcache')
const user = require('./user')

const router = express.Router()
  .use('/tracked', tracked)
  .use('/imgcache', imgcache)
  .use('/user', user)


module.exports = router
