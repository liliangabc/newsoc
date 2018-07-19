import express from 'express'
import compression from 'compression'
import session from 'express-session'
// import connectRedis from 'connect-redis'
import { Nuxt, Builder } from 'nuxt'

import apiRouter from './api-router'

const app = express()
const port = process.env.PORT || 5000
// const RedisStore = connectRedis(session)

app.use(compression())
app.use(session({
  // store: new RedisStore({
  //   host: '47.104.27.50',
  //   port: 3678,
  //   pass: 'Redis!321.'
  // }),
  secret: 'hello world 2018',
  resave:true,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}))

app.use('/api', apiRouter)

let config = require('../nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')
const nuxt = new Nuxt(config)
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.get('/entry', (req, res) => {
  res.redirect('/entry/login')
})
app.get('/', (req, res) => {
  res.redirect('/index/5')
})
app.get('/index', (req, res) => {
  res.redirect('/index/5')
})

app.use(nuxt.render)

app.listen(port)
console.log('Server listening on ' + ':' + port)