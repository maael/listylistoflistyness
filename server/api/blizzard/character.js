const config = require('dotenv-extended').load()
const express = require('express')
const { getApiInstance, handleError } = require('./util')
const bliz = getApiInstance({ noCache: true })

const router = express.Router()

function embellishData (origin, data) {
  return Object.assign({}, data, {
    thumbnailFull: `/api/llol/imgcache/render?origin=${origin}&endpoint=${data.thumbnail}`,
    mainFull: `/api/llol/imgcache/render?origin=${origin}&endpoint=${data.thumbnail.replace('avatar.jpg', 'main.jpg')}`,
    insetFull: `/api/llol/imgcache/render?origin=${origin}&endpoint=${data.thumbnail.replace('avatar.jpg', 'inset.jpg')}`
  })
}

function embellishList (origin, data) {
  return Object.assign({}, data, {
    characters: [].concat(data.characters).map((d) => embellishData(origin, d))
  })
}

router.get('/', (req, res) => {
  const { user } = req
  if (user && user.battlenet && user.battlenet.length) {
    const origin = 'eu'
    bliz.account.wow({ access_token: user.battlenet[0].token, origin })
      .then(({ data }) => {
        res.send(embellishList(origin, data))
      })
      .catch(handleError(res))
  } else {
    res.status(400).send({ err: 'Requires user with associated battlenet account' })
  }
})

router.get('/:realm/:name', (req, res) => {
  const { realm, name } = req.params
  const origin = 'eu'
  bliz.wow.character(['profile', 'pets', 'mounts', 'professions', 'titles', 'guild', 'hunterPets', 'progression', 'reputation'], { realm, name, origin })
    .then(({ data }) => {
      res.send(embellishData(origin, data))
    })
    .catch(handleError(res))
})

module.exports = router
