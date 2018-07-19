<template>
<div class="com-comment-header">
  <header>
    <com-avator :item="detail" :size="avatorSize"></com-avator>
    <div class="middle">
      <h3 class="title"><span>{{nickName}}</span> at {{detail.collegeName}}</h3>
      <span class="date">{{detail.lastModifyTime}}</span>
    </div>
    <slot name="right"></slot>
  </header>
  <slot name="attach"></slot>
  <section>
    <div class="content" v-html="detail.content"></div>
    <slot name="bottom"></slot>
  </section>
</div>
</template>
<script>
import ComAvator from '~/components/common/avator'
export default {
  components: { ComAvator },
  props: {
    detail: {
      type: Object,
      default: () => ({})
    },
    avatorSize: {
      type: [Number, String]
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    isAnonymous() {
      return this.userInfo.id != this.detail.stu_id && this.detail.anonymous == '1'
    },
    nickName() {
      return this.isAnonymous ? 'Anonymous' : this.detail.nickName
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-comment-header {
  > header {
    display: flex;
    align-items: center;
    padding: 12px 0;
    .middle {
      flex: 1;
      margin: 0 12px;
      .title, .date {
        font-size: 12px;
        color: $themeBorderGreyColor;
      }
      .title span {
        font-size: 15px;
        color: $themeBlueColor;
      }
    }
    .el-dropdown {
      i {
        font-size: 15px;
        font-weight: bold;
      }
    }
  }
  > section {
    .content {
      font-size: 13px;
      color: #3b3b3b;
      line-height: 1.6;
    }
  }
}
</style>