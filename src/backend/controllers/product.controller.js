const Product = require('../models/Product.model')

exports.getAll = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Products load error' })
  }
}

exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Product create error' })
  }
}
