import express from 'express'
import axios from 'axios'
import proxy from 'http-proxy-middleware'
import svgCaptcha from 'svg-captcha'
import bodyParser from 'body-parser'

import { tradeAppKey, remoteAPIURL } from './config'
import { getShengs, getCities, getXians } from './area'

const router = express.Router()
const jsonParser = bodyParser.json()

// 登录状态检查
function checkLogin(req, res, next) {
  if (req.session.userData) {
    next()
  } else {
    res.json({ code: 403, msg: '请先登录.' })
  }
}

// 检查随机串
function checkRandstr(req, res, next) {
  let { randstr } = req.session
  let xClientData = req.headers['x-client-data']
  if (randstr && xClientData && randstr === xClientData) {
    next()
  } else {
    res.json({ code: 504, msg: '请求失败，请刷新浏览器重试.' })
  }
  delete req.session.randstr
}

// 用户登录
router.post('/login', jsonParser, (req, res) => {
  let { mobile, password, captcha } = req.body
  if ((!captcha) || captcha !== req.session.captcha) {
    res.json({ code: 500, msg: '验证码错误.' })
  } else {
    axios.post(`${remoteAPIURL}/login`, {
      mobile, password
    }).then(({ data }) => {
      if (data.code === 0) {
        req.session.userData = { mobile, password, token: data.token }
      }
      res.json(data)
    }).catch(err => {
      res.json({ code: 500, msg: err.message })
    })
  }
  delete req.session.captcha
})

// 用户退出
router.post('/logout', (req, res) => {
  delete req.session.userData
  res.json({ code: 0, msg: 'success' })
})

// 商标查询
router.get('/trade/query', checkLogin, checkRandstr, (req, res) => {
  let { keyword, searchType, pageSize = 50, pageNo = 1, intCls = 0 } = req.query
  keyword = encodeURIComponent(keyword)
  let url = `http://v.juhe.cn/trademark/search?key=${tradeAppKey}&keyword=${keyword}&searchType=${searchType}&pageSize=${pageSize}&pageNo=${pageNo}&intCls=${intCls}`
  axios.get(url).then(({ data }) => {
    res.json(Object.assign(data, { code: data.error_code }))
  }).catch(err => {
    res.json({ code: 500, msg: err.message })
  })
})

// 获取商标详情
router.get('/trade/detail', checkLogin, checkRandstr, (req, res) => {
  let { regNo, intCls } = req.query
  let url = `http://v.juhe.cn/trademark/detail?key=${tradeAppKey}&regNo=${regNo}&intCls=${intCls}`
  axios.get(url).then(({ data }) => {
    res.json(Object.assign(data, { code: data.error_code }))
  }).catch(err => {
    res.json({ code: 500, msg: err.message })
  })
})

// 验证码
router.get('/captcha', (req, res) => {
  var captcha = svgCaptcha.createMathExpr({
    background: '#dcdfe6',
    width: 120,
    height: 40,
    fontSize: 40
  })
  req.session.captcha = captcha.text
  res.type('svg')
  res.status(200).send(captcha.data)
})

// 获取省市区
router.get('/area', (req, res) => {
  let { level = 1, sheng, di } = req.query
  if (level == 1) {
    res.json({ code: 0, list: getShengs() })
  } else if (level == 2) {
    res.json({ code: 0, list: getCities(sheng) })
  } else if (level == 3) {
    res.json({ code: 0, list: getXians(sheng, di) })
  } else {
    res.json({ code: 500, msg: 'level必须为1，2，3！' })
  }
})

// 启用路由代理中间件
router.use('/**', proxy({
  target: remoteAPIURL,
  changeOrigin: true,
  pathRewrite: { '^/api': '' }
}))

export default router