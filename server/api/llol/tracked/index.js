const express = require('express')
const Model = require('./model')

const router = express.Router()
router.get('/', (req, res) => {
  Model.find((err, items) => {
    if (err) return res.status(500).send(err)
    res.send(items)
  })
})

router.get('/:type/:user', (req, res) => {
  const { type, user } = req.params
  Model.find({ user, type }, (err, items) => {
    if (err) return res.status(500).send(err)
    res.send(items)
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  Model.findById(id, (err, item) => {
    if (err) return res.status(500).send(err)
    res.send(item)
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  Model.findByIdAndUpdate(id, req.body, (err, item) => {
    if (err) return res.status(500).send(err)
    res.send(err)
  })
})

router.post('/:type', (req, res) => {
  const { body: details } = req
  const { type } = req.params
  const { _id: user } = req.user
  const newItem = new Model({ type, details, user })
  if (details.character) newItem.character = details.character
  newItem.save((err, item) => {
    if (err) return res.status(500).send(err)
    res.send(item)
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  Model.findByIdAndRemove(id, (err, item) => {
    if (err) return res.status(500).send(err)
    res.send(item)
  })
})

module.exports = router
