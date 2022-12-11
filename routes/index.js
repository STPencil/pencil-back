const router = require('express').Router()
const auth = require('./api/auth')
const user = require('./api/user')

router.use('/auth', auth)
router.use('/user', user)

module.exports = router