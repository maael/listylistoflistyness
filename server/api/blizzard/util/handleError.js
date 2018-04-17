module.exports = (res) => ({ message, errno, code, config = {} }) => {
  res.status(500).send({ message, errno, code, url: config.url })
}
