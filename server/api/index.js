const express = require('express')
const blizzard = require('./blizzard')
const llol = require('./llol')

const router = express.Router()
  .use('/blizzard', blizzard)
  .use('/llol', llol)

module.exports = router
