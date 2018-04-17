const express = require('express')
const character = require('./character')
const pet = require('./pet')
const mount = require('./mount')
const data = require('./data')

const router = express.Router()
router.use('/character', character)
router.use('/pet', pet)
router.use('/mount', mount)
router.use('/data', data)

module.exports = router
