module.exports = {
  redirectUnauthorizedRoutesToIndex
}

function redirectUnauthorizedRoutesToIndex (req, res, next) {
  if (req.user && [ '/login', '/register' ].includes(req.url)) return res.redirect('/')
  next()
}
