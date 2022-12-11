// load dependency
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
var cors = require('cors')

app.use(cors())
// load config
const port = process.env.PORT || 3000

// express configuration
const app = express()

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// print request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', "MySeCrEtJwTsEcReTkEy")

// index page (test)
app.get('/', (req, res) => {
  res.send('Hello')
})

app.use('/api', require('./routes'))

// open the server
app.listen(port, () => {
  console.log(`Express is running on port ${port}`)
})


