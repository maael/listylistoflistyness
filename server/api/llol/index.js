const express = require('express')
const tracked = require('./tracked')
const imgcache = require('./imgcache')

const router = express.Router()
  .use('/tracked', tracked)
  .use('/imgcache', imgcache)


module.exports = router
