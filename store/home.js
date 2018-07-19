/**
 * 首页状态管理模块
 */
import Vue from 'vue'

import { isMarket, isEvent, isClass, isMeetup, isMoment, isUser } from '~/plugins'

function getKW(route) {
  let { keyWords } = route.query
  return keyWords ? keyWords.trim() : ''
}

// 获取首页数据接口
function getDataAPI(route) {
  let api, { type } = route.params
  if (getKW(route)) api = 'home_search_list'
  else if (isEvent(type)) api = 'index_events_list'
  else if (isMarket(type)) api = 'index_markets_list'
  else if (isClass(type)) api = 'index_classes_list'
  else if (isMeetup(type)) api = 'index_meetingup_list'
  else if (isMoment(type)) api = 'index_homepage_list'
  return api
}

// 获取帖子详情接口
function getPostsDetailAPI({ route, type }) {
  let api, ptype = type || route.params.type
  if (isEvent(ptype)) {
    api = 'index_event_detail'
  } else if (isMarket(ptype)) {
    api = 'index_market_detail'
  } else if (isClass(ptype)) {
    api = 'index_classes_detail'
  } else if (isMeetup(ptype)) {
    api = 'index_meeting_detail'
  } else if (isMoment(ptype)) {
    api = 'moments_details'
  }
  return api
}

// 获取帖子删除接口
function getPostsDeleteAPI(type) {
  let api
  if (isEvent(type)) {
    api = 'student_delete_events'
  } else if (isMarket(type)) {
    api = 'student_delete_markets'
  } else if (isClass(type)) {
    api = 'delete_classes_detail'
  } else if (isMeetup(type)) {
    api = 'delete_meeting'
  } else if (isMoment(type)) {
    api = 'delete_moments'
  }
  return api
}

// 获取评论详情接口
function getCommentDetailAPI({ route, type }) {
  let api, ptype = type || route.params.type
  if (isEvent(ptype)) {
    api = 'events_comments_detail'
  } else if (isMarket(ptype)) {
    api = 'markets_comments_deail'
  } else if (isClass(ptype)) {
    api = 'classrep_detail_info'
  }
  return api
}

// 获取评论回复列表接口
function getCommentReplyListAPI({ route, type }) {
  let api, ptype = type || route.params.type
  if (isEvent(ptype)) {
    api = 'events_commentsReply_list'
  } else if (isMarket(ptype)) {
    api = 'markets_commentsReply_list'
  } else if (isClass(ptype)) {
    api = 'class_commentsReply_list'
  }
  return api
}

// 获取评论或者回复的赞和取消赞接口
function getCommentZanAPI({ route, type }) {
  let api, ptype = type || route.params.type
  if (isEvent(ptype)) {
    api = 'eventrep_toggle_like'
  } else if (isMarket(ptype)) {
    api = 'marketRep_toggle_like'
  } else if (isClass(ptype)) {
    api = 'classrep_toggle_like'
  }
  return api
}

function getPostById(arr, id) {
  return arr.find(item => item.id == id) || {}
}

function getPostType({ route, item }) {
  return item.type || route.params.type
}

