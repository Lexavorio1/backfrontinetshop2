// const express = require('express')
// const cors = require('cors')

// const routes = require('./routes')

// const app = express()

// app.use(cors())
// app.use(express.json())

// app.use('/api', routes)

// module.exports = app

const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://backfrontinetshop.vercel.app',
    'https://backfrontinetshop2.onrender.com',
  ],
  credentials: true
}))

app.use(express.json())

app.use('/api', routes)

module.exports = app
