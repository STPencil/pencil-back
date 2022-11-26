const router = require('express').Router()
const controller = require('./controller')

router.post('/signup', controller.register)
router.post('/login', controller.login)
router.get('/check', controller.check)

module.exports = router