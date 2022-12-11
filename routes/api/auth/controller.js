const db = require('../../../config/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.register = (req, res) => {
  const param = [req.body.userId, req.body.password]
  
  bcrypt.hash(param[1], saltRounds, (error, hash) => {
    param[1] = hash
    db.query('insert into user(`user_id`, `password`) values (?,?)', param, (err, now) => {
      if(err) console.log(err)
    })
  })

  res.end()
}
exports.login = (req, res) => {
  const userId = req.body.userId;
  const id = db.query('select u.id from user u where user_id = ?', userId, function(err, result, field){
    if(err) console.log(err)
    if(result.length == 0){
      res.status(401).json({status: false, result: 'login failed'})
    }else{
      const token = jwt.sign({
        userId: result[0].id
      }, "StPeNcIlJwTsEcReTkEy", {
        expiresIn: '10d'
      })
      res.status(200).json({status: true, token: token})
    }
  })
}