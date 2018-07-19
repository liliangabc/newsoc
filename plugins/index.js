import axios from 'axios'
import moment from 'moment'
import validator from 'email-validator'

const uploadURL = 'http://up-z1.qiniu.com'
// const uploadURL = 'http://up-na0.qiniu.com'

// 文件上传
export function upload({ file, token }) {
  let formData = new FormData()
  formData.append('token', token.uploadToken)
  formData.append('key', token.key)
  formData.append('file', file)
  return new Promise((resolve, reject) => {
    axios.post(uploadURL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => resolve(res.data)).catch(reject)
  })
}

// 验证邮箱
export function isEmail(str) {
  return validator.validate(str)
}

// 验证学校邮箱
export function isEduEmail(str) {
  return isEmail(str) && str.endsWith('edu')
}

// 帖子类型判断
export function isMarket(type) {
  return type == '2'
}

export function isEvent(type) {
  return type == '1'
}

export function isClass(type) {
  return type == '3'
}

export function isMeetup(type) {
  return type == '4'
}

export function isMoment(type) {
  return type == '5'
}

export function isUser(type) {
  return type == '7'
}

// 计算元素在页面中的偏移位置
export function getOffset(el) {
  let oTop = el.offsetTop
  let oLeft = el.offsetLeft
  let oParent = el.offsetParent
  while(oParent) {
    oTop += oParent.offsetTop
    oLeft += oParent.offsetLeft
    oParent = oParent.offsetParent
  }
  return { top: oTop, left: oLeft }
}

// 判断当前页是否是帖子详情页面
export function isPostsDetail(route) {
  return route.name == 'posts-type'
}

// 时间格式转换
export const dateUtil = {
  // 转化为JS标准时间格式
  toJSTime(val) {
    return moment(val).format('MM/DD/YYYY hh:mm')
  },
  // 转化为帖子所用时间格式
  toPostsTime(val) {
    return moment(val).format('MM/DD/YYYY hh:mm A')
  }
}