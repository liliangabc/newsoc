<template>
<div class="com-inbox-chat-history">
  <ul class="list">
    <li v-for="item in messages" :key="item.id" class="talk-item">
      <div class="left">
        <span class="line"></span>
        <com-avator size="84" :src="getAvator(item)"></com-avator>
      </div>
      <div class="right">
        <h3 class="username">{{getUserName(item)}} <span class="date">{{item.time}}</span></h3>
        <p class="text" :class="{islink: getIds(item)}" v-if="item.msgType == 'text'" @click="onTextClick(item)" v-html="parseText(item.data)"></p>
        <img class="image" v-else-if="item.msgType == 'pic'" :src="item.url" @click="onPicClick(item)">
      </div>
    </li>
  </ul>
  <com-market-preview-dialog ref="market-preview" :markets="curMarkets"></com-market-preview-dialog>
</div>
</template>
<script>
import ComAvator from '~/components/common/avator'
import ComMarketPreviewDialog from './market-preview'
export default {
  components: { ComAvator, ComMarketPreviewDialog },
  data() {
    return {
      curMarkets: {},
      marketPreviewShow: false
    }
  },
  props: {
    emojiList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    messages() {
      let { user } = this.$route.params
      let userMessages = this.$store.state.im.messages.find(item => item.userName == user)
      return userMessages ? userMessages.list : []
    }
  },
  methods: {
    // 获取用户头像
    getAvator(item) {
      return item.ext ? item.ext.userPic : this.userInfo.userHeadImage
    },
    // 获取用户名
    getUserName(item) {
      return item.ext ? item.ext.userName : this.userInfo.nickName
    },
    // 滚动到底部 有可能在父组件中被调用
    scrollToBottom() {
      this.$el.scrollTo(0, this.$el.scrollHeight)
    },
    // 获取ID列表
    getIds(item) {
      let bool = /\[(.+)\]$/.test(item.data)
      let yourIds = RegExp.$1
      let bool2 = /\<(.+)\>/.test(item.data)
      let myIds = RegExp.$1
      ;/\[(.+),\w+\]$/.test(item.data)
      let yourName = RegExp.$1
      return bool && bool2 ? { yourIds, myIds, yourName } : null
    },
    // 图片单击 打开大图预览
    onPicClick(item) {
      let pics = []
      this.messages.filter(msg => msg.msgType == 'pic').forEach(msg => pics.push(msg.url))
      let curIndex = pics.indexOf(item.url)
      this.$store.commit('togglePreview', { pics, curIndex })
    },
    // 文本单击 尝试打开商品预览
    onTextClick(item) {
      let ids = this.getIds(item)
      if (!ids) return
      let { yourIds, myIds, yourName } = ids
      this.curMarkets.yourName = yourName
      this.$refs['market-preview'].setVisible(true)
      this.$store.dispatch('post', {
        api: 'imessage_markets_list',
        data: { mine: myIds, yours: yourIds }
      }).then(data => {
        this.$set(this.curMarkets, 'my', data.data.mineList)
        this.$set(this.curMarkets, 'your', data.data.yoursList)
      })
    },
    // 解析文本消息
    parseText(data) {
      for (let i = 0, len = this.emojiList.length; i < len; i++) {
        let { key, value } = this.emojiList[i]
        while (data.indexOf(key) != -1) {
          data = data.replace(key, `<img src="${value}">`)
        }
      }
      let div = document.createElement('div')
      div.innerHTML = data
      return div.querySelector('img') ? data : data.replace('<', '&lt;').replace('>', '&gt;')
    }
  },
  mounted() {
    this.scrollToBottom()
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-inbox-chat-history {
  height: 100%;
  overflow: auto;
  padding: 54px 100px 100px 83px;
  background-color: #fff;
  border-left: 1px solid $boxBorderColor;
  border-right: 1px solid $boxBorderColor;
  .talk-item {
    display: flex;
    min-height: 137px;
    .left {
      position: relative;
      .line {
        width: 4px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -2px;
        background-color: #d7d7d7;
      }
    }
    .right {
      flex: 1;
      margin-left: 34px;
      padding-bottom: 50px;
      padding-top: 16px;
      .username {
        color: $themeBlueColor;
        font-size: 18px;
        margin-bottom: 16px;
        .date {
          color: $themeBorderGreyColor;
          font-size: 12px;
        }
      }
      .text {
        color: #606060;
        font-size: 15px;
        word-break: break-all;
        &.islink {
          cursor: pointer;
          text-decoration: underline;
        }
        img {
          width: 24px;
        }
      }
      .image {
        display: block;
        max-width: 240px;
        max-height: 280px;
      }
    }
    &:last-child {
      .left {
        .line {
          display: none;
        }
      }
    }
  }
}
</style>