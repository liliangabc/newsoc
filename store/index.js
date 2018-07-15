/**
 * 状态管理模块
 */
import axios from 'axios'
import { $http } from '~/plugins/axios'
import { remoteAPIURL } from '../server/config'

export const state = () => ({ token: '' })

export const mutations = {
  saveToken(state, token = '') { state.token = token }
}

export const actions = {
  // 框架服务端初始化 | 用户自动登陆控制 | 该方法在服务端页面渲染之前被调用
  nuxtServerInit({ commit }, { req }) {
    let { userData } = req.session
    if (!userData) return
    let { mobile, password } = userData
    return axios.post(`${remoteAPIURL}/login`, {
      mobile, password
    }).then(({ data }) => {
      commit('saveToken', data.token)
    }).catch(err => {console.log(err.message)})
  },
  // 用户注册
  register(context, params) {
    return $http({
      api: '/api/register',
      params
    })
  },
  // 获取验证码
  validcode(context, params) {
    return $http({
      api: '/api/validcode',
      params,
      type: 'GET'
    })
  },
  // 找回密码
  forget({ dispatch }, params) {
    return $http({
      api: '/api/forget',
      params
    }).then(() => dispatch('logout'))
  },
  // 用户登录
  login({ commit }, params) {
    return $http({
      api: '/api/login',
      params
    }).then(data => commit('saveToken', data.token))
  },
  // 用户退出
  logout({ commit }) {
    return $http({
      api: '/api/logout'
    }).then(data => commit('saveToken', ''))
  },
  // 获取类别参考数据
  ['get-category-reference'](context, { route, type }) {
    let t = type || route.params.type
    return $http({
      api: `/api/trade/${t == 'market' ? 'getClassByTrade' : 'getTradeList'}`
    })
  },
  // 查询商标列表
  ['query-trade-list'](context, { route, randstr }) {
    let { keyword, searchType, pageSize, pageNo } = route.query
    keyword = encodeURIComponent(keyword)
    return $http({
      api: `/api/trade/query`,
      params: {
        keyword, searchType, pageSize, pageNo
      },
      type: 'GET',
      headers: { 'x-client-data': randstr }
    })
  },
  // 获取商标详情
  ['get-trade-detail'](context, { route, randstr }) {
    return $http({
      api: '/api/trade/detail',
      params: route.query,
      type: 'GET',
      headers: { 'x-client-data': randstr }
    })
  },
  // 获取订单列表
  ['get-trade-orderList']({ state }, params) {
    return $http({
      api: '/api/trade/getOrderList',
      params,
      type: 'GET',
      headers: { token: state.token }
    })
  },
  // 获取子行业列表
  ['get-sub-class-list'](context, { route }) {
    let { code } = route.query
    return code && code.trim() ? $http({
      api: '/api/trade/getSubClassList',
      params: { code },
      type: 'GET'
    }) : Promise.resolve()
  },
  // 获取申请人列表
  ['get-applicant-list']({ state }) {
    return $http({
      api: '/api/concator/list',
      type: 'GET',
      headers: { token: state.token }
    })
  },
  // 保存申请人
  ['save-applicant']({ state }, params) {
    return $http({
      api: `/api/concator/${params.id ? 'update': 'save'}`,
      params,
      headers: { token: state.token }
    })
  },
  // 获取申请人信息
  ['get-applicant-info']({ state }, id) {
    return $http({
      api: `/api/concator/info/${id}`,
      type: 'GET',
      headers: { token: state.token }
    })
  },
  // 文件上传
  upload({ state }, { file }) {
    if (!file) {
      return Promise.resolve()
    } else if (typeof file == 'string') {
      return Promise.resolve(file)
    }
    let formData = new FormData()
    formData.append('file', file)
    return $http({
      api: '/api/file/upload',
      params: formData,
      headers: {
        token: state.token,
        'Content-Type': 'multipart/form-data'
      }
    }).then(data => data.project)
  },
  // 获取省市区
  getAreas(context, { level, sheng, di }) {
    return $http({
      api: '/api/area',
      params: { level, sheng, di },
      type: 'GET'
    })
  },
  // 获取注册类型
  getKinds({ state }) {
    return $http({
      api: '/api/trade/getKinds',
      headers: { token: state.token }
    })
  },
  // 通过行业获取类别
  getClassByTrade(context, { id }) {
    return $http({
      api: '/api/trade/getClassByTrade',
      params: { tradeId: id },
      type: 'GET'
    })
  },
  // 注册商标表单提交
  registerTrade({ state }, params) {
    return $http({
      api: '/api/trade/register',
      params,
      headers: { token: state.token }
    })
  },
  // 获取订单详情
  getOrder({ state }, params) {
    return $http({
      api: '/api/trade/getOrder',
      params,
      headers: { token: state.token },
      type: 'GET'
    })
  },
  // 获取每日数据
  getEveryDayCounts(context) {
    return $http({
      api: '/api/trade/getEveryDayCounts',
      type: 'GET'
    })
  },
  // 获取客服
  getKefu(context) {
    return $http({
      api: '/api/trade/getKefu',
      type: 'GET'
    })
  }
}