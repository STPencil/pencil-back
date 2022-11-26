const User = require('../../../models/user')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
  const {username, password} = req.body
  let newUser = null

  // 존재하지않으면 새로운 유저 생성
  const create = (user) => {
    if(user){
      throw new Error('username exists')
    } else{
      return User.create(username, password)
    }
  }

  const respond = () => {
    res.json({
      message: 'registered successfully'
    })
  }

  const onError = (error) => {
    res.status(409).json({
      message: error.message
    })
  }

  User.findOneByUsername(username)
  .then(create)
  .then(respond)
  .catch(onError)
}

exports.login = (req,res) => {
  const {username, password} = req.body
  const secret = req.app.get('jwt-secret')

  // user 정보 체크 & jwt 생성
  const check = (user) => {
    if(!user){
      throw new Error('login failed')
    } else{
      if(user.verify(password)){
        const p = new Promise((resolve, reject) => {
          jwt.sign(
            {
              _id: user._id,
              username: user.username
            },
            secret,
            {
              expiresIn: '7d',
              issuer: 'velopert.com',
              subject: 'userInfo'
            }, (err, token) => {
              if(err) reject(err)
              resolve(token)
            })
        })
        return p
      } else{
        throw new Error('login failed')
      }
    }
  }

  const respond = (token) => {
    res.json({
      message: 'logged in successfully',
      token
    })
  }

  const onError = (error) => {
    res.status(403).json({
      message: error.message
    })
  }

  User.findOneByUsername(username)
  .then(check)
  .then(respond)
  .catch(onError)
}

exports.check = (req, res) => {
  res.json({
      success: true,
      info: req.decoded
  })
}

exports.check = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token

  if(!token){
    return res.status(403).json({
      success: false,
      message: 'not logged in'
    })
  }

  const p = new Promise(
    (resolve, reject) => {
      jwt.verify(token, req.app.get('jwt-secret'), (err,decoded) => {
        if(err) reject(err)
        resolve(decoded)
      })
    }
  )

  const respond = (token) => {
    res.json({
      success: true,
      info: token
    })
  }

  const onError = (error) => {
    res.status(403).json({
      success: false,
      message: error.message
    })
  }

  p.then(respond).catch(onError)
}