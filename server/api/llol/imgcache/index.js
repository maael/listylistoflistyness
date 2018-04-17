const express = require('express')
const cache = require('./cache')
const zamimgCache = cache('zamimg', 'https://wow.zamimg.com/images/wow/icons/large/', true)
const renderCache = cache('render')

const router = express.Router()
router.get('/zamimg', (req, res) => {
  let toProxy = req.query.url
  zamimgCache(toProxy, res)
})

router.get('/render', (req, res) => {
  const { origin, endpoint } = req.query
  const route = `https://render-${origin}.worldofwarcraft.com/character/${endpoint}`
  renderCache(route, res)
})

module.exports = router
