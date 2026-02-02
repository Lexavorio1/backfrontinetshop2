const Order = require('../models/Order.model')
const User = require('../models/User.model')

exports.createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user || !user.cart.length) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const total = user.cart.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    )

    const order = await Order.create({
      user: user._id,
      items: user.cart,
      total
    })

    user.orders.push(order._id)
    user.cart = []
    await user.save()

    res.json(order)
  } catch (e) {
    res.status(500).json({ message: 'Order error' })
  }
}

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ date: -1 })
  res.json(orders)
}

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'login role')
    .sort({ date: -1 })

  res.json(orders)
}
