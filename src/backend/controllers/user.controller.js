const User = require('../models/User.model')

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')

    res.json(
      users.map(u => ({
        ...u.toObject(),
        id: u._id
      }))
    )
  } catch (e) {
    res.status(500).json({ message: 'Ошибка получения пользователей' })
  }
}

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
}

exports.updateCart = async (req, res) => {
  try {
    const { cart } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { cart } },
      { new: true }
    )

    res.json(user)
  } catch (e) {
    res.status(500).json({ message: 'Cart update error' })
  }
}

exports.updateFavorites = async (req, res) => {
  try {
    const { product } = req.body
    const user = await User.findById(req.user.id)

    const exists = user.favorites.some(
      i => i.id === product.id
    )

    user.favorites = exists
      ? user.favorites.filter(i => i.id !== product.id)
      : [...user.favorites, product]

    await user.save()
    res.json(user)
  } catch (e) {
    res.status(500).json({ message: 'Favorites error' })
  }
}


exports.punishUser = async (req, res) => {
  const { type, until, reason } = req.body
console.log(req.user.role)
  const update =
    type === 'ban'
      ? { banUntil: until, banReason: reason }
      : { muteUntil: until, muteReason: reason }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true }
  ).select('-password')

  res.json(user)
}

exports.unPunishUser = async (req, res) => {
  const { type } = req.body

  const update =
    type === 'ban'
      ? { banUntil: null, banReason: null }
      : { muteUntil: null, muteReason: null }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true }
  ).select('-password')

  res.json(user)
}

exports.changeRole = async (req, res) => {
  const { role } = req.body
  console.log(req.user.role)

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select('-password')

  res.json(user)
}