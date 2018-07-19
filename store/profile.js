/**
 * 个人页面状态管理模块
 */
import Vue from 'vue'

import { isMarket, isEvent, isClass, isMeetup, isMoment } from '~/plugins'

// 获取用户动态接口
function getDynamicAPI(route) {
  let { tab = 'followers' } = route.query
  let { type } = route.params
  let api
  if (type == '6') {
    api = ({ followers: 'someone_follow_me', following: 'someone_i_followed' })[tab]
  } else if (isEvent(type)) {
    api = 'get_profile_events'
  } else if (isMarket(type)) {
    api = 'get_profile_markets'
  } else if (isClass(type)) {
    api = 'get_profile_classes'
  } else if (isMeetup(type)) {
    api = 'get_profile_meetingUp'
  } else if (isMoment(type)) {
    api = 'get_profile_wall'
  }
  return api
}

export default {
  state: {
    profile: {},
    endrosments: [],
    mutual: {}
  },
  mutations: {
    ['profile/set'](state, data) {
      state.profile = data.profile
      state.endrosments = data.endrosments
      state.mutual = data.mutual
    }
  },
  actions: {
    // 获取用户个人资料
    ['profile/get']({ commit, dispatch }, { route }) {
      let { id: stu_id } = route.params
      return dispatch('post', {
        api: 'get_student_profile',
        data: { stu_id }
      }).then(data => commit('profile/set', data)).catch(err => console.log(err))
    },
    // 获取用户动态
    ['profile/getDynamic']({ state, commit, dispatch }, { route, page = 1, rows = 10 }) {
      let api = getDynamicAPI(route)
      let { id: stu_id, type } = route.params
      return dispatch('post', {
        api, data: { page, rows, [type == '6' ? 'follower' : 'stu_id'] : stu_id }
      }).then(data => {
        let result = data.page ? data.page.result : data.data.result
        let hasNext = data.page ? data.page.hasNext : data.data.hasNext
        return {
          listData: { page, hasNext: hasNext == '1', list: result }
        }
      })
    }
  }
}