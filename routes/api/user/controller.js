const db = require('../../../config/database')
const jwt = require('jsonwebtoken')

exports.homeDesc = (req, res) => {
  authenticateAccessToken(req, res)
  db.query('select * from file f where f.user_id = ? order by f.created_at desc', req.user.userId, function(err, result, field){
    if(err) console.log(err)
    res.status(200).json({status: true, result: result})
  })
}

exports.homeAsc = (req, res) => {
  authenticateAccessToken(req, res)
  db.query('select * from file f where f.user_id = ? order by f.created_at asc', req.user.userId, function(err, result, field){
    if(err) console.log(err)
    res.status(200).json({status: true, result: result})
  })
}

exports.homeName = (req, res) => {
  authenticateAccessToken(req, res)
  db.query('select * from file f where f.user_id = ? order by f.title asc', req.user.userId, function(err, result, field){
    if(err) console.log(err)
    res.status(200).json({status: true, result: result})
  })
}

const authenticateAccessToken = (req, res) => {
  let authHeader = req.headers["authorization"]
  let token = authHeader && authHeader.split(" ")[1]
  if(!token) return res.sendStatus(400)

  jwt.verify(token, "StPeNcIlJwTsEcReTkEy", (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user
  })
}

