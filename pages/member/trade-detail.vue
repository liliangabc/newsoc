<template>
<div class="page-member-trade-detail">
  <ul class="clearfix trade-detail">
    <li>
      <span class="label">申请人:</span>
      <div class="value">{{detail.register}}</div>
    </li>
    <li>
      <span class="label">注册类型:</span>
      <div class="value">{{detail.kind}}</div>
    </li>
    <li>
      <span class="label">商标名称:</span>
      <div class="value">{{detail.name}}</div>
    </li>
    <li>
      <span class="label">状态:</span>
      <div class="value">{{detail.status}}</div>
    </li>
    <li>
      <span class="label">行业类别:</span>
      <div class="value">{{detail.tradeName}}</div>
    </li>
    <li>
      <span class="label">子类别:</span>
      <div class="value">{{detail.tradeClassList.map(_ => _.className).join(',')}}</div>
    </li>
    <li>
      <span class="label">商标图样:</span>
      <div class="value">
        <img v-if="image" :src="image">
      </div>
    </li>
  </ul>
</div>
</template>
<script>
import { remoteAPIURL } from '~/server/config'
export default {
  asyncData({ route, store }) {
    return store.dispatch('getOrder', {
      id: route.query.id
    }).then(data => {
      return { detail: data.data }
    }).catch(err => ({ errmsg: err.message }))
  },
  computed: {
    image() {
      let { images } = this.detail
      return images ? remoteAPIURL + '/imgs' + images: ''
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.page-member-trade-detail {
  padding: 16px 0;
  .trade-detail {
    padding: 12px;
    border: 1px solid $level3BorderColor;
    > li {
      float: left;
      width: 50%;
      margin: 1em 0;
      color: $primaryTextColor;
      .label {
        float: left;
        width: 6em;
        padding-right: 12px;
        text-align: right;
        font-weight: bold;
      }
      .value {
        min-height: 17px;
        margin-left: 6em;
        img {
          max-width: 80%;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .page-member-trade-detail {
    .trade-detail {
      > li {
        width: 100%;
      }
    }
  }
}
</style>