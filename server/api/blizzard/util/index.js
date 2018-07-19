const { BLIZ_CACHE_MAX_AGE, DEBUG_SERVER_CACHE, BLIZZARD_KEY } = require('dotenv-extended').load()
const { setupCache } = require('axios-cache-adapter')
const bliz = require('blizzard.js')
const handleError = require('./handleError')
const Cache = require('./cache')
const store = new Cache()

function getApiInstance (opts = {}) {
  if (opts.noCache) {
    return bliz.initialize({ apikey: BLIZZARD_KEY })
  } else {
    const cache = setupCache({
      maxAge: Number(opts.maxAge || BLIZ_CACHE_MAX_AGE),
      store,
      debug: DEBUG_SERVER_CACHE,
      exclude: Object.assign({ query: false }, opts.exclude)
    })
    return bliz.initialize({ apikey: BLIZZARD_KEY }, { adapter: cache.adapter })
  }
}

module.exports = {
  getApiInstance,
  handleError
}
