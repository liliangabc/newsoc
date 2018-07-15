import * as axios from 'axios'

import { serializeQuery } from './index'

export function $http({ api, params = {}, type = 'POST', headers = {} }) {
  let options = {
    withCredentials: true,
    timeout: 60000,
    headers
  }
  if (process.server) {
    options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 5000}`
  }
  const axiosInstance = axios.create(options)
  let apiUrl = api, method = type.toLowerCase()
  if (method == 'get') apiUrl += serializeQuery(params)
  return new Promise((resolve, reject) => {
    axiosInstance[method](apiUrl, params).then(res => {
      let { data } = res
      if (data.code == 0) {
        resolve(data)
      } else {
        reject(Error(JSON.stringify({ msg: data.msg, code: data.code })))
      }
    }).catch(reject)
  })
}