export default {
  state: {
    listData: { page: 1, rows: 12, hasNext: false, list: [] }
  },
  mutations: {
    ['home/setList'](state, { page, hasNext, list, action }) {
      let { listData } = state
      listData.page = page
      listData.hasNext = hasNext
      action == 'load' ? listData.list.push(...list) : (listData.list = list)
    },
    ['home/updateItem'](state, { item, attrs }) {
      for (let key in attrs) Vue.set(item, key, attrs[key])
    }
  },
  actions: {
    // 获取首页列表数据
    ['home/getList']({ state, commit, dispatch }, { route, action }) {
      let { page, rows } = state.listData
      page = action == 'load' ? page + 1 : 1
      let api = getDataAPI(route)
      let postData = Object.assign({ page, rows }, route.query)
      if (getKW(route)) postData = Object.assign(postData, route.params)
      return dispatch('post', {
        api, data: postData
      }).then(data => commit('home/setList', {
        page,
        hasNext: data.data.hasNext == '1',
        list: data.data.result,
        action
      }))
    },
    // 切换动态的喜欢和取消喜欢
    ['home/toggleMomentLike']({ commit, dispatch }, { item }) {
      return dispatch('post', {
        api: 'student_like_moments',
        data: { moment_id: item.id }
      }).then(data => {
        let isLike = item.isLike == '1', likeCount = ~~item.likeCount
        likeCount = isLike ? likeCount - 1 : likeCount + 1
        const attrs = { isLike: isLike ? '-1' : '1', likeCount }
        commit('home/updateItem', { item, attrs })
        return attrs
      })
    },
    // 切换收藏和取消收藏
    ['home/togglePostFavorite']({ commit, dispatch }, { route, item }) {
      const { id } = item, obj = {
        2: { id: 'marketId', api: 'market_toggle_favorite' },
        1: { id: 'eventId', api: 'event_toggle_favorite' },
        3: { id: 'classId', api: 'class_toggle_favorite' },
        4: { id: 'meetId', api: 'student_favorite_meetingup' }
      }
      let type = getPostType({ route, item })
      return isMoment(type) ? dispatch('home/toggleMomentLike', { item }) : dispatch('post', {
        api: obj[type].api,
        data: { [obj[type].id]: id }
      }).then(data => {
        let attrs = { isFavorite: item.isFavorite == '1' ? '0' : '1' }
        commit('home/updateItem', { item, attrs })
        return attrs
      })
    },
    // 切换帖子的赞和取消赞
    ['home/togglePostZan']({ commit, dispatch }, { route, item }) {
      let apis = {
        1: { id: 'eventId', api: 'event_toggle_like' },
        3: { id: 'classId', api: 'class_toggle_like' }
      }, postType = getPostType({ route, item })
      return dispatch('post', {
        api: apis[postType].api,
        data: { [apis[postType].id]: item.id }
      }).then(data => {
        let isLike = item.isLike, likeCount = ~~item.likeCount, caiCount = ~~item.caiCount
        const attrs = {}
        if (isLike == '0') {
          attrs.caiCount = caiCount - 1
          attrs.likeCount = likeCount + 1
        } else if (isLike == '-1') {
          attrs.likeCount = likeCount + 1
        } else {
          attrs.likeCount = likeCount - 1
        }
        attrs.isLike = isLike == '1' ? '-1' : '1'
        commit('home/updateItem', { item, attrs })
        return attrs
      })
    },
    // 切换帖子的踩和取消踩
    ['home/togglePostCai']({ commit, dispatch }, { route, item }) {
      let apis = {
        1: { id: 'eventId', api: 'event_toggle_cai' },
        3: { id: 'classId', api: 'class_toggle_cai' }
      }, postType = getPostType({ route, item })
      return dispatch('post', {
        api: apis[postType].api,
        data: { [apis[postType].id]: item.id }
      }).then(data => {
        let isLike = item.isLike, likeCount = ~~item.likeCount, caiCount = ~~item.caiCount
        const attrs = {}
        if (isLike == '0') {
          attrs.caiCount = caiCount - 1
        } else if (isLike == '-1') {
          attrs.caiCount = caiCount + 1
        } else {
          attrs.likeCount = likeCount - 1
          attrs.caiCount = caiCount + 1
        }
        attrs.isLike = isLike == '0' ? '-1' : '0'
        commit('home/updateItem', { item, attrs })
        return attrs
      })
    },
    // 获取帖子类别 market | event | class | meetup
    ['home/getCategory']({ dispatch }, type) {
      let api
      if (isEvent(type)) {
        api = 'student_publish_event_category'
      } else if (isMarket(type)) {
        api = 'market_category_kind'
      } else if (isClass(type)) {
        api = 'student_publish_class_category'
      } else if (isMeetup(type)) {
        api = 'student_publish_meet_category'
      } else {
        return Promise.resolve([])
      }
      return dispatch('post', { api }).then(data => data.data)
    },
    // 获取关键字相关的学校
    ['home/getSchools']({ dispatch }, { route }) {
      let { type } = route.params
      let keyWords = getKW(route)
      return ((isMarket(type) || isClass(type) || isUser(type)) && keyWords) ? dispatch('post', {
        api: 'get_collegeby_keywordsandtype',
        data: { type, keyWords }
      }).then(data => data.data.slice(0, 20)) : Promise.resolve([])
    },
    // 获取帖子评论列表
    ['home/getComments']({ dispatch }, { id, type, page = 1, rows = 10 }) {
      let api
      if (isEvent(type)) {
        api = 'events_recentComments_list'
      } else if (isMarket(type)) {
        api = 'markets_recentComments_list'
      } else if (isClass(type)) {
        api = 'class_recentComments_list'
      } else if (isMoment(type)) {
        api = 'moments_replies'
      }
      return dispatch('post', {
        api, data: { [isMoment(type) ? 'm_id' : 'id'] : id, page, rows }
      })
    },
    // 发布动态评论和回复
    ['home/editMomentComment']({ dispatch }, { content, postId, commentId, anonymous = '0' }) {
      let post_id = postId
      return dispatch('post', {
        api: 'publish_moments_reply',
        data: { rep_content: content, anonymous, post_id, commentId }
      })
    },
    // 发布和编辑帖子评论
    ['home/editComment']({ dispatch }, { type, content, postId, commentId, picUrls, fileUrls, anonymous = '0' }) {
      if (isMoment(type)) return dispatch('home/editMomentComment', { content, postId, commentId })
      let obj
      if (isEvent(type)) {
        obj = { api: 'publish_eventsComments', id: 'event_id' }
      } else if (isMarket(type)) {
        obj = { api: 'publish_marketsComments', id: 'market_id' }
      } else if (isClass(type)) {
        obj = { api: 'publish_classComments', id: 'post_id' }
      }
      let { api } = obj
      return dispatch('post', {
        api, data: { content, picUrls, fileUrls, anonymous, [obj.id] : postId, id: commentId  }
      })
    },
    // 获取帖子详情
    ['home/getPosts']({ dispatch }, { route, type, id }) {
      let api = getPostsDetailAPI({ route, type })
      let pId= id || route.query.id
      let ptype = type || route.params.type
      return dispatch('post', {
        api, data: { [isMoment(ptype) ? 'm_id' : 'id']: pId }
      }).then(data => ({
          detail: data.moment || data.data,
          attends: data.attendedUsers
        })
      )
    },
    // 帖子删除
    ['home/deletePosts']({ dispatch }, { posts, list, type }) {
      let api = getPostsDeleteAPI(type)
      return dispatch('post', {
        api, data: { [isMoment(type) ? 'm_id' : 'id']: posts.id }
      }).then(data => {
        let index = list.indexOf(posts)
        index !== -1 && list.splice(index, 1)
        return data
      })
    },
    // 商品标记为已卖出
    ['home/marketSoldChange']({ dispatch }, posts) {
      return dispatch('post', {
        api: 'update_market_sold',
        data: { id: posts.id }
      }).then(data => {
        Vue.set(posts, 'sold', '1')
        return data
      })
    },
    // 获取评论详情
    ['home/getComment']({ dispatch }, { route, type, id }) {
      let api = getCommentDetailAPI({ route, type })
      return dispatch('post', {
        api, data: { id: id || route.query.id }
      })
    },
    // 获取评论回复列表
    ['home/getReplyList']({ dispatch }, { route, type, id, page = 1, rows = 10 }) {
      let api = getCommentReplyListAPI({ route, type })
      return dispatch('post', {
        api, data: { commentId: id || route.query.id, page, rows }
      })
    },
    // 切换评论 or 回复的赞和取消赞
    ['home/toggleCommentZan']({ dispatch }, { route, type, id }) {
      let api = getCommentZanAPI({ route, type })
      return dispatch('post', {
        api, data: { repId: id || route.query.id }
      })
    },
    // 发布评论回复
    ['home/editReply']({ dispatch }, { route, type, content, id }) {
      let api, ptype = type || route.params.type
      if (isEvent(ptype)) {
        api = 'publish_eventsComments'
      } else if (isMarket(ptype)) {
        api = 'publish_marketsComments'
      } else if (isClass(ptype)) {
        api = 'publish_classComments'
      }
      return dispatch('post', {
        api, data: { content, commentId: id || route.query.id }
      })
    },
    // 删除评论或者回复
    ['home/deleteComment']({ dispatch }, { route, type, id }) {
      let ptype = type || route.params.type
      return dispatch('post', {
        api: 'delete_post_comments',
        data: { id: id || route.query.id, type: ptype }
      })
    },
    // 评论切换赞和取消赞
    ['home/commentToggleZan']({ dispatch }, { route, type, id }) {
      let api, ptype = type || route.params.type
      if (isEvent(ptype)) {
        api = 'eventrep_toggle_like'
      } else if (isMarket(ptype)) {
        api = 'marketRep_toggle_like'
      } else if (isClass(ptype)) {
        api = 'classrep_toggle_like'
      }
      return dispatch('post', {
        api, data: { repId: id || route.query.id }
      })
    },
    // 评论切换踩和取消踩
    ['home/commentToggleCai']({ dispatch }, { route, type, id }) {
      let api, ptype = type || route.params.type
      if (isEvent(ptype)) {
        api = 'eventrep_toggle_cai'
      } else if (isMarket(ptype)) {
        api = 'marketRep_toggle_cai'
      } else if (isClass(ptype)) {
        api = 'classrep_toggle_cai'
      }
      return dispatch('post', {
        api, data: { repId: id || route.query.id }
      })
    }
  }
}