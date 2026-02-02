const { Schema, model } = require('mongoose')

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: Array,
    total: Number,
    date: { type: Date, default: Date.now }
  }
)

module.exports = model('Order', OrderSchema)