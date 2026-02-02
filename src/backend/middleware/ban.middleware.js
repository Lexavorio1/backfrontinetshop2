const User = require('../models/User.model')

module.exports = async function banMiddleware(req, res, next) {
  const user = await User.findById(req.user.id)

  if (!user || !user.banUntil) return next()

  if (user.banUntil === 'permanent') {
    return res.status(403).json({ message: 'User permanently banned' })
  }

  if (new Date(user.banUntil) > new Date()) {
    return res.status(403).json({ message: 'User banned' })
  }

  next()
}
