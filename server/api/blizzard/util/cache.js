const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD, REDIS_DB } = require('dotenv-extended').load()
const Redis = require('ioredis')

class MemoryStore {
  constructor () {
    this.redis = new Redis(Object.entries({
      port: REDIS_PORT,
      host: REDIS_HOST,
      family: 4,
      password: REDIS_PASSWORD,
      db: REDIS_DB
    }).reduce((ob, entry) => entry[1] ? Object.assign(ob, { [entry[0]]: entry[1] }) : ob, {}))
  }

  async getItem (key) {
    return this.redis.get(key).then((result) => JSON.parse(result) || null)
  }

  async setItem (key, value) {
    this.redis.set(key, JSON.stringify(value))

    return value
  }

  async removeItem (key) {
    // return this.redis.del(key)
    return this.getItem(key)
  }

  async clear () {
    return // this.redis.flushdb()
  }

  async length () {
    return this.redis.dbsize()
  }

  iterate (fn) {
    throw new Error('To Implement')
  }
}

module.exports = MemoryStore
