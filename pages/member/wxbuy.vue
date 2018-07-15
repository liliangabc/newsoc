<template>
<div class="page-wxbuy">
  <div class="logo-wrapper">
    <img class="logo" src="~/assets/img/logo.png">
    <span class="title">收银台</span>
  </div>
  <div class="orderbox">
    <div class="clearfix detail">
      <p>商品名称: {{detail.kind}}商标【{{detail.name}}】</p>
      <p class="pull-left">订单编号: {{detail.outTradeNo}}</p>
      <p class="pull-right">应付金额: <b>￥{{detail.money}}</b></p>
    </div>
    <div class="clearfix order">
      <img class="wxlogo" src="~/assets/img/WePayLogo.png">
      <span class="amount">支付: <b>￥{{detail.money}}元</b></span>
    </div>
  </div>
  <div class="qrcode">
    <img class="qrc" :src="`/api/wxpay/scanCode2?product_no=${$route.query.product_no}`">
    <img src="~/assets/img/wx-sm.png">
  </div>
</div>
</template>
<script>
export default {
  asyncData({ route, store, redirect, isServer }) {
    if (isServer) return redirect('/member/trade-list')
    return store.dispatch('getOrder', {
      id: route.query.product_no
    }).then(data => {
      if (!data.data) return redirect('/member/trade-list')
      return { detail: data.data }
    }).catch(err => ({ errmsg: err.message }))
  },
  data() {
    return {
      detail: {},
      isDone: true
    }
  },
  methods: {
    getOrder() {
      if (!this.isDone) return
      this.isDone = false
      this.$store.dispatch('getOrder', {
        id: this.$route.query.id
      }).then(data => {
        this.isDone = true
        let detail = data.data || {}
        if (detail.payStatus == 1) {
          alert('支付成功！')
          location.replace('/member/trade-list')
        }
      }).catch(err => {
        this.isDone = true
      })
    }
  },
  mounted() {
    this.tid = setInterval(() => this.getOrder(), 1000)
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.tid)
    next()
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.page-wxbuy {
  .logo-wrapper {
    padding: 16px 0 12px;
    border-bottom: 1px solid $level3BorderColor;
    .logo {
      height: 60px;
      width: auto;
      margin-right: 6px;
    }
    .title {
      font-size: 16px;
      color: $primaryColor;
    }
  }
  .orderbox {
    font-size: 15px;
    color: $normalTextColor;
    b {
      color: $dangerColor;
      font-weight: normal;
    }
    .detail {
      padding: 16px 12px;
      line-height: 1.6;
      .pull-left {
        float: left;
      }
      .pull-right {
        float: right;
      }
    }
    .order {
      margin-top: 16px;
      padding: 12px;
      border: 1px solid $level3BorderColor;
      .wxlogo {
        height: 24px;
        float: left;
      }
      .amount {
        float: right;
      }
    }
  }
  .qrcode {
    width: 200px;
    margin: 36px auto 0;
    img {
      width: 100%;
      &.qrc {
        height: 200px;
        border: 1px solid $level3BorderColor;
      }
      + img {
        margin-top: 6px;
      }
    }
  }
}

@media (max-width: 768px) {
  .page-wxbuy {
    .orderbox {
      .detail {
        .pull-right {
          width: 100%;
        }
      }
    }
  }
}
</style>