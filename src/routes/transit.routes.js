const { Router } = require('express')
const bodyParser = require('body-parser')
const { getDuration } = require('../controller/transit.controller')

// BODYPARSER FOR SPECIFIC ROUTES
// ================================================================================================
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// ROUTES
const router = new Router()

router.post('/train/duration', jsonParser, getDuration)

module.exports = router