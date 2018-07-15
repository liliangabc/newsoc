import express from 'express'
// import bodyParser from 'body-parser'
import session from 'express-session'
// import connectRedis from 'connect-redis' 
import compression from 'compression'
import { Nuxt, Builder } from 'nuxt'
import apiRouter from './api'

const app = express()
const port = process.env.PORT || 5000
// const RedisStore = connectRedis(session)

app.use(compression())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  // store: new RedisStore(),
  secret: 'hello world 2018',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}))

app.use('/api', apiRouter)

let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
const nuxt = new Nuxt(config)
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)

app.listen(port)
console.log('Server listening on ' + ':' + port) // eslint-disable-line no-console