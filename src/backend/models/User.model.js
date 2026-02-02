const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ['user', 'admin', 'developer'],
      default: 'user'
    },

    cart: { type: Array, default: [] },
    favorites: { type: Array, default: [] },
    orders: { type: Array, default: [] },

    banUntil: { type: mongoose.Schema.Types.Mixed, default: null },
    banReason: { type: String, default: null },

    muteUntil: { type: mongoose.Schema.Types.Mixed, default: null },
    muteReason: { type: String, default: null }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
