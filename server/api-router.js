/**
 * API路由处理
 */

import express from 'express'
import axios from 'axios'
import proxy from 'http-proxy-middleware'
import bodyParser from 'body-parser'
import qs from 'qs'

import { APIURL } from './config'

const router = express.Router()
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Device': 'website'
  }
})

// 登录检查
const checkLogin = (req, res, next) => {
  return req.session.userData ? next() : res.json({
    error_code: '1',
    info: 'Please login.'
  })
}

// 用户登录
router.post('/login.json', urlencodedParser, (req, res) => {
  let { userName, password } = req.body
  axiosInstance.post(`${APIURL}/student_login.json`, qs.stringify({
    userName, password
  })).then(({ data }) => {
    if (data.error_code === '0') {
      req.session.userData = { userName, password }
    }
    res.json(data)
  }).catch(err => {
    res.json({ error_code: '504', info: err.message })
  })
})

// 用户退出
router.post('/logout.json', urlencodedParser, (req, res) => {
  axiosInstance.post(`${APIURL}/student_logout.json`, qs.stringify({
    token: req.body.token
  })).then(({ data }) => {
    delete req.session.userData
    res.json(data)
  }).catch(err => {
    res.json({ error_code: '504', info: err.message })
  })
})

// 启用HTTP代理
router.use('/**', proxy({
  target: APIURL,
  changeOrigin: true,
  pathRewrite: { '^/api': '' }
}))

export default router