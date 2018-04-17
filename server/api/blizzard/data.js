const express = require('express')
const { getApiInstance, handleError } = require('./util')
const bliz = getApiInstance()

const router = express.Router()
router.get('/realm', (req, res) => {
  bliz.wow.realms({ origin: 'eu' })
    .then(({ data }) => {
      res.send(data)
    })
    .catch(handleError(res))
})

module.exports = router
