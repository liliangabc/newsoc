<template>
<el-dialog custom-class="com-posts-gift" title="Gift" width="540px"
  :center="true"
  :close-on-click-modal="false"
  :visible.sync="isOpen"
  :before-close="onBeforeClose"
  @open="onOpen">
  <el-scrollbar tag="ul" class="gift-list">
    <li class="item" v-for="item in gifts" :key="item.id">
      <div class="inner" :class="{active: item == selectedGift}" @click="onItemClick(item)">
        <div class="image" :style="{backgroundImage: `url(${item.url})`}"></div>
        <h3 class="title">{{item.name}}</h3>
        <span class="coins">{{item.coins}} CP</span>
        <i class="el-icon-circle-check icon-checked" v-if="item == selectedGift"></i>
      </div>
    </li>
  </el-scrollbar>
  <div class="form-container">
    <div class="label">Gift Message</div>
    <el-input type="textarea" v-model.trim="sendReason" :autosize="{minRows: 2}"></el-input>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="small" :disabled="disabled" @click="onSubmit">Submit</el-button>
  </span>
</el-dialog>
</template>
<script>
export default {
  data() {
    return {
      gifts: [],
      coins: 0,
      sendReason: '',
      selectedGift: null
    }
  },
  computed: {
    giftParams() {
      return this.$store.state.menuActions.gift
    },
    isOpen() {
      return !!this.giftParams
    },
    disabled() {
      return !this.selectedGift
    }
  },
  methods: {
    // 关闭之前
    onBeforeClose() {
      this.sendReason = ''
      this.selectedGift = null
      this.$store.commit('actions/toggleModal', { cmd: 'gift' })
    },
    // 打开
    onOpen() {
      this.getCoins()
      if (!this.gifts.length) this.getData()
    },
    // 获取礼物列表
    getData() {
      return this.$store.dispatch('post', { api: 'gift_list' }).then(data =>
        this.gifts = data.gifts
      )
    },
    // 礼物单击
    onItemClick(item) {
      this.selectedGift = item
    },
    // 获取用户积分
    getCoins() {
      return this.$store.dispatch('post', {
        api: 'student_balance_publish'
      }).then(data =>
        this.coins = +data.data.coins
      ).catch(err => this.$alert(err.message, 'Error'))
    },
    // 提交 | 发送礼物
    onSubmit() {
      let giftCoins = +this.selectedGift.coins
      if (giftCoins > this.coins) {
        return this.$confirm('You don\'t have enough points, Please purchase.', 'Confirm', {
          confirmButtonText: 'Purchase',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
      }
      let comLoading = this.$loading()
      let { sendReason } = this
      let gift_id = this.selectedGift.id
      let { receiver, relateId: related_id, type: giftType } = this.giftParams
      this.$store.dispatch('post', {
        api: 'send_gift2Someone',
        data: {
          receiver, giftType, related_id, sendReason, gift_id
        }
      }).then(data => {
        comLoading.close()
        this.onBeforeClose()
        this.$message(data.info)
      }).catch(err => {
        comLoading.close()
        this.$alert(err.message, 'Error')
      })
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-posts-gift.el-dialog {
  .el-dialog__body {
    padding: 13px 13px 20px;
    .gift-list {
      height: 450px;
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .el-scrollbar__view {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 33%;
          padding: 6px;
          .inner {
            padding: 6px;
            text-align: center;
            position: relative;
            border: 1px solid $boxBorderColor;
            &.active {
              border-color: $themeBlueColor;
            }
            .image {
              height: 80px;
              background-repeat: no-repeat;
              background-position: center center;
              background-size: contain;
            }
            .title {
              font-size: 14px;
              font-weight: bold;
              line-height: 1.3;
              margin-top: 2px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              padding: 0 4px;
            }
            .coins {
              font-size: 12px;
              color: #8bbef3;
            }
            .icon-checked {
              position: absolute;
              top: 1px;
              right: 1px;
              font-size: 20px;
              color: $themeBlueColor;
            }
          }
        }
      }
    }
    .form-container {
      margin-top: 12px;
      padding: 0 6px;
      .label {
        margin-bottom: 3px;
      }
    }
  }
}
</style>