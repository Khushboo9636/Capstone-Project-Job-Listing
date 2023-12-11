const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

var healthRouter = require('./src/routes/health.route.js')

const app = express()

app.use(express.json())

app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(cookieParser())

app.use('/health',healthRouter)

module.exports = app

