import WebIM from 'easemob-websdk/dist/websdk-1.4.10.min'

import { getNow } from './utils'

// IM配置
let config = {
  xmppURL: 'im-api.easemob.com',
  appkey: '1160161031178471#circcustest',
  // appkey: 'circcusim#circcus',
  isMultiLoginSessions: true,
  isAutoLogin: true,
  isDebug: false,
  autoReconnectNumMax: 2,
  autoReconnectInterval: 2,
  delivery: true
}

WebIM.config = Object.assign(config, location.protocol == 'http:' ? {
  apiURL: 'http://a1.easemob.com',
  https: false
} : {
  apiURL: 'https://a1.easemob.com',
  https: true
})

// 创建连接
WebIM.conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: WebIM.config.https,
  url: WebIM.config.xmppURL,
  isAutoLogin: WebIM.config.isAutoLogin,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  delivery: WebIM.config.delivery
})

// 全局可访问
window.WebIM = WebIM