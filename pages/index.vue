<template>
<div class="page-index">
  <div class="logo">
    <img src="~/assets/img/logo.png">
  </div>
  <!-- 搜索盒 -->
  <div class="search-wrapper">
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab.value" :class="{active: tab == activeTab}" @click="onToggleActiveTab(tab)">{{tab.label}}</button>
    </div>
    <div class="clearfix search-box">
      <input type="text" :placeholder="`请在次输入${activeTab.hint}`" v-model.trim="keyword" @keyup.enter="onQuery">
      <button class="button warning" @click="onQuery">查询一下</button>
      <button class="button warning" @click="onRegister">注册商标</button>
    </div>
    <div class="links">
      <router-link to="/category-reference/market">商品类别参考</router-link>
      <span class="fgline">|</span>
      <router-link to="/category-reference/trade">行业类别参考</router-link>
      <span class="fgline">|</span>
      <a target="__blank" href="http://www.wipo.int/branddb/en/">国际商标查询</a>
    </div>
  </div>
  <!-- 概略数据 -->
  <div class="rough-data">
    <ul class="clearfix">
      <li>
        <p class="value"><b>{{everyDayCounts.curTradeCount}}</b>位</p>
        <p class="title"><img src="~/assets/img/nb1.png">注册用户</p>
      </li>
      <li>
        <p class="value"><b>{{everyDayCounts.curUserCount}}</b>位</p>
        <p class="title"><img src="~/assets/img/nb1.png">今日注册用户</p>
      </li>
      <li>
        <p class="value"><b>{{everyDayCounts.tradeCount}}</b>个</p>
        <p class="title"><img src="~/assets/img/nb2.png">注册商标</p>
      </li>
      <li>
        <p class="value"><b>{{everyDayCounts.userCount}}</b>个</p>
        <p class="title"><img src="~/assets/img/nb2.png">今日注册商标</p>
      </li>
    </ul>
  </div>
  <!-- 二维码 -->
  <div class="qrcodebox">
    <div class="item">
      <img src="~/assets/img/xchx_qrcode.jpg">
      <br>微信小程序
    </div>
    <div class="item">
      <img src="~/assets/img/gzhh_qrcode.jpg">
      <br>微信公众号
    </div>
  </div>
</div>
</template>
<script>
export default {
  asyncData({ route, store }) {
    return store.dispatch('getEveryDayCounts').then(data => {
      return { everyDayCounts: data.data }
    }).catch(err => console.log(err))
  },
  data() {
    const tabs = [
      { label: '商标名称查询', hint: '所要查询的商标名称', value: 1 },
      { label: '申请人查询', hint: '申请人姓名', value: 3 },
      { label: '注册号查询', hint: '所查商标注册号', value: 2 }
    ]
    return {
      tabs,
      activeTab: tabs[0],
      keyword: '',
      everyDayCounts: {}
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    },
    disabled() {
      return !this.keyword
    }
  },
  methods: {
    onToggleActiveTab(tab) {
      this.activeTab = tab
    },
    onQuery() {
      if (this.disabled) return alert('请输入查询内容')
      location.href = `/query?keyword=${this.keyword}&searchType=${this.activeTab.value}`
    },
    onRegister() {
      this.$router.push(this.token ? '/member/trade-edit' : '/entry/register')
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.page-index {
  padding: 80px 0;
  .logo {
    text-align: center;
    margin-bottom: 90px;
    img {
      max-width: 270px;
    }
  }
  .search-wrapper {
    .tabs {
      button {
        width: 94px;
        height: 28px;
        font-size: 12px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        color: $normalTextColor;
        position: relative;
        + button {
          margin-left: 6px;
        }
        &:hover {
          background-color: $level3BorderColor;
        }
        &.active {
          color: #fff;
          background-color: $primaryColor;
        }
        &.active:before {
          border-left: solid 5px #fff;
          border-right: solid 5px #fff;
          border-top: solid 8px $primaryColor;
          width: 0px;
          height: 0px;
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          margin-left: -5px;
        }
      }
    }
    .search-box {
      margin: 12px 0;
      input {
        width: 710px;
        height: 36px;
        line-height: 36px;
        margin-right: 12px;
        padding: 0 12px;
        float: left;
      }
      button {
        width: 120px;
        + button {
          margin-left: 12px;
        }
      }
    }
    .links {
      a {
        color: $primaryColor;
        &:hover {
          text-decoration: underline;
        }
      }
      .fgline {
        color: $normalTextColor;
        margin: 0 12px;
      }
    }
  }
  .rough-data {
    margin-top: 90px;
    ul {
      max-width: 800px;
      margin: auto;
      li {
        float: left;
        text-align: center;
        width: 25%;
        color: $normalTextColor;
        .value {
          font-size: 13px;
          margin-bottom: 3px;
          b {
            font-size: 30px;
            font-weight: normal;
            color: $primaryColor;
            margin-right: 3px;
          }
        }
        .title {
          font-size: 12px;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 24px;
            height: 24px;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .qrcodebox {
    text-align: center;
    margin-top: 90px;
    font-size: 12px;
    color: $primaryColor;
    .item {
      display: inline-block;
      + .item {
        margin-left: 24px;
      }
      img {
        width: 90px;
        height: 90px;
      }
    }
  }
}

@media (max-width: 700px) {
  .page-index {
    .rough-data {
      ul {
        max-width: 400px;
        li {
          width: 50%;
          margin-bottom: 15px;
        }
      }
    }
  }
}
@media (max-width: 1000px) {
  .page-index {
    .search-wrapper {
      .search-box {
        text-align: center;
        input {
          width: 100%;
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>