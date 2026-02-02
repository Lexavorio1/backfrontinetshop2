const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

exports.register = async (req, res) => {
  try {
    const { login, password } = req.body

    if (!login || !password) {
      return res
        .status(400)
        .json({ message: 'Login and password required' })
    }

    const candidate = await User.findOne({ login })
    if (candidate) {
      return res
        .status(400)
        .json({ message: 'User already exists' })
    }

    const hash = await bcrypt.hash(password, 7)

    const user = await User.create({
      login,
      password: hash
    })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    const { password: pwd, ...safeUser } = user._doc

    res.json({
      token,
      user: safeUser
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Register error' })
  }
}

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body

    const user = await User.findOne({ login })
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Wrong password' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    const { password: pwd, ...safeUser } = user._doc

    res.json({
      token,
      user: safeUser
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Login error' })
  }
}
