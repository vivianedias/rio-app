const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')


const keys = require('./config/keys')
const path = require('path')

const candidate = require('./routes/api/candidate')


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

// Use Routes
app.use('/api/candidate', candidate)

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    );
  });
}

// TODO: colocar isso em um .env
const port = process.env.PORT || 5000

app.use(express.static('public'))

app.listen(port, () => console.log(`Server running on port ${port}`))
