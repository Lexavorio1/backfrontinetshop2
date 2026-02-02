const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: Number,
    img: String,
    amount: Number,
    discount: Boolean,
    procent: Number,
    category: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)