const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: String,
  password: String
})

// 새로운 User document를 생성한다
User.statics.create = function(username, password){
  const user = new this({
    username,
    password
  })
  return user.save()
}

// username을 통해 한 user를 찾는다
User.statics.findOneByUsername = function(username){
  return this.findOne({
    username
  }).exec()
}

// User document의 비밀번호를 검증한다
User.methods.verify = function(password){
  return this.password === password
}

module.exports = mongoose.model('User', User)