/**
 * 我的课程状态管理模块
 */
import Vue from 'vue'

export default {
  state: {

  },
  mutations: {

  },
  actions: {
    ['myclasses/getList']({ dispatch }, { page = 1, rows = 10 }) {
      return dispatch('post', {
        api: 'course_myfollow_list',
        data: { page, rows }
      })
    }
  }
}