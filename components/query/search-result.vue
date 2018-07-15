<template>
<ul class="com-query-search-result">
  <li class="clearfix item" v-for="item in list" :key="item.regNo">
    <div class="image" :style="{backgroundImage: `url(http://tmpic.tmkoo.com/${item.tmImg})`}"></div>
    <div class="rightbox">
      <ul class="sub-list">
        <li>
          <div>名称: <b :title="item.tmName">{{item.tmName}}</b></div>
          <div>类别: {{item.intCls}}</div>
        </li>
        <li>
          <div>申请人: {{item.applicantCn}}</div>
          <div>最新状态: {{item.currentStatus}}</div>
        </li>
      </ul>
      <div class="btn-group">
        <a target="__blank" class="button warning" :href="`/trade-detail?regNo=${item.regNo}&intCls=${item.intCls}`">查看详情</a>
      </div>
    </div>
  </li>
</ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
$itemLeftWidth: 150px;
$smItemLeftWidth: 80px;
.com-query-search-result {
  padding: 16px 0;
  .item {
    padding: 12px;
    font-size: 15px;
    color: $normalTextColor;
    border-bottom: 1px solid $level3BorderColor;
    .image {
      float: left;
      width: $itemLeftWidth;
      height: 100px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
    .rightbox {
      margin-left: $itemLeftWidth + 12px;
      .sub-list {
        li {
          width: 50%;
          display: inline-block;
          line-height: 1.6;
          vertical-align: top;
          &, div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          b {
            color: $dangerColor;
          }
        }
      }
      .btn-group {
        margin-top: 8px;
      }
    }
  }
}

@media (max-width: 768px) {
  .com-query-search-result {
    .item {
      font-size: 12px;
      padding-left: 0;
      padding-right: 0;
      .image {
        width: $smItemLeftWidth;
      }
      .rightbox {
        margin-left: $smItemLeftWidth + 8px;
        .sub-list {
          li {
            width: 100%;
            line-height: 1.45;
          }
        }
      }
    }
  }
}
</style>