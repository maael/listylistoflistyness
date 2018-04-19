const express = require('express')
const Model = require('./settingsModel')

const router = express.Router()

router.get('/settings', (req, res) => {
  const { user } = req
  if (!user) return res.status(400).json({ err: 'Requires user' })
  Model.findById(user._id, (err, item) => {
    if (err) return res.status(500).send(err)
    res.send(item ? item : {})
  })
})

router.patch('/settings', (req, res) => {
  const { user } = req
  if (!user) return res.status(400).json({ err: 'Requires user' })
  Model.findByIdAndUpdate(user._id, req.body, { upsert: true }, (err, item) => {
    if (err) return res.status(500).send(err)
    res.send(err)
  })
})

module.exports = router
