/**
 * http请求模块
 */

import * as axios from 'axios'
import qs from 'qs'

// 序列化查询参数
const serializeQuery = (o = {}) => {
  let arr = Object.keys(o).filter(_ => 
    o[_] !== undefined
  ).map(_ => 
    `${_}=${o[_]}`
  )
  return arr.length ? `?${arr.join('&')}` : ''
}

let baseURL = process.server ? `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 5000}/api` : '/api'

// 发起http请求
export function $http({ api, params = {}, type = 'POST', headers = {} }) {
  let options = {
    baseURL,
    timeout: 60000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Device': 'website',
      ...headers
    }
  }
  const axiosInstance = axios.create(options)
  let apiUrl = api, method = type.toLowerCase()
  if (method == 'get') apiUrl += serializeQuery(params)
  return new Promise((resolve, reject) => {
    axiosInstance[method](apiUrl, qs.stringify(params)).then(({ data }) => {
      if (data.error_code === '0') {
        resolve(data)
      } else {
        reject(new Error(data.info))
      }
    }).catch(reject)
  })
}