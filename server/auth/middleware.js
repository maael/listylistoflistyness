module.exports = {
  redirectUnauthorizedRoutesToIndex,
  forceUser
}

const authRoutes = [ '/login', '/register' ];

function redirectUnauthorizedRoutesToIndex (req, res, next) {
  if (req.user && authRoutes.includes(req.url)) return res.redirect('/')
  next()
}

function forceUser (req, res, next) {
  if (!req.user && !authRoutes.includes(req.url) && !req.url.startsWith('/_next')) {
    return res.redirect('/login')
  }
  next()
}
