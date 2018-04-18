const { PROTOCOL, HOST, HTTPS_KEY_PATH, HTTPS_CERT_PATH } = require('dotenv-extended').load()
const { readFileSync } = require('fs')
const https = require('https')
const express = require('express')
const compression = require('compression');
const morgan = require('morgan')
const next = require('next')
const mobxReact = require('mobx-react')
const api = require('./api')
const auth = require('./auth')
const db = require('./lib/db')
const { redirectUnauthorizedRoutesToIndex } = require('./auth/middleware')
const port = process.env.PORT

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handleNextRequest = app.getRequestHandler()

mobxReact.useStaticRendering(true)

const sslOptions = {
  key: readFileSync(HTTPS_KEY_PATH),
  cert: readFileSync(HTTPS_CERT_PATH)
}

db.connection.on('error', (err) => {
  console.error('connection error:', err)
})

db.connection.once('open', () => {
  app.prepare().then(() => {
    const server = express()

    server
      .use(morgan('tiny', { skip: (req) => req.url.startsWith('/_next/') }))
      .use(compression())

    auth(server)

    server
      .use('/api', api)
      .use('/public', express.static('public'))
      .use(redirectUnauthorizedRoutesToIndex)
      .get('*', handleNextRequest)

    https.createServer(sslOptions, server).listen(port, () => {
      console.log(`> server: ${PROTOCOL}://${HOST}:${port}`)
    })
  })
})
