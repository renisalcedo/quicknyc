const { Router } = require('express')

// BODYPARSER FOR SPECIFIC ROUTES
// ================================================================================================
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// ROUTES
const router = new Router()

module.exports = router