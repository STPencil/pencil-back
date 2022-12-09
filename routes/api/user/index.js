const router = require('express').Router()
const controller = require('./controller')

router.get('/homeDesc', controller.homeDesc)
router.get('/homeAsc', controller.homeAsc)
router.get('/homeName', controller.homeName)

module.exports = router