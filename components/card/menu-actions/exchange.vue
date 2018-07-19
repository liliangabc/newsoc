<template>
<el-dialog custom-class="com-market-exchange" title="Exchange" width="480px"
  :close-on-click-modal="false"
  :visible.sync="isOpen"
  :before-close="onBeforeClose"
  @open="onOpen">
  <el-checkbox-group v-model="checkedMarkets">
    <ul class="list">
      <li v-for="item in markets" :key="item.id">
        <div class="image" :style="{backgroundImage: `url(${getThumb(item.picUrls)})`}"></div>
        <div class="middle">
          <h3 class="title">{{item.title}}</h3>
          <span class="date">{{item.lastModifyTime}}</span>
        </div>
        <div class="right">
          <span class="price">${{+item.price}}</span><br>
          <el-checkbox :label="item"></el-checkbox>
        </div>
      </li>
    </ul>
  </el-checkbox-group>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="small" :disabled="disabled" @click="onSubmit">Send</el-button>
  </span>
</el-dialog>
</template>
<script>
export default {
  data() {
    return { markets: [], checkedMarkets: [] }
  },
  computed: {
    exchangeParams() {
      return this.$store.state.menuActions.exchange
    },
    isOpen() {
      return !!this.exchangeParams
    },
    disabled() {
      return !this.checkedMarkets.length
    }
  },
  methods: {
    // 关闭对话框
    close() {
      this.$store.commit('actions/toggleModal', { cmd: 'exchange' })
    },
    // 对话框关闭之前
    onBeforeClose() {
      this.markets = []
      this.checkedMarkets = []
      this.close()
    },
    // 对话框被打开事件
    onOpen() {
      this.getData()
    },
    // 获取列表数据
    getData() {
      this.$store.dispatch('post', {
        api: 'student_activities_markets'
      }).then(data => {
        this.markets = data.data.result
      })
    },
    // 获取第一张缩略图
    getThumb(picUrls, size = 60) {
      return picUrls.split(',')[0].replace('?imageslim', `?imageView2/1/w/${size * 2}`)
    },
    // 发送文本消息
    sendText() {
      let { posts } = this.exchangeParams
      let { nickName, id } = posts
      let userPic = posts.userHeadImage
      let userName = posts.userName.toLowerCase()
      let titles = this.checkedMarkets.map(item => item.title).join(',')
      let ids = this.checkedMarkets.map(item => item.id).join(',')
      this.$store.dispatch('im/sendText', {
        message: `Hi,${nickName},please check my item<${titles},${ids}>,I would like to exchange it with yours[${nickName},${id}]`,
        toUser: { nickName, userName, userPic }
      }).catch(err => this.$message.error(err.message))
    },
    // 提交
    onSubmit() {
      let comLoading = this.$loading()
      let { id: to_marketId } = this.exchangeParams.posts
      let markets_id = this.checkedMarkets.map(item => item.id).join(',')
      this.$store.dispatch('post', {
        api: 'student_market_exchange',
        data: { to_marketId, markets_id }
      }).then(data => {
        this.$message({ type: 'success', message: data.info })
        this.sendText()
        comLoading.close()
        this.onBeforeClose()
      }).catch(err => {
        comLoading.close()
        this.$message.error(err.message)
      })
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-market-exchange {
  .list {
    min-height: 240px;
    li {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid $boxBorderColor;
      .image {
        width: 60px;
        height: 60px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
      }
      .middle {
        flex: 1;
        margin: 0 12px;
        .title {
          font-size: 14px;
          font-weight: bold;
          color: #363636;
        }
        .date {
          font-size: 12px;
          color: $themeBorderGreyColor;
        }
      }
      .right {
        text-align: right;
        .price {
          color: #E6A23C;
          font-size: 13px;
        }
      }
    }
  }
}
</style>