/**
 * 即时通讯状态管理模块
 * 
 * 消息列表格式 [{ nickName: '', userName: '', userPic: '', isAddCount: true, newCount: 0, list: [] }, ...]
 */
import Vue from 'vue'
import localforage from 'localforage'

import { getNow, addIMListener } from './utils'

localforage.config({ name: 'webim', size: 49807360 })

const updateDB = msgs => {
  localforage.setItem('webimStore', msgs).catch(err => console.log(err))
}

const imStore = {
  state: {
    messages: [],
    isLogined: false
  },
  mutations: {
    // 增加聊天用户
    ['im/addUser'](state, toUser) {
      const { messages } = state
      let { nickName, userName, userPic } = toUser
      let userMessages = messages.find(item => item.userName == toUser.userName)
      if (!userMessages) {
        messages.push({ nickName, userName, userPic, list: [] })
      }
    },
    // 增加消息
    ['im/addMessage'](state, { toUser, msg }) {
      const { messages } = state
      let { userName, nickName, userPic } = toUser
      // 查找该用户消息 | Object
      let userMessages = messages.find(_ => _.userName == toUser.userName)
      // 如果存在 那么新消息压入用户消息列表 | Array
      if (userMessages) {
        userMessages.list.push(msg)
      // 否则 创建用户消息 | Object, 并追加到总消息列表 | Array
      } else {
        userMessages = { userName, nickName, userPic, isAddCount: true, list: [msg] }
        messages.push(userMessages)
      }
      // 如果添加计数为真 并且 消息来自对方 那么 消息计数自增
      if (userMessages.isAddCount && msg.from) {
        let { newCount = 0 } = userMessages
        Vue.set(userMessages, 'newCount', ++newCount)
      }
      // 更新消息数据库
      updateDB(messages)
    },
    // 通过数据库更新消息
    ['im/updateMsgsFromDB'](state) {
      state.isLogined = true
      localforage.getItem('webimStore').then(value => {
        if (value) state.messages = value
      }).catch(err => console.log(err))
    },
    // 清除所有消息
    ['im/clearMessages'](state) {
      state.messages = []
      localforage.clear()
    },
    // 清除新消息计数
    ['im/clearNewCount'](state, userName) {
      const { messages } = state
      let userMessages = messages.find(_ => _.userName == userName)
      if (!userMessages) return
      Vue.delete(userMessages, 'newCount')
      updateDB(messages)
    },
    /**
     * 切换是否添加计数
     * 不添加计数的条件：当前在inbox页面 并且在与userName聊天 那么该userName不添加计数 否则添加计数
     * 离开聊天页面 所有添加计数
     * 如果不提供用户名 那么操作的是所有有户
     */
    ['im/toggleAddCount'](state, { isAddCount = true, userName }) {
      const { messages } = state
      if (userName) {
        messages.forEach(_ => Vue.set(_, 'isAddCount', _.userName == userName ? isAddCount : true))
      } else {
        messages.forEach(_ => Vue.set(_, 'isAddCount', isAddCount))
      }
    }
  },
  actions: {
    // 登陆
    ['im/login']({ rootState, state, commit }) {
      let { apiURL:apiUrl, appkey: appKey  } =  WebIM.config
      let { easemobUserName: user, easemobPwd: pwd, easemobNic } = rootState.userData.userInfo
      if (!user || state.isLogined) return Promise.reject()
      return new Promise((resolve, reject) => {
        const options = {
          apiUrl, user, pwd, appKey,
          success: token => {
            WebIM.utils.setCookie('webim_' + easemobNic, token.access_token, 1)
            let imUser = localStorage.getItem('im_user')
            if (imUser == easemobNic) {
              commit('im/updateMsgsFromDB')
            } else {
              commit('im/clearMessages')
              localStorage.setItem('im_user', easemobNic)
            }
            // 添加IM监听器 在这里传递状态改变对象
            addIMListener(commit)
            resolve()
          },
          error: reject
        }
        WebIM.conn.open(options)
      })
    },
    // 退出
    ['im/logout']({ rootState, commit }) {
      let { easemobNic } = rootState.userData.userInfo
      WebIM.utils.setCookie()
      commit('im/clearMessages')
      window.WebIM && window.WebIM.conn.close()
    },
    // 发送文本消息
    ['im/sendText']({ rootState, commit }, { message, toUser }) {
      let { nickName: userName, userHeadImage: userPic } = rootState.userData.userInfo
      let id = WebIM.conn.getUniqueId()
      const msg = new WebIM.message('txt', id)
      return new Promise((resolve, reject) => {
        msg.set({
          msg: message,
          to: toUser.userName,
          roomType: false,
          ext: { userName, userPic },
          success: (id, serverMsgId) => {
            commit('im/addMessage', {
              toUser, msg: {
                data: message,
                msgType: 'text',
                time: getNow(),
                id: serverMsgId,
              }
            })
            resolve()
          },
          fail: reject
        })
        msg.body.chatType = 'singleChat'
        WebIM.conn.send(msg.body)
      })
    },
    // 发送图片消息
    ['im/sendImage']({ rootState, commit }, { fileEl, toUser }) {
      let { nickName: userName, userHeadImage: userPic } = rootState.userData.userInfo
      let id = WebIM.conn.getUniqueId()
      const msg = new WebIM.message('img', id)
      const file = WebIM.utils.getFileUrl(fileEl)
      const allowType = ['jpg', 'jpeg', 'gif', 'png', 'bmp']
      let fileType = file.filetype.toLowerCase(), imgUrl = ''
      return new Promise((resolve, reject) => {
        if (allowType.indexOf(fileType) == -1) {
          return reject(Error('Please select image file.'))
        }
        const options = {
          apiUrl: WebIM.config.apiURL,
          file,
          to: toUser.userName,
          roomType: false,
          chatType: 'singleChat',
          ext: { userName, userPic },
          onFileUploadError: () => reject('File upload error.'),
          onFileUploadComplete: data => {
            imgUrl = `${data.uri}/${data.entities[0].uuid}`
          },
          success: (id, serverMsgId) => {
            commit('im/addMessage', {
              toUser, msg: {
                data: '[picture]',
                msgType: 'pic',
                time: getNow(),
                id: serverMsgId,
                url: imgUrl
              }
            })
            resolve()
          }
        }
        msg.set(options)
        WebIM.conn.send(msg.body)
      })
    }
  }
}

export default imStore