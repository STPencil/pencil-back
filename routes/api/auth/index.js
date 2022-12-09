const router = require('express').Router()
const controller = require('./controller')
const authMiddleware = require('../../../middlewares/auth')

router.post('/signup', controller.register)
router.post('/login', controller.login)
// router.get('/jwt', controller.jwt)

// router.use('/check', authMiddleware)
// router.get('/check', controller.check)

module.exports = router