<template>
<div class="page-trade-detail">
  <com-search-box></com-search-box>
  <div class="detail-wrapper">
    <div class="topbox">
      <p class="title">商标名称：{{detail.tmName}}</p>
      <ul class="clearfix">
        <li class="item">
          <div class="label">申请</div>
          <span class="date">{{detail.appDate}}</span>
        </li>
        <li class="line"></li>
        <li class="item">
          <div class="label">注册</div>
          <span class="date">{{detail.regDate}}</span>
        </li>
        <li class="line"></li>
        <li class="item">
          <div class="label">初审</div>
          <span class="date">{{detail.announcementDate}}</span>
        </li>
        <li class="line"></li>
        <li class="item">
          <div class="label">终止</div>
          <span class="date">{{detail.privateDate ? detail.privateDate.split('至')[1] : ''}}</span>
        </li>
      </ul>
    </div>
    <ul class="trade-detail">
      <li class="clearfix">
        <span class="label">注册号:</span>
        <div class="value">
          <b class="regNo">{{detail.regNo}} </b>
          <span>第<b>{{detail.intCls}}</b>类</span>
        </div>
      </li>
      <li class="clearfix">
        <span class="label">申请日期:</span>
        <div class="value">{{detail.appDate}}</div>
      </li>
      <li class="clearfix">
        <span class="label">申请人名称（中文）:</span>
        <div class="value">
          {{detail.applicantCn}}<router-link to="/">查看他的所有商标</router-link>
        </div>
      </li>
      <li class="clearfix">
        <span class="label">申请人地址(中文):</span>
        <div class="value">{{detail.addressCn}}</div>
      </li>
      <li class="clearfix">
        <span class="label">申请人名称(英文):</span>
        <div class="value">{{detail.applicantEn}}</div>
      </li>
      <li class="clearfix">
        <span class="label">申请人地址(英文):</span>
        <div class="value">{{detail.addressEn}}</div>
      </li>
      <li>
        <span class="label">商品图片</span>
        <div class="value">
          <img :src="`http://tmpic.tmkoo.com/${detail.tmImg}-m`">
        </div>
      </li>
      <li>
        <span class="label">商品服务列表</span>
        <div class="value">
          <div class="list">
            <p v-for="(item, index) in detail.goods" :key="index">{{item.goodsCode}}—{{item.goodsName}}</p>
          </div>
        </div>
      </li>
      <li>
        <span class="label">初审公告期号:</span>
        <div class="value">{{detail.announcementIssue}}</div>
      </li>
      <li>
        <span class="label">注册公告期号:</span>
        <div class="value">{{detail.regIssue}}</div>
      </li>
      <li>
        <span class="label">初审公告日期:</span>
        <div class="value">{{detail.announcementDate}}</div>
      </li>
      <li>
        <span class="label">注册公告日期:</span>
        <div class="value">{{detail.regDate}}</div>
      </li>
      <li>
        <span class="label">专用权期限:</span>
        <div class="value">{{detail.privateDate}}</div>
      </li>
      <li>
        <span class="label">后期指定日期:</span>
        <div class="value">{{detail.hqzdrq}}</div>
      </li>
      <li>
        <span class="label">国际注册日期:</span>
        <div class="value">{{detail.gjzcrq}}</div>
      </li>
      <li>
        <span class="label">优先权日期:</span>
        <div class="value">{{detail.yxqrq}}</div>
      </li>
      <li>
        <span class="label">代理人名称:</span>
        <div class="value">{{detail.agent}}</div>
      </li>
      <li>
        <span class="label">指定颜色:</span>
        <div class="value">{{detail.color}}</div>
      </li>
      <li>
        <span class="label">商标类型:</span>
        <div class="value">{{detail.category}}</div>
      </li>
      <li>
        <span class="label">商标状态:</span>
        <div class="value">
          <div class="list">
            <p v-for="(item, index) in detail.flow" :key="index">{{item.flowDate}}—{{item.flowName}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import ComSearchBox from '~/components/query/search-box'
export default {
  asyncData({ route, store, req, isServer }) {
    if (isServer) {
      let randstr = Math.random().toString(36).substr(2)
      req.session.randstr = randstr
      return { randstr }
    }
  },
  components: { ComSearchBox },
  data() {
    return {
      detail: {}
    }
  },
  methods: {
    getData() {
      return this.$store.dispatch('get-trade-detail', { route: this.$route, randstr: this.randstr }).then(data => {
        this.detail = data.result.data
      }).catch(err => {
        alert(err.message)
        let { code } = JSON.parse(err.message)
        if (code == 403) {
          this.$router.replace(`/entry/login?to=${this.$route.fullPath}`)
        }
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.page-trade-detail {
  padding-top: 100px;
  .detail-wrapper {
    padding: 16px 0;
    .topbox {
      padding: 12px;
      margin-bottom: 12px;
      border: 1px solid $level3BorderColor;
      .title {
        color: $primaryTextColor;
        font-size: 15px;
        margin-bottom: 12px;
      }
      ul {
        padding-left: 2em;
        li {
          float: left;
          text-align: center;
          &.item {
            .label {
              width: 59px;
              height: 60px;
              line-height: 60px;
              text-align: center;
              color: #fff;
              margin: 0 auto 3px;
              background: url(~/assets/img/dh.png) no-repeat center center/59px;
            }
            .date {
              color: $primaryTextColor;
            }
          }
          &.line {
            width: 85px;
            height: 6px;
            background-color: #f3942a;
            margin: 27px -9px 0;
          }
        }
      }
    }
    .trade-detail {
      padding: 12px;
      border: 1px solid $level3BorderColor;
      > li {
        margin: 1em 0;
        color: $primaryTextColor;
        .label {
          float: left;
          width: 150px;
          padding-right: 12px;
          text-align: right;
          font-weight: bold;
        }
        .value {
          min-height: 17px;
          margin-left: 150px;
          .list {
            line-height: 1.6;
            p {
              margin-bottom: 12px;
            }
            a {
              font-size: 12px;
              padding: 3px 12px;
              color: $primaryTextColor;
              background-color: $level3BorderColor;
              &:hover {
                background-color: $level1BorderColor;
              }
            }
          }
          .regNo {
            color: $dangerColor;
          }
        }
      }
    }
  }
}
</style>