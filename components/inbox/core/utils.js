import moment from 'moment'

// 获取当前时间
export function getNow() {
  return moment().format('M/DD, h:mm a')
}

// 收到消息处理
function onMessage(msg, type, commit) {
  msg.msgType = type
  msg.time = getNow()
  let types = {
    pic: '[picture]',
    audio: '[audio]',
    location: '[my location]'
  }
  if (type in types) msg.data = types[type]
  commit('im/addMessage', {
    toUser: {
      nickName: msg.ext.userName,
      userName: msg.from,
      userPic: msg.ext.userPic
    }, msg
  })
}

// 添加监听器
export function addIMListener(commit) {
  WebIM.conn.listen({
    onOpened: () => console.log('access successed!'),
    onClosed: () => console.log('access closed!'),
    onOnline: () => console.log('is online!'),
    onOffline: () => console.log('is offline!'),
    onError: msg => console.log('onError: ', msg),
    onTextMessage: msg => onMessage(msg, 'text', commit),
    onEmojiMessage: msg => onMessage(msg, 'emoji', commit),
    onPictureMessage: msg => onMessage(msg, 'pic', commit),
    onAudioMessage: msg => onMessage(msg, 'audio', commit),
    onLocationMessage: msg => onMessage(msg, 'location', commit)
  })
}

// 通过消息列表获取对方用户
export function getToUserByMessages(userName, msgs) {
  return msgs.find(item => item.userName == userName) || {}
}