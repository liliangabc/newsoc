/**
 * 通用工具模块
 */

//  手机正则表达式
export const regPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/

// 是否是手机号码
export const isPhone = num => regPhone.test(num)

// 替换查询参数
export function replaceQuery(route, attr) {
  let { query } = route, obj = {}
  for (let key in query) obj[key] = query[key]
  for (let key in attr) obj[key] = attr[key]
  let qStr = Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')
  return `${route.path}?${qStr}`
}

// 序列化查询参数
export function serializeQuery(o = {}) {
  let arr = Object.keys(o).filter(_ => o[_] !== undefined).map(_ => `${_}=${o[_]}`)
  return arr.length ? `?${arr.join('&')}` : ''
}

// 验证图片文件
export function validPicFile({ file, maxSize }) {
  let { type, size } = file, maxToBSize = maxSize * 1024
  if (type.indexOf('image') !== 0) {
    return {
      ok: false,
      msg: '请选择图片文件！'
    }
  } else if (maxSize && size > maxToBSize) {
    return {
      ok: false,
      msg: `请选择小于${maxSize}kb的文件！`
    }
  }
  return {
    ok: true
  }
}