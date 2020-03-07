const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./config/db')
require('dotenv').config();

const path = require('path')

const professional = require('./routes/api/professional')
const enterprise = require('./routes/api/enterprise')
const user = require('./routes/api/user')
const job = require('./routes/api/job')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// adding Helmet to enhance your API's security
app.use(helmet())

// enabling CORS for all requests
app.use(cors())

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'an error occurred' })
})

// Use Routes
app.use('/api/professional', professional)
app.use('/api/enterprise', enterprise)
app.use('/api/user', user)
app.use('/api/job', job)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'))
})

// TODO: colocar isso em um .env
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
