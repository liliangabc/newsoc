/**
 * 根状态管理模块
 */

import Vue from 'vue'
import Vuex from 'vuex'
import jstz from 'jstimezonedetect'

import { $http } from '~/plugins/axios'

import { upload } from '../plugins'
import base64 from '../plugins/base64'

import im from '~/components/inbox/core/store'
import menuActions from '~/components/card/menu-actions/store'
import profile from './profile'
import home from './home'
import myclasses from './myclasses'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    // 用户数据
    userData: {
      userInfo: {},
      token: ''
    },
    previewParams: null,
    blocks: {
      mblockList: '',
      pblockList: '',
      whoBlockedMeList: ''
    }
  },
  mutations: {
    // 保存用户数据
    saveUserData: (state, data) => state.userData = data,
    // 清除用户数据
    clearUserData: (state, data) => state.userData = { userInfo: {}, token: '' },
    // 切换显示和隐藏预览
    togglePreview: (state, params = null) => state.previewParams = params,
    // 设置黑名单数据
    setBlocks: (state, data) => state.blocks = data,
    // 更新黑名单
    updateBlocks(state, { type, user }) {
      let { mblockList, pblockList } = state.blocks
      let mBlocks = mblockList ? mblockList.split(',') : []
      let pBlocks = pblockList ? pblockList.split(',') : []
      let curList = type == 'm' ? mBlocks : pBlocks
      let index = curList.indexOf(user)
      index != -1 ? curList.splice(index, 1) : curList.push(user)
      Vue.set(state.blocks, 'mblockList', mBlocks.join(','))
      Vue.set(state.blocks, 'pblockList', pBlocks.join(','))
    }
  },
  actions: {
    // 框架服务端初始化 | 用户自动登陆控制 | 该方法在服务端页面渲染之前被调用
    nuxtServerInit({ commit, dispatch }, { req }) {
      let { userData } = req.session
      if (!userData) return
      let { userName, password } = userData
      return $http({
        api: 'student_login.json',
        params: { userName, password }
      }).then(data => {
        commit('saveUserData', {
          userInfo: data.data, token: data.token
        })
        return dispatch('getBlocks').catch(err => console.log(err))
      }).catch(err => err => console.log(err))
    },
    // 文件上传
    upload({ dispatch }, { file }) {
      if (typeof file == 'string') return Promise.resolve(file)
      let fileType = file.name.split('.').reverse()[0]
      return new Promise((resolve, reject) => {
        dispatch('getUploadToken', { fileType }).then(token => {
          upload({ file, token }).then(data => {
            resolve(`http://${token.preffix}/${data.key}`)
          }).catch(reject)
        }).catch(reject)
      })
    },
    // 提交请求
    post({ state }, { api, data = {} }) {
      let { token } = state.userData
      let params = {
        dstTimeZoneId: jstz.determine().name(),
        fromWeb: 1
      }
      if (token) params.token = token
      params = Object.assign(params, data)
      return $http({ api: `/${api}.json`, params })
    },
    // 获取上传token
    getUploadToken({ dispatch }, data = {}) {
      return dispatch('post', {
        api: 'get_qiniu_uploadToken', data
      }).then(res => res.data)
    },
    // 获取黑名单列表
    getBlocks({ commit, dispatch }) {
      return dispatch('post', {
        api: 'student_stringBlockList'
      }).then(data => commit('setBlocks', data.data))
    },
    // 注册
    register({ dispatch }, params) {
      return dispatch('post', {
        api: 'student_register',
        data: params
      })
    },
    // 登录
    login({ commit, dispatch }, params) {
      let { userName, password } = params
      return dispatch('post', {
        api: 'login',
        data: {
          userName: base64(userName + 'opSAd^12dsa'),
          password: base64(password + 'opSAd^12dsa')
        }
      }).then(data => {
        commit('saveUserData',{
          userInfo: data.data, token: data.token
        })
        return data
      })
    },
    // 退出登录
    logout({ state, commit, dispatch }) {
      return dispatch('post', {
        api: 'logout',
        data: { token: state.userData.token }
      }).then(data => {
        commit('clearUserData')
      })
    },
    // 找回密码
    findpwd({ dispatch }, params) {
      return dispatch('post', {
        api: 'student_forget_password',
        data: params
      })
    }
  },

  modules: { im, menuActions, profile, home, myclasses }
})

export default store