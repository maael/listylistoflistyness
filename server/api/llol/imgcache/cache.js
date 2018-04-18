const { constants, access, createWriteStream, createReadStream } = require('fs')
const { parse, join } = require('path')
const request = require('request')

module.exports = (folder = 'cache', defaultBase = '', forceBase = false) => (url, res) => {
  const { base: file, dir } = parse(url)
  if (forceBase || (!dir && defaultBase)) url = `${defaultBase}${file}`
  const filePath = join(__dirname, '..', '..', '..', 'cache', folder, file);
  access(filePath, constants.R_OK, (err) => {
    if (err) {
      const ws = createWriteStream(filePath)
      try {
        const proxiedReq = request(url)
        proxiedReq.pipe(ws)
        proxiedReq.pipe(res)
      } catch (e) {
        res.status(500).send({ err: e.message })
      }
    } else {
      createReadStream(filePath).pipe(res)
    }
  })
}
