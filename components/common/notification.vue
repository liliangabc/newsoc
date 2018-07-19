<template>
<div class="com-notification-popover">
  <ul class="list">
    <li v-for="item in listData.list" :key="item.id">
      <com-avator size="40" :src="item.userHeadImage"></com-avator>
      <div class="middle">
        <h3 class="title">{{item.nickName}} <span>{{item.title}}</span></h3>
        <p class="content">{{item.repContent}}</p>
        <span class="date">{{item.push_time}}</span>
      </div>
      <span class="dot" v-if="item.isRead == '0'"></span>
    </li>
  </ul>
  <el-pagination small layout="prev, pager, next" :total="listData.total" :page-size="listData.rows" @current-change="onPageChange"></el-pagination>
</div>
</template>
<script>
import ComAvator from '~/components/common/avator'
export default {
  components: { ComAvator },
  props: {
    listData: {
      type: Object,
      default: () => ({ list: [] })
    }
  },
  methods: {
    // 目标页改变
    onPageChange(page) {
      this.$emit('current-change', page)
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-notification-popover {
  width: 360px;
  margin: 0 -12px;
  .list {
    li {
      display: flex;
      padding: 8px 30px 8px 12px;
      position: relative;
      cursor: pointer;
      border-bottom: 1px solid $boxBorderColor;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background-color: #f6f6f6;
      }
      .middle {
        flex: 1;
        margin: 0 12px;
        white-space: nowrap;
        &, .content {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .title {
          font-size: 15px;
          color: #363636;
          span {
            font-size: 12px;
            color: $themeBorderGreyColor;
          }
        }
        .content {
          font-size: 14px;
          color: #6f6f6f;
        }
        .date {
          font-size: 12px;
          color: $themeBorderGreyColor;
        }
      }
      .dot {
        width: 6px;
        height: 6px;
        margin-top: -3px;
        border-radius: 50%;
        background-color: $themeBlueColor;
        position: absolute;
        top: 50%;
        right: 18px;
      }
    }
  }
  .el-pagination {
    text-align: center;
    margin-top: 4px;
  }
}
</style>