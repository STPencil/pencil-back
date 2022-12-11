//index.js
const express = require('express')
const mysql = require('mysql');
const db = require('./config/database')
const bodyParser = require('body-parser')
const routers = require('./routes')
const bcrypt = require('bcrypt')
const saltRounds = 10
const app = express() 
const port = 8000 
var cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => { 
  res.send('Hello World!') 

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 

app.use('/api', routers)
// db 테스트
app.get('/users', (req, res) => {
  connection.query('select * from user', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});


