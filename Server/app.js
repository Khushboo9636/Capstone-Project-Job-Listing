const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())

app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json())



module.exports = app

