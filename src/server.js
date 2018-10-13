const express = require('express')
const app = express()
const routes = require('./routes/transit.routes')

app.use(routes)

module.exports = app 