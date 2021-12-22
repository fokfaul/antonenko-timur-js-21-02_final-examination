const express = require('express')
const app = express()
const router = require('./routes/index')

const logger = require('./logger')
const context = require('request-context')
const { v4: generateUUID } = require('uuid')

const {host, port} = require('../config/serverConfig')

app.use(express.json())
app.use(context.middleware('request'))
app.use((req, res, next) => {
  context.set('uuid', generateUUID())
  res.type('text/plain')
    .set('Access-Control-Allow-Origin','*')
    .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
    .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});
app.use((err, req, res, next) => {
  logger.fatal(err)
  res.status(500).send(err.toString())
  next()
})
app.use('/', router)

module.exports = {
    app: app,
    host: host,
    port: port
}